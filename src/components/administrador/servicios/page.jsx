"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  PawPrint,
  Stethoscope,
  Syringe,
  Scissors,
  Bone,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function ServiciosPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] p-6">
      {/* Encabezado animado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--background-secondary)] rounded-2xl p-8 mb-8 relative overflow-hidden border border-[var(--border)]"
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">
            Nuestros Servicios
          </h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            VetListo+ - Cuidado especializado para tu mascota
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Tarjeta de servicios principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2"
        >
          <Card className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl p-6 h-full">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Servicios Veterinarios
              </h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ServiceCategoryCard
                icon={<Stethoscope className="w-5 h-5" />}
                title="Consultas Médicas"
                description="Exámenes generales y especializados"
              />
              <ServiceCategoryCard
                icon={<Syringe className="w-5 h-5" />}
                title="Vacunación"
                description="Programa completo de vacunas"
              />
              <ServiceCategoryCard
                icon={<Scissors className="w-5 h-5" />}
                title="Estética"
                description="Baño, corte y cuidado profesional"
              />
              <ServiceCategoryCard
                icon={<Bone className="w-5 h-5" />}
                title="Nutrición"
                description="Asesoramiento dietético personalizado"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Panel de acciones rápidas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl p-6">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Acciones Rápidas
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button className="w-full flex items-center justify-center gap-3 px-6 py-5 text-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl">
                  <Plus className="w-6 h-6" />
                  Nuevo Servicio
                </Button>
              </motion.div>

              <div className="space-y-4">
                <QuickActionCard
                  icon={<Stethoscope className="w-5 h-5" />}
                  title="Agendar Consulta"
                />
                <QuickActionCard
                  icon={<Syringe className="w-5 h-5" />}
                  title="Programar Vacuna"
                />
                <QuickActionCard
                  icon={<Scissors className="w-5 h-5" />}
                  title="Reservar Estética"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Beneficios destacados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-full bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]"
        >
          <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
            Beneficios Exclusivos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BenefitCard
              title="Profesionales Certificados"
              description="Equipo de veterinarios especializados"
            />
            <BenefitCard
              title="Tecnología Avanzada"
              description="Equipamiento de última generación"
            />
            <BenefitCard
              title="Emergencias 24/7"
              description="Atención inmediata las 24 horas"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Componente de categoría de servicio
function ServiceCategoryCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 bg-[var(--primary)] rounded-lg text-white">
          {icon}
        </div>
        <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
      </div>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </motion.div>
  );
}

// Componente de acción rápida
function QuickActionCard({ icon, title }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg border border-[var(--border)] cursor-pointer"
    >
      <div className="p-2 bg-[var(--primary)] rounded-md text-white">
        {icon}
      </div>
      <span className="font-medium text-[var(--foreground)]">{title}</span>
    </motion.div>
  );
}

// Componente de beneficio
function BenefitCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]"
    >
      <h3 className="font-semibold text-lg text-[var(--primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </motion.div>
  );
}
