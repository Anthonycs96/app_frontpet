"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PawPrint, Calendar, ClipboardList, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { obtenerUsuarioPorId } from "@/api/endpoints/perfil";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";

export default function InicioPage() {
  //const searchParams = useSearchParams();
  //const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { usuario, rol } = useAuth();
  console.log("usuarios en inicio:", usuario);

  // useEffect se ejecuta cada vez que cambian los searchParams (parámetros de la URL)
  useEffect(() => {
    // Función asíncrona que obtiene los datos del usuario desde el backend
    const cargarDatosUsuario = async () => {
      // Obtenemos el parámetro "id" de la URL (ej. ?id=123)
      const id = usuario.id;

      // Si no hay ID, no hacemos nada
      if (!id) return;

      try {
        // Llamamos a la función para obtener al usuario desde el backend por su ID
        const data = await obtenerUsuarioPorId(id);

        // Aquí podrías guardar el usuario en el estado si lo necesitas
        // setUsuario(data.usuario);

        // Indicamos que ya terminó de cargar
        setIsLoading(false);
      } catch (error) {
        // Si hay un error, lo mostramos por consola y dejamos de cargar
        console.error("Error al cargar usuario:", error);
        setIsLoading(false);
      }
    };

    // Ejecutamos la función definida arriba
    cargarDatosUsuario();
  }, [usuario]); // El efecto se vuelve a ejecutar si cambian los parámetros de búsqueda

  // Función para capitalizar el nombre: convierte "juan perez" en "Juan Perez"
  function capitalizarNombre(nombre) {
    if (!nombre) return "";
    return nombre
      .toLowerCase() // convierte todo a minúsculas
      .split(" ") // divide el nombre en palabras
      .map(
        (palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1) // capitaliza la primera letra
      )
      .join(" "); // vuelve a unir las palabras con espacio
  }

  const [proximasCitas] = useState([
    { mascota: "Luna", fecha: "15 Abril", hora: "15:30", tipo: "Vacunación" },
    { mascota: "Max", fecha: "18 Abril", hora: "10:00", tipo: "Control" },
  ]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--background-secondary)] rounded-2xl p-8 mb-8 relative overflow-hidden border border-[var(--border)]"
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
            ¡Bienvenido{" "}
            {usuario ? capitalizarNombre(usuario.nombre) : "a PetCare"}!
          </h1>

          <p className="text-lg text-[var(--muted-foreground)]">
            VetListo+ cuidando a tus mascotas
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
          <PawPrint className="text-[200px] text-[var(--primary)]" />
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <QuickActionCard
          icon={<PawPrint />}
          title="Mis Mascotas"
          description="Gestiona los perfiles de tus mascotas"
          color="bg-[var(--button-tertiary)] text-[var(--primary)]"
        />
        <QuickActionCard
          icon={<Calendar />}
          title="Agendar Cita"
          description="Programa una nueva consulta"
          color="bg-[var(--button-tertiary)] text-[var(--primary)]"
        />
        <QuickActionCard
          icon={<ClipboardList />}
          title="Historial"
          description="Revisa el historial médico"
          color="bg-[var(--button-tertiary)] text-[var(--primary)]"
        />
        <QuickActionCard
          icon={<Bell />}
          title="Recordatorios"
          description="Vacunas y medicamentos"
          color="bg-[var(--button-tertiary)] text-[var(--primary)]"
        />
      </motion.div>

      {/* Próximas Citas */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[var(--background-secondary)] rounded-xl shadow-sm p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Próximas Citas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proximasCitas.map((cita, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg hover:text-[var(--foreground)]">
                    {cita.mascota}
                  </h3>
                  <p className="text-[var(--muted-foreground)]">{cita.tipo}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{cita.fecha}</p>
                  <p className="text-sm text-gray-500">{cita.hora}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[var(--background-secondary)] rounded-xl shadow-sm p-6 mb-16 md:mb-0"
      >
        <h2 className="text-2xl font-bold mb-6">Tips para tu Mascota</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TipCard
            title="Alimentación Saludable"
            description="Mantén una dieta balanceada para tu mascota"
          />
          <TipCard
            title="Ejercicio Diario"
            description="La actividad física es esencial para su salud"
          />
          <TipCard
            title="Higiene Regular"
            description="Mantén al día la limpieza de tu mascota"
          />
        </div>
      </motion.div>
    </div>
  );
}

// Actualiza el QuickActionCard para incluir animaciones
function QuickActionCard({ icon, title, description, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${color} rounded-xl p-6 border border-[var(--border)] hover:bg-[var(--button-tertiary-hover)]`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="text-2xl mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="font-semibold text-lg mb-2 text-[var(--foreground)]">
        {title}
      </h3>
      <p className="text-[var(--muted-foreground)]">{description}</p>
    </motion.div>
  );
}

// Actualiza el TipCard para incluir animaciones
function TipCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border rounded-lg p-4 hover:bg-[var(--button-tertiary-hover)] transition-colors"
    >
      <h3 className="font-semibold text-lg mb-2 text-[var(--foreground)]">
        {title}
      </h3>
      <p className="text-[var(--muted-foreground)]">{description}</p>
    </motion.div>
  );
}
