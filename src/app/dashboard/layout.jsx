"use client";

import React, { useState, useEffect } from "react"; // Añade esta importación
import Navbar from "@/components/navbar/Navbar";
import TitleBar from "@/components/navbar/TitleBar";
import "@/styles/globals.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // ✅ Esto funciona
import { obtenerUsuarioPorId } from "@/api/endpoints/perfil";
import { AuthContext } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState("white"); // opciones: "dark", "white"
  const [isExpanded, setIsExpanded] = useState(false); // Control para el estado expandido
  const [isLoading, setIsLoading] = useState(true); // Cargando hasta que se verifique el token
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null); // Estado para el rol
  const router = useRouter();

  // Control del tema (oscuro o claro)
  useEffect(() => {
    const html = document.documentElement;
    const handleThemeChange = (e) => {
      html.classList.remove("dark", "white"); // Limpiar antes de aplicar

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

  // Verificación de token
  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login"); // Redirige si no hay token
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setRol(decoded.rol); // Guarda el rol decodificado en el estado

        if (!decoded.id) {
          throw new Error("Token inválido: falta ID");
        }

        // Verificar expiración del token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          router.push("/auth/login"); // Redirigir si el token está expirado
          return;
        }

        // Obtener usuario de la API si el token es válido
        const usuario = await obtenerUsuarioPorId(decoded.id);
        setUsuario(usuario);
        setIsLoading(false); // Terminar la carga si el usuario es válido
      } catch (error) {
        console.error("Error de autenticación:", error.message);
        localStorage.removeItem("token");
        router.push("/auth/login"); // Redirigir si el token es inválido
      }
    };

    verificarToken();
  }, [router]);

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
        className={`px-4 sm:pr-10 sm:py-12 transition-all duration-300 ${
          isExpanded ? "sm:ml-64" : "sm:ml-16"
        } w-full overflow-x-hidden relative max-w-full`}
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
