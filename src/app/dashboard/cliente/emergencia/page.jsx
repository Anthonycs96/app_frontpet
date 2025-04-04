"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  PhoneCall,
  MapPin,
  HeartPulse,
  Clock,
  Crosshair,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function EmergenciaPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] p-6">
      {/* Encabezado de emergencia */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 mb-8 relative overflow-hidden"
      >
        <div className="relative z-10 space-y-2">
          <h1 className="text-4xl font-bold text-red-500 flex items-center gap-3">
            <AlertTriangle className="w-10 h-10" />
            Emergencia Veterinaria
          </h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Atención inmediata las 24 horas - No esperes para pedir ayuda
          </p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute right-4 -bottom-8 opacity-5"
        >
          <Crosshair className="text-[200px] text-red-500" />
        </motion.div>
      </motion.div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Columna de emergencia */}
        <div className="space-y-8">
          {/* Botón de acción principal */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          ></motion.div>

          {/* Tarjeta de ubicación */}
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="text-red-500 w-5 h-5" />
                Clínica de emergencia más cercana
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">VetEmergency 24h</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Av. Emergencias 123, Ciudad
                </p>
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <Clock className="w-4 h-4" />
                  Abierto ahora • 2.5 km
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Síntomas comunes */}
          <Card className="border-[var(--border)]">
            <CardHeader>
              <h2 className="text-xl font-semibold">Síntomas de Emergencia</h2>
            </CardHeader>
            <CardContent className="grid gap-3">
              <SymptomItem title="Dificultad respiratoria" color="red" />
              <SymptomItem title="Convulsiones" color="orange" />
              <SymptomItem title="Hemorragia grave" color="red" />
              <SymptomItem title="Ingesta tóxica" color="purple" />
            </CardContent>
          </Card>
        </div>

        {/* Columna de guía rápida */}
        <div className="space-y-8  mb-16 md:mb-0">
          {/* Primeros auxilios */}
          <Card className="border-[var(--border)]">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-red-500" />
                Primeros Auxilios Básicos
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <InstructionStep
                step="1"
                title="Mantener la calma"
                description="Respira profundamente para poder ayudar mejor a tu mascota"
              />
              <InstructionStep
                step="2"
                title="Proteger el área"
                description="Alejar de peligros y colocar en superficie estable"
              />
              <InstructionStep
                step="3"
                title="Controlar hemorragias"
                description="Aplicar presión con gasa limpia (no usar torniquete)"
              />
            </CardContent>
          </Card>

          {/* Protocolos rápidos */}
          <Card className="border-[var(--border)]">
            <CardHeader>
              <h2 className="text-xl font-semibold">Protocolos Rápidos</h2>
            </CardHeader>
            <CardContent className="grid gap-3">
              <ProtocolCard
                title="Envenenamiento"
                icon="⚠️"
                color="text-red-500"
              />
              <ProtocolCard
                title="Golpe de calor"
                icon="🌡️"
                color="text-orange-500"
              />
              <ProtocolCard
                title="Parto complicado"
                icon="🐕"
                color="text-purple-500"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Componente de síntoma
function SymptomItem({ title, color }) {
  const colorClasses = {
    red: "bg-red-500/10 text-red-500",
    orange: "bg-orange-500/10 text-orange-500",
    purple: "bg-purple-500/10 text-purple-500",
  };

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={`flex items-center gap-3 p-3 rounded-lg ${colorClasses[color]}`}
    >
      <div className="h-2 w-2 rounded-full bg-current" />
      <span className="font-medium">{title}</span>
    </motion.div>
  );
}

// Componente de instrucción
function InstructionStep({ step, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-start gap-4 p-4 bg-[var(--background)] rounded-lg border border-[var(--border)]"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
        {step}
      </div>
      <div>
        <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
        <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
      </div>
    </motion.div>
  );
}

// Componente de protocolo
function ProtocolCard({ title, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${color} p-4 rounded-lg bg-[var(--background)] border border-[var(--border)]`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <button className="mt-2 text-sm hover:underline flex items-center gap-1">
        Ver protocolo completo →
      </button>
    </motion.div>
  );
}
