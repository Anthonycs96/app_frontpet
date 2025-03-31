"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import jwt from "jsonwebtoken";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  Home,
  User,
  Code,
  Cpu,
  Mail,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  LogOut,
  PawPrint,
  Heart,
  AlertTriangle,
  LayoutDashboard,
  CalendarRange,
  Wrench,
  FileText,
  Settings,
  CalendarCheck,
  ArrowLeft,
  MoreHorizontal,
  X,
} from "lucide-react";

export default function Navbar({ isExpanded, setIsExpanded, usuario }) {
  const sidebarWidth = isExpanded ? "w-56" : "w-16";
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Inicio");
  const [showMore, setShowMore] = useState(false);

  console.log("Usuario en navbar:", usuario);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMore && !event.target.closest(".mobile-nav-container")) {
        setShowMore(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMore]);

  const navegar = () => {
    setActiveLink("Perfil");
    router.push("/dashboard/perfil");
  };
  const clientNavLinks = [
    { name: "Inicio", href: "home", icon: Home },
    { name: "Mi Mascota", href: "miMascota", icon: PawPrint }, // Detalles, vacunas, peso, etc.
    { name: "Mis Citas", href: "citas", icon: Calendar }, // Historial y próximas citas
    { name: "Servicios", href: "servicios", icon: Heart }, // Desparasitación, baño, etc.
    { name: "Emergencia", href: "emergencia", icon: AlertTriangle }, // Acceso rápido
    { name: "Contacto", href: "contacto", icon: Mail }, // Teléfonos, WhatsApp, etc.
    { name: "Colaboradores", href: "colaboradores", icon: Users }, // Colaboradores
  ];

  const staffNavLinks = [
    { name: "Dashboard", href: "dashboard", icon: LayoutDashboard }, // Estadísticas, resumen
    { name: "Citas", href: "citas", icon: CalendarRange }, // Ver y gestionar
    { name: "Pacientes", href: "pacientes", icon: PawPrint }, // Todas las mascotas registradas
    { name: "Propietarios", href: "clientes", icon: Users }, // Lista de clientes
    { name: "Servicios", href: "servicios", icon: Wrench }, // Gestión de tipos de servicio
    { name: "Reportes", href: "reportes", icon: FileText }, // Historial, atenciones, etc.
    { name: "Configuración", href: "config", icon: Settings }, // Perfil, datos, horarios
  ];

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("authToken");

      // Esperar un breve momento para asegurar que se hayan eliminado los datos
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Redirigir a la página de inicio
      router.push("/");

      // Forzar un refresh para asegurar que se actualice el estado
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const clientMobileNavLinks = [
    { name: "Inicio", href: "#home", icon: Home },
    { name: "Mi Mascota", href: "#miMascota", icon: PawPrint },
    { name: "Citas", href: "#citas", icon: Calendar },
    { name: "Servicios", href: "#servicios", icon: Heart },
    { name: "Emergencia", href: "#emergencia", icon: AlertTriangle },
    { name: "Contacto", href: "#contacto", icon: Mail },
    { name: "Salir", href: "#logout", icon: LogOut, onClick: handleLogout },
  ];

  const staffMobileNavLinks = [
    { name: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
    { name: "Citas", href: "#citas", icon: CalendarRange },
    { name: "Pacientes", href: "#pacientes", icon: PawPrint },
    { name: "Clientes", href: "#clientes", icon: Users },
    { name: "Servicios", href: "#servicios", icon: Wrench },
    { name: "Reportes", href: "#reportes", icon: FileText },
    { name: "Config", href: "#config", icon: Settings },
    { name: "Salir", href: "#logout", icon: LogOut, onClick: handleLogout },
  ];
  const quickAccessLinks = [
    { name: "Inicio", href: "#home", icon: Home },
    { name: "Mascota", href: "miMascota", icon: PawPrint },
    { name: "Citas", href: "citas", icon: Calendar },
  ];

  const extraLinks = [
    { name: "Servicios", href: "#servicios", icon: Heart },
    { name: "Emergencia", href: "#emergencia", icon: AlertTriangle },
    { name: "Contacto", href: "#contacto", icon: Mail },
    // { name: "Mi perfil", href: "perfil", icon: User, onClick: navegar },
    { name: "Colaboradores", href: "colaboradores", icon: Users },
    { name: "Salir", href: "#logout", icon: LogOut, onClick: handleLogout },
  ];

  // Verifica autenticación
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/"); // Redirige a la página de inicio si no hay token
    }
    // else {
    //   try {
    //     const decodedToken = jwt.decode(token); // Decodifica el JWT
    //     if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
    //       // Si el token ha expirado
    //       localStorage.removeItem("token");
    //       router.push("/"); // Redirige al inicio
    //     } else {
    //       setIsAuthenticating(false);
    //     }
    //   } catch (err) {
    //     console.error("Error al verificar el token:", err.message);
    //     localStorage.removeItem("token");
    //     router.push("/"); // Redirige si hay algún error al decodificar
    //   }
    // }
  }, [router]);

  return (
    <>
      {/* Escritorio / Tablet */}
      <aside
        className={`
          hidden sm:flex
          fixed left-2 top-4 bottom-4
          ${sidebarWidth}
          bg-[var(--background-secondary)] text-[var(--foreground)]
          rounded-xl border border-gray-200 dark:border-neutral-800
          flex flex-col shadow-lg transition-all duration-300
          overflow-hidden
        `}
      >
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-4 border-b">
          {isExpanded && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground bg-[var(--icon-secondary-bg)]">
                <Home className="h-4 w-4 text-[var(--icon-secondary-text)]" />
              </div>
              <h1 className="font-semibold text-2xl">VetListo+</h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "!h-7 !w-7 !p-0 !m-0 rounded-full flex items-center justify-center bg-[var(--button-tertiary)] hover:bg-[var(--button-tertiary-hover)] shadow-none",
              !isExpanded && "mx-auto"
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4 p-0 text-[var(--button-tertiary-text,#fff)]" />
            ) : (
              <ChevronRight className="h-4 w-4 p-0 text-[var(--button-tertiary-text,#fff)]" />
            )}
            <span className="sr-only">
              {isExpanded ? "Colapsar sidebar" : "Expandir sidebar"}
            </span>
          </Button>
        </div>

        {/* Contenido principal (links) */}
        <div className="p-1 overflow-auto flex-1">
          <nav className="flex flex-col h-full p-2 bg-[var(--background-secondary)] shadow-none transition-all duration-300">
            {/* {isExpanded && (
              <h2 className="text-2xl font-bold mb-6 text-[var(--button-cuarto-text)]">
                Alair Creative
              </h2>
            )} */}
            <ul className="space-y-2">
              {clientNavLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    {isExpanded ? (
                      <Link href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="
                            flex items-center w-full px-4 py-2 rounded-md
                            justify-start transition-colors duration-200
                            shadow-none bg-[var(--navbar-cuarto)]
                            text-[var(--navbar-cuarto-text)]
                            hover:text-[var(--navbar-cuarto-text)]
                          "
                        >
                          <item.icon className="mr-3 h-4 w-4" size={20} />
                          <span>{item.name}</span>
                        </Button>
                      </Link>
                    ) : (
                      <Link href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          size="icon"
                          className="
                            !h-10 !w-10 !p-0 !m-0 shadow-none
                            flex items-center justify-center rounded-md
                            transition-colors duration-200
                            focus:outline-none focus:ring-0
                            bg-[var(--navbar-cuarto)]
                            text-[var(--navbar-cuarto-text)]
                            hover:text-[var(--navbar-cuarto-text)]
                          "
                        >
                          <item.icon className="h-4 w-4" size={20} />
                          <span className="sr-only">{item.name}</span>
                        </Button>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer y Logout al final */}
        <div className="mt-auto border-t border-gray-200 dark:border-neutral-800 pt-4 px-2">
          {/* Perfil del usuario */}
          <button
            onClick={navegar}
            className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <img
              src={usuario.usuario.fotoPerfil}
              className="w-10 h-10 rounded-full object-cover border"
            />
            {isExpanded && (
              <div className="flex flex-col text-left">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  {usuario.usuario.nombre}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ver perfil
                </p>
              </div>
            )}
            {!isExpanded && <span className="sr-only">Ir al perfil</span>}
          </button>

          {/* Botón Logout */}
          <div className="mt-2">
            {isExpanded ? (
              <Button
                variant="ghost"
                className="
          w-full flex items-center justify-start px-4 py-2
          rounded-md bg-[var(--navbar-cuarto)]
          text-[var(--navbar-cuarto-text)]
          hover:bg-[var(--navbar-cuarto-hover)]
          hover:text-[var(--navbar-cuarto-text)]
        "
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Cerrar sesión</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="
          !h-10 !w-10 p-0 m-0 flex items-center justify-center rounded-md
          bg-[var(--navbar-cuarto)]
          text-[var(--navbar-cuarto-text)]
          hover:bg-[var(--navbar-cuarto-hover)]
          transition-colors
        "
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Navigation - WhatsApp Style */}
      <div className="max-sm:block sm:hidden fixed left-1/2 -translate-x-1/2 bottom-4 z-50 mobile-nav-container">
        <div className="flex items-center gap-2 bg-[var(--background-secondary)] text-[var(--foreground)] backdrop-blur-xl shadow-sm rounded-xl px-3 py-2">
          {/* 👤 Perfil del Usuario (sección propia, fuera del map) */}
          <button
            onClick={navegar}
            className={`flex flex-col items-center p-2 rounded-xl transition-all w-13 h-13 ${
              activeLink === "Perfil"
                ? "bg-[var(--button-hover)] text-[var(--navbar-cuarto-text)]"
                : "text-[var(--navbar-cuarto-text)]"
            } hover:text-[var(--navbar-cuarto-text)]`}
          >
            <span className="text-sm font-semibold truncate max-w-[3.5rem]">
              {usuario.usuario.nombre}
            </span>
            <span className="text-xs text-[var(--navbar-cuarto-text)]">Tú</span>
          </button>

          {/* 📚 Accesos rápidos (links) */}
          {quickAccessLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => {
                setActiveLink(link.name);
                if (link.onClick) link.onClick();
              }}
              className={`flex flex-col items-center p-2 rounded-xl transition-all group w-13 h-13 ${
                activeLink === link.name
                  ? "bg-[var(--button-hover)] text-[var(--navbar-cuarto-text)]"
                  : "text-[var(--navbar-cuarto-text)]"
              } hover:text-[var(--navbar-cuarto-text)]`}
            >
              <link.icon size={20} />
              <span className="text-xs mt-1">{link.name}</span>
            </Link>
          ))}

          {/* ➕ Botón "Más" */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center p-2 rounded-xl transition-all text-[var(--navbar-cuarto-text)] w-13 h-13 hover:text-blue-500"
          >
            {showMore ? <X size={20} /> : <MoreHorizontal size={20} />}
            <span className="text-xs mt-1">{showMore ? "Cerrar" : "Más"}</span>
          </button>
        </div>

        {/* 🔽 Popover o menú extra */}
        {showMore && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[var(--background-secondary)] border rounded-xl p-3 shadow-lg backdrop-blur-xl">
            {extraLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setShowMore(false);
                  if (link.onClick) link.onClick();
                }}
                className="flex items-center gap-2 p-2 rounded hover:bg-[var(--button-hover)] text-sm"
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
