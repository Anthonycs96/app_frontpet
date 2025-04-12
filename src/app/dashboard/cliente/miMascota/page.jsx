"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import FormRegistrarMiMascota from "@/app/dashboard/cliente/miMascota/components/form.miMascota";
import Button from "@/components/ui/button";
import { registrarMascota, misMascotas } from "@/api/endpoints/miMascota.api";
import { obtenerUsuarioPorId } from "@/api/endpoints/perfil";
import { toast } from "react-toastify";
import { Plus, PawPrint, Calendar, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function CitasPage() {
  const [miMascota, setMiMascota] = useState([]); // ✅ siempre empieza como array vacío

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { usuario, rol } = useAuth();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  console.log("Rol del usuario:", usuario);

  useEffect(() => {
    const cargarDatosMascota = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No se encontró el token. Inicia sesión nuevamente.");
        return;
      }

      try {
        console.log("🔐 Token:", token);

        const response = await misMascotas(); // ✅ sin pasar token como parámetro

        console.log("📦 Datos de misMascotas:", response); // ✅ muestra la respuesta completa
        console.table(response?.mascotas || []); // 🧾 muestra en forma de tabla

        setMiMascota(response?.mascotas || []); // ✅ guarda en estado
      } catch (error) {
        console.error("❌ Error al cargar mascota:", error);
        toast.error("No se pudo cargar la información de tu mascota.");
      } finally {
        setIsLoading(false); // ✅ importante para UX
      }
    };

    cargarDatosMascota();
  }, []);

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

  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No se encontró el token. Inicia sesión nuevamente.");
        setIsLoading(false);
        return;
      }

      const datosConUsuario = {
        ...formData,
        propietario_id: usuario.id,
      };

      console.log("Datos para enviar:", datosConUsuario);

      const response = await registrarMascota(datosConUsuario, token); // 👈 pasamos el token aquí

      toast.success("Mascota registrada correctamente");
      toggleModal();
      console.log("Respuesta del servidor:", response);
    } catch (error) {
      console.error("Error al registrar mascota:", error);

      let message = "Error inesperado";
      if (error.response) {
        message =
          error.response.data?.mensaje || error.response.data?.error || message;
      } else if (error.request) {
        message = "No se pudo conectar con el servidor";
      } else {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] p-6">
      {/* Encabezado con efecto parallax */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--background-secondary)] rounded-2xl p-8 mb-8 relative overflow-hidden border-custom"
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">
            Gestión de Mascotas
          </h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            VetListo+ - Cuidado integral para tu compañero
          </p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute right-4 bottom-4 opacity-10"
        >
          <PawPrint className="text-[120px] text-[var(--primary)]" />
        </motion.div>
      </motion.div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Tarjeta de registro */}
        {miMascota.length > 0 ? (
          <div className="space-y-6">
            {/* Título dinámico */}
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--foreground)] text-center"
            >
              {miMascota.length === 1
                ? "🐶 Esta es tu mascota:"
                : "🐾 Estas son tus mascotas:"}
            </motion.h2>

            {/* Grid dinámico y responsive */}
            <div
              className={`grid gap-6 ${
                miMascota.length === 1
                  ? "grid-cols-1 justify-items-center"
                  : "sm:grid-cols-2 lg:grid-cols-2"
              }`}
            >
              {miMascota.map((mascota) => (
                <motion.div
                  key={mascota.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.04 }}
                >
                  <Card className="flex items-center gap-4 p-5 rounded-2xl border-custom bg-[var(--background)] hover:shadow-lg transition-all duration-300 w-full max-w-md group">
                    <img
                      src={mascota.fotoPerfil || "/placeholder-pet.png"}
                      alt={mascota.nombre}
                      className="w-20 h-20 rounded-full border-[3px] border-[var(--primary)] object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-[var(--primary)] leading-tight">
                        🐾 ¡Hola! Soy{" "}
                        <span className="uppercase">{mascota.nombre}</span>
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] leading-snug">
                        Soy un {mascota.especie.toLowerCase()} {mascota.genero}{" "}
                        de raza {mascota.raza}.
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] italic mt-1">
                        Estoy feliz de estar en tu lista de cuidado ❤️
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="space-y-6">
              <Button
                onClick={toggleModal}
                className="w-full flex items-center justify-center gap-3 px-6 py-5 text-lg 
                 bg-[var(--button)] hover:bg-[var(--button-hover)] text-white 
                 rounded-xl shadow-sm transition-transform"
              >
                <Plus className="w-6 h-6" />
                Registrar Nueva Mascota
              </Button>
            </div>
          </div>
        ) : (
          // Tarjeta de bienvenida cuando no hay mascotas
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl p-6 h-full">
              <div className="flex flex-col items-center gap-6 text-center">
                <motion.div
                  whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
                  className="w-full"
                >
                  <p className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-2">
                    ¡Hola,{" "}
                    <span className="text-[var(--primary)]">
                      {usuario.nombre}
                    </span>
                    ! Bienvenido a VetListo+
                  </p>
                  <Button
                    onClick={toggleModal}
                    className="w-full flex items-center justify-center gap-3 px-6 py-5 text-lg 
                     bg-[var(--button)] hover:bg-[var(--button-hover)] text-white 
                     rounded-xl shadow-sm transition-transform"
                  >
                    <Plus className="w-6 h-6" />
                    Registrar Nueva Mascota
                  </Button>
                </motion.div>

                <div className="space-y-4 w-full">
                  <FeatureItem
                    icon={<Calendar className="w-5 h-5" />}
                    title="Seguimiento Programado"
                    description="Mantén un historial médico organizado y accesible"
                  />
                  <FeatureItem
                    icon={<Clock className="w-5 h-5" />}
                    title="Recordatorios Inteligentes"
                    description="Notificaciones para vacunas y tratamientos"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Sección de beneficios */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--background-secondary)] rounded-2xl p-6 border-custom mb-16 md:mb-0"
        >
          <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
            Beneficios del Registro
          </h2>
          <div className="grid gap-4">
            <BenefitCard
              title="Historial Médico Centralizado"
              description="Accede al historial completo desde cualquier dispositivo"
            />
            {/* <BenefitCard
              title="Alertas de Salud"
              description="Notificaciones proactivas basadas en el perfil de tu mascota"
            /> */}
            <BenefitCard
              title="Acceso Rápido"
              description="Agendamiento inmediato de citas y servicios"
            />
          </div>
        </motion.div>
      </div>

      {/* Modal de registro */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[var(--background-secondary)] rounded-2xl border-custom shadow-xl p-6"
            >
              <FormRegistrarMiMascota
                toggleModal={toggleModal}
                onSubmit={handleSubmit}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente de característica
function FeatureItem({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-start gap-4 p-4 bg-[var(--background)] rounded-lg border-custom"
    >
      <div className="p-2 bg-[var(--primary)] rounded-lg text-white">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
        <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
      </div>
    </motion.div>
  );
}

// Componente de beneficio
function BenefitCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ translateX: 5 }}
      className="p-4 bg-[var(--background)] rounded-lg border-custom"
    >
      <h3 className="font-semibold text-lg mb-2 text-[var(--primary)]">
        {title}
      </h3>
      <p className="text-[var(--muted-foreground)]">{description}</p>
    </motion.div>
  );
}
