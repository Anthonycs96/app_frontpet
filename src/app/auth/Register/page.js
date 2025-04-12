"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";
import FormRegistrarUsuarioEscritorio from "@/app/auth/Register/form.registrar";
import { registrar } from "@/api/endpoints/registrar";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PawPrint } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCountryCodes } from "@/hooks/useCountryCodes";

export default function Register() {
    const { countries, loading } = useCountryCodes();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const response = await registrar({
                nombre: formData.nombre,
                email: formData.email,
                paisCode: formData.paisCode,
                telefono: formData.telefono,
                direccion: formData.direccion,
                documentoIdentidad: formData.documentoIdentidad,
                preguntaSecreta: formData.preguntaSecreta,
                respuestaSecreta: formData.respuestaSecreta,
                fechaNacimiento: formData.fechaNacimiento,
                password: formData.password,
            });

            toast.success("Usuario registrado correctamente");
            router.push("/");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            let message = "Error inesperado";
            if (error.response) {
                message = error.response.data?.mensaje || error.response.data?.error || message;
            } else if (error.request) {
                message = "No se pudo conectar con el servidor";
            } else {
                message = error.message;
            }
            toast.error(message);
        } finally {
            setTimeout(() => setIsLoading(false), 500);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)] p-0 md:p-8 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-6xl"
            >
                <Card className="bg-[var(--background-secondary)] rounded-2xl p-8 border border-[var(--border)] shadow-xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative overflow-hidden"
                    >
                        {/* Icono decorativo animado */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute right-6 -bottom-6 opacity-10"
                        >
                            <PawPrint className="text-[150px] text-[var(--primary)]" />
                        </motion.div>

                        <div className="relative z-10 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <Heading
                                    level="h2"
                                    className="text-4xl font-bold text-[var(--foreground)] mb-2"
                                >
                                    Registro de Usuario
                                </Heading>
                                <p className="text-lg text-[var(--muted-foreground)]">
                                    Crea una cuenta para acceder a todos los servicios
                                </p>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex justify-center py-8"
                                    >
                                        <LoadingSpinner size="lg" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <FormRegistrarUsuarioEscritorio
                                            countries={countries}
                                            onSubmit={handleSubmit}
                                            isLoading={isLoading}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </Card>
            </motion.div>
        </div>
    );
}