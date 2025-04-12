"use client";

// Importamos los hooks necesarios
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "@/components/LoadingSpinner";

// Componente principal de la página de dashboard
export default function DashboardPage({ usuario }) {
  const router = useRouter();

  useEffect(() => {
    // Obtenemos el token de autenticación del localStorage
    const token = localStorage.getItem("token");

    // Si no hay token, redirigimos al usuario al login
    // if (!token) {
    //   router.push("/auth/login");
    //   return;
    // }

    try {
      // Decodificamos el token JWT para obtener la información del usuario
      const decoded = jwtDecode(token);
      const rol = decoded.rol;

      // Según el rol del usuario, lo redirigimos a la sección correspondiente
      switch (rol) {
        case "Cliente":
          router.push("/dashboard/cliente/inicio");
          break;
        case "Recepcionista":
          router.push("/dashboard/recepcionista");
          break;
        case "Administrador":
          router.push("/dashboard/administrador");
          break;
        case "Asistente":
          router.push("/dashboard/asistente");
          break;
        case "Superadmin":
          router.push("/superadmin");
          break;
        default:
          router.push("/auth/login");
      }
    } catch (err) {
      console.error("Token inválido:", err);
      router.push("/auth/login");
    }
  }, []);

  // UI que se muestra mientras se realiza la verificación
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[var(--background)]">
      <LoadingSpinner />
    </div>
  );
}
