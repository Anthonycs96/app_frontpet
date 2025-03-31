"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Plus, PawPrint, HeartPulse } from "lucide-react";

export default function CitasPage() {
    const shouldReduceMotion = useReducedMotion();

    // Animaciones mejoradas para el botón
    const buttonAnimations = {
        initial: { scale: 1 },
        hover: {
            scale: shouldReduceMotion ? 1 : 1.05,
            y: shouldReduceMotion ? 0 : -3
        },
        tap: { scale: shouldReduceMotion ? 1 : 0.98 },
        pulse: {
            scale: [1, 1.02, 1],
            transition: { duration: 1.5, repeat: Infinity }
        }
    };

    const handleAction = () => {
        // Aquí iría la lógica para agregar la mascota
        alert("¡Función para agregar mascota activada!");
    };

    return (
        <div className="relative w-full min-h-screen">
            <motion.h1
                className="sticky top-0 z-10 text-3xl font-semibold mb-4 px-4 py-3 
                 bg-[var(--background)]/90 backdrop-blur-md shadow-lg
                 flex items-center justify-center gap-3 text-[var(--primary)]"
            >
                <HeartPulse size={28} />
                <span>Gestor de Mascotas</span>
            </motion.h1>

            <div className="w-full px-4 mt-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="max-w-2xl mx-auto bg-[var(--background-secondary)]">
                        <CardHeader className="py-8">
                            <div className="flex flex-col items-center justify-center space-y-6">
                                {/* Elemento decorativo animado
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                >
                                    <PawPrint className="h-16 w-16 text-[var(--primary)] opacity-50" />
                                </motion.div> */}

                                {/* Botón principal interactivo */}
                                <motion.div
                                    className="relative"
                                    whileHover="hover"
                                    whileTap="tap"
                                    initial="initial"
                                    animate="pulse"
                                    variants={buttonAnimations}
                                >
                                    <Button
                                        onClick={handleAction}
                                        className="px-8 py-6 text-xl rounded-2xl shadow-xl
                             bg-[var(--primary)] hover:bg-[var(--primary-dark)] 
                             text-white flex items-center gap-3
                             transition-colors duration-200"
                                    >
                                        <Plus className="h-8 w-8 stroke-[3]" />
                                        <span className="font-semibold tracking-wide">
                                            Registrar Nueva Mascota
                                        </span>
                                    </Button>

                                    {/* Efecto de halo */}
                                    {!shouldReduceMotion && (
                                        <motion.div
                                            className="absolute -inset-2 bg-[var(--primary)]/20 blur-lg rounded-2xl"
                                            animate={{
                                                opacity: [0.2, 0.4, 0.2],
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity
                                            }}
                                        />
                                    )}
                                </motion.div>

                                {/* Mensaje descriptivo */}
                                <p className="text-lg text-center text-gray-600 max-w-md">
                                    Presione este botón para registrar una nueva mascota en el sistema y acceder a todos nuestros servicios veterinarios.
                                </p>
                            </div>
                        </CardHeader>
                    </Card>
                </motion.div>
            </div>

            {/* Sección adicional de información */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="max-w-2xl mx-auto mt-8 p-6 text-center"
            >
                <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">
                    ¿Necesita ayuda?
                </h2>
                <p className="text-lg text-gray-600">
                    Nuestro personal está disponible para asistirle en el registro de su mascota.
                    <br />
                    Llámenos al: 01-800-MASCOTAS
                </p>
            </motion.div>
        </div>
    );
}