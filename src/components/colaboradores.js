import { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Calendar, Tag, PawPrint } from "lucide-react";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Button from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FormRegistrarMiMascota({ toggleModal, onSubmit }) {
    return (
        <div>
            {/* Encabezado */}
            <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="sticky top-0 z-10 px-4 py-3 backdrop-blur-md bg-[var(--background)]/80 shadow-md flex items-center gap-3"
            >
                <PawPrint size={24} className="text-[var(--primary)]" />
                <h1 className="text-2xl font-bold">Mi Mascota</h1>
            </motion.header>

            {/* Tarjeta central */}
            <div className="px-4 mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <Card className="max-w-xl mx-auto bg-[var(--background-secondary)] border border-white/10 rounded-3xl shadow-xl p-8">
                        <div className="flex flex-col items-center gap-6">
                            {/* Icono giratorio */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <PawPrint className="h-16 w-16 text-[var(--primary)] opacity-40" />
                            </motion.div>

                            {/* Botón de acción */}
                            <motion.div
                                whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                                whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
                            >
                                <Button
                                    onClick={toggleModal}
                                    className="flex items-center gap-3 px-6 py-4 text-lg font-semibold rounded-xl 
                             bg-[var(--primary)] text-white shadow-md hover:bg-opacity-90 transition"
                                >
                                    <Plus className="w-6 h-6" />
                                    Registrar Nueva Mascota
                                </Button>
                            </motion.div>

                            <p className="text-center text-sm text-gray-400 max-w-sm">
                                Presiona este botón para registrar a tu mascota en el sistema y
                                acceder a los servicios veterinarios.
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleModal} // Solo cierra si se hace clic FUERA del modal
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro lo cierre
                            className="w-full max-w-md sm:max-w-lg md:max-w-xl p-2 text-[var(--foreground)] rounded-2xl shadow-2xl"
                        >
                            <FormRegistrarMiMascota
                                toggleModal={toggleModal}
                                onSubmit={handleSubmit} // <- Añade esta línea
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}