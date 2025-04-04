"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import FormRegistrarMiMascota from "@/components/cliente/miMascota/form.miMascota";
import Button from "@/components/ui/button";
import { Plus, PawPrint, Calendar, Clock } from "lucide-react";

export default function CitasPage() {
  const [miMascota, setMiMascota] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSubmit = (datosMascota) => {
    console.log("Datos recibidos:", datosMascota);
    setMiMascota(datosMascota);
    toggleModal();
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
        className="bg-[var(--background-secondary)] rounded-2xl p-8 mb-8 relative overflow-hidden border border-[var(--border)]"
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
                <Button
                  onClick={toggleModal}
                  className="w-full flex items-center justify-center gap-3 px-6 py-5 text-lg 
                             bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white 
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

        {/* Sección de beneficios */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)] mb-16 md:mb-0"
        >
          <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
            Beneficios del Registro
          </h2>
          <div className="grid gap-4">
            <BenefitCard
              title="Historial Médico Centralizado"
              description="Accede al historial completo desde cualquier dispositivo"
            />
            <BenefitCard
              title="Alertas de Salud"
              description="Notificaciones proactivas basadas en el perfil de tu mascota"
            />
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
              className="w-full max-w-2xl bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] shadow-xl p-6"
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
      className="flex items-start gap-4 p-4 bg-[var(--background)] rounded-lg border border-[var(--border)]"
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
      className="p-4 bg-[var(--background)] rounded-lg border border-[var(--border)]"
    >
      <h3 className="font-semibold text-lg mb-2 text-[var(--primary)]">
        {title}
      </h3>
      <p className="text-[var(--muted-foreground)]">{description}</p>
    </motion.div>
  );
}
