"use client";

import React from "react"; // Añade esta importación
import Navbar from "@/components/Navbar";
import TitleBar from "@/components/TitleBar";
import "@/styles/globals.css";
import { useState, useEffect, Children, cloneElement } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // ✅ Esto funciona
import { obtenerUsuarioPorId } from "@/api/endpoints/perfil";
import { AuthContext } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState("white"); // opciones: "dark", "white"
  // Aquí controlamos si está expandido
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null); // ⬅️ nuevo estado para el rol
  const router = useRouter();

  // console.log("Tipo de children:", typeof children);
  // console.log("Children:", children);

  // ⬇️ Esta parte detecta el tema del sistema y aplica la clase correspondiente
  useEffect(() => {
    const html = document.documentElement;

    const handleThemeChange = (e) => {
      html.classList.remove("dark", "white"); // limpia antes de aplicar

      if (e.matches) {
        html.classList.add("dark");
        setDarkMode("dark");
      } else {
        html.classList.add("white");
        setDarkMode("white");
      }
    };

    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    handleThemeChange(prefersDarkMode); // Aplica el tema inicial

    prefersDarkMode.addEventListener("change", handleThemeChange); // Escucha cambios

    return () => {
      prefersDarkMode.removeEventListener("change", handleThemeChange); // Limpia el listener
    };
  }, []);

  // Verifica autenticación
  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");
      //console.log("Token actual:", token);

      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        //console.log("Decoded token layout:", decoded.rol);
        // ✅ Guarda el rol en estado apenas lo decodificas
        setRol(decoded.rol);

        if (!decoded.id) {
          throw new Error("Token inválido: falta ID");
        }

        // Verifica expiración
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }

        // Si todo está bien, puedes llamar al backend
        const usuario = await obtenerUsuarioPorId(decoded.id);
        setUsuario(usuario);
        console.log("Usuario autenticado:", usuario.usuario.rol);
        setIsLoading(false); // Token válido y usuario confirmado
      } catch (error) {
        console.error("Error de autenticación:", error.message);
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    };

    verificarToken();
  }, [router]);

  // useEffect(() => {
  //   console.log("Estado actual en layout:", {
  //     usuario: usuario?.usuario,
  //     rol: rol,
  //     isLoading,
  //   });
  // }, [usuario, rol, isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)]">
        <LoadingSpinner size={60} color="var(--primary)" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex">
      <Navbar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        usuario={usuario}
        rol={rol}
      />
      <TitleBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <main
        className={`
          px-4 sm:pr-20 sm:py-12 transition-all duration-300
          ${isExpanded ? "sm:ml-64" : "sm:ml-16"}
          w-full overflow-x-hidden relative
          max-w-full
        `}
      >
        <div className="w-full mx-auto sm:px-4 max-w-full">
          <AuthContext.Provider
            value={{ rol, usuario: usuario?.usuario || null }}
          >
            {children}
          </AuthContext.Provider>
        </div>
      </main>
    </div>
  );
}
