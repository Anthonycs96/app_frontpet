"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import FormRegistrarMiMascota from "@/components/form.miMascota";
import Button from "@/components/ui/button";
import { Plus, PawPrint } from "lucide-react";
//import { registrarMascota } from "@/api/miMascota/miMascota.api"; // Asegúrate de que esta ruta sea correcta

export default function CitasPage() {
  const [miMascota, setMiMascota] = useState(null);

  const handleSubmit = (datosMascota) => {
    console.log("Datos recibidos en page.jsx:", datosMascota);
    setMiMascota(datosMascota); // Guarda los datos en el estado

    // Aquí puedes hacer lo que necesites con los datos
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
    <div className="relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Encabezado */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl mx-auto px-4 py-10 space-y-10"
      >
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Mi Mascota
        </h1>
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
  );
}
