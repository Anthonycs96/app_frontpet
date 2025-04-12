"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Plus, PawPrint, Bell } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function CitasPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] p-6">
      {/* Encabezado animado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--background-secondary)] rounded-2xl p-8 mb-8 relative overflow-hidden border-custom"
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">
            Gestión de Citas
          </h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            VetListo+ - Agenda y control de citas veterinarias
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
        {/* Tarjeta de nueva cita */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-[var(--background-secondary)] border-custom rounded-2xl p-6 h-full">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Programar Nueva Cita
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button className="w-full flex items-center justify-center gap-3 px-6 py-5 text-lg bg-[var(--button)] hover:bg-[var(--button-hover)] text-white rounded-xl">
                    <Plus className="w-6 h-6" />
                    Agendar Cita Ahora
                  </Button>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard
                    icon={<Calendar className="w-5 h-5" />}
                    title="Horarios Flexibles"
                    description="Disponibilidad de 8:00 AM a 8:00 PM"
                  />
                  <FeatureCard
                    icon={<Clock className="w-5 h-5" />}
                    title="Citas Rápidas"
                    description="Reserva en menos de 2 minutos"
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </motion.div>

        {/* Listado de citas próximas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-[var(--background-secondary)] border-custom rounded-2xl p-6">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Próximas Citas
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <CitaCard
                fecha="15 Julio 2024"
                hora="10:00 AM"
                mascota="Max (Golden Retriever)"
                tipo="Consulta general"
              />
              <CitaCard
                fecha="18 Julio 2024"
                hora="4:30 PM"
                mascota="Luna (Siamés)"
                tipo="Vacuna anual"
              />
            </CardContent>
            <CardFooter>
              <p className="text-sm text-[var(--muted-foreground)]">
                2 citas programadas esta semana
              </p>
            </CardFooter>
          </div>
        </motion.div>

        {/* Sección de beneficios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-full bg-[var(--background-secondary)] rounded-2xl p-6 border-custom mb-16 md:mb-0"
        >
          <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
            Beneficios Exclusivos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BenefitCard
              icon={<Bell className="w-5 h-5" />}
              title="Recordatorios Automáticos"
              description="Notificaciones 24 horas antes de cada cita"
            />
            <BenefitCard
              icon={<PawPrint className="w-5 h-5" />}
              title="Historial Completo"
              description="Acceso a todo el historial médico de tu mascota"
            />
            <BenefitCard
              icon={<Clock className="w-5 h-5" />}
              title="Reservas Express"
              description="Reagenda o cancela citas en cualquier momento"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Componente de tarjeta de cita
function CitaCard({ fecha, hora, mascota, tipo }) {
  return (
    <motion.div
      whileHover={{ translateX: 5 }}
      className="p-4 bg-[var(--background)] rounded-lg border-custom"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-[var(--foreground)]">{mascota}</h3>
          <p className="text-sm text-[var(--muted-foreground)]">{tipo}</p>
        </div>
        <div className="text-right">
          <p className="text-[var(--primary)] font-medium">{fecha}</p>
          <p className="text-sm text-[var(--muted-foreground)]">{hora}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Componente de característica
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 bg-[var(--background)] rounded-lg border-custom"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[var(--primary)] rounded-lg text-white">
          {icon}
        </div>
        <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
      </div>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </motion.div>
  );
}

// Componente de beneficio
function BenefitCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-start gap-4 p-4 bg-[var(--background)] rounded-lg border border-[var(--border)]"
    >
      <div className="p-2 bg-[var(--primary)] rounded-lg text-white">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg text-[var(--foreground)]">
          {title}
        </h3>
        <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
      </div>
    </motion.div>
  );
}
