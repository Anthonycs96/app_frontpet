"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Configuración de animaciones
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.2 },
};

const usuariosMock = [
  {
    nombre: "Juan Pérez",
    dni: "12345678",
    correo: "juanperez@example.com",
    estado: "Pendiente",
  },
  {
    nombre: "María Gómez",
    dni: "87654321",
    correo: "mariagomez@example.com",
    estado: "Pendiente",
  },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [aprobados, setAprobados] = useState([]);
  const [vista, setVista] = useState("porAprobar");
  const [dniInput, setDniInput] = useState("");
  const [resultados, setResultados] = useState([]);
  const [rolesSeleccionados, setRolesSeleccionados] = useState({});

  useEffect(() => {
    // Cargar usuarios simulados al iniciar
    setUsuarios(usuariosMock);
  }, []);

  const handleBuscar = () => {
    const dnisBuscados = dniInput
      .split(/[\s,]+/)
      .map((dni) => dni.trim())
      .filter((dni) => dni !== "");

    const encontrados = usuarios.filter((usuario) =>
      dnisBuscados.includes(usuario.dni)
    );

    setResultados(encontrados);
  };

  const aprobarUsuario = (usuario) => {
    const rol = rolesSeleccionados[usuario.dni];
    if (!rol) return alert("Selecciona un rol antes de aprobar");

    const nuevo = { ...usuario, estado: "Aprobado", rol };
    setUsuarios((prev) => prev.filter((u) => u.dni !== usuario.dni));
    setResultados((prev) => prev.filter((u) => u.dni !== usuario.dni));
    setAprobados((prev) => [...prev, nuevo]);
  };

  const cambiarCargo = (usuario) => {
    const rol = rolesSeleccionados[usuario.dni];
    if (!rol) return alert("Selecciona un rol antes de cambiar de cargo");

    const nuevo = { ...usuario, rol };
    setUsuarios((prev) => prev.filter((u) => u.dni !== usuario.dni));
    setResultados((prev) => prev.filter((u) => u.dni !== usuario.dni));
    setAprobados((prev) => [...prev, nuevo]);
  };

  const bajaUsuario = (usuario) => {
    const rol = rolesSeleccionados[usuario.dni];
    if (!rol) return alert("Selecciona un rol antes de dar de baja");

    const nuevo = { ...usuario, estado: "Baja", rol };
    setUsuarios((prev) => prev.filter((u) => u.dni !== usuario.dni));
    setResultados((prev) => prev.filter((u) => u.dni !== usuario.dni));
    setAprobados((prev) => [...prev, nuevo]);
  };

  const handleRolChange = (dni, rol) => {
    setRolesSeleccionados((prev) => ({ ...prev, [dni]: rol }));
  };

  // Añadir soporte para movimiento reducido
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...(shouldReduceMotion ? {} : pageTransition)}
      className="w-full max-w-4xl mx-auto px-4 py-10 space-y-10"
    >
      <h1 className="text-3xl font-bold  text-[var(--foreground)]">
        Mi Colaboradores
      </h1>

      {/* Toggle de vistas */}
      <div className="flex justify-center gap-2 mb-4">
        {["porAprobar", "aprobados"].map((v) => (
          <button
            key={v}
            onClick={() => setVista(v)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              vista === v
                ? "bg-[var(--primary)] text-[var(--button-success-text)]"
                : "bg-[var(--background)] text-[var(--button-success-text)]"
            }`}
          >
            {v === "porAprobar" ? "Por aprobar" : "Aprobados"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {vista === "porAprobar" && (
          <motion.section
            key="porAprobar"
            {...(shouldReduceMotion ? {} : pageTransition)}
            className="space-y-4"
          >
            {/* Buscador */}
            <div className="relative">
              <input
                type="text"
                value={dniInput}
                onChange={(e) => setDniInput(e.target.value)}
                placeholder="Buscar uno o más DNIs"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-900 text-[var(--foreground)] text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <button
                onClick={handleBuscar}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--primary)] text-[var(--button-success-text)] px-4 py-2 rounded-xl text-sm"
              >
                Buscar
              </button>
            </div>

            <AnimatePresence>
              {resultados.length > 0 ? (
                resultados.map((usuario) => (
                  <motion.div
                    key={usuario.dni}
                    {...(shouldReduceMotion ? {} : cardVariants)}
                    layout
                  >
                    <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 border dark:border-gray-700 rounded-2xl">
                      <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-xl font-bold text-white">
                        {usuario.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div className="flex-1 text-center md:text-left space-y-1">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {usuario.nombre}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          DNI:{" "}
                          <span className="font-medium">{usuario.dni}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Correo:{" "}
                          <span className="font-medium">{usuario.correo}</span>
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        <select
                          className="px-3 py-2 rounded-lg border text-sm"
                          value={rolesSeleccionados[usuario.dni] || ""}
                          onChange={(e) =>
                            handleRolChange(usuario.dni, e.target.value)
                          }
                        >
                          <option value="">Seleccionar rol</option>
                          <option value="admin">Administrador</option>
                          <option value="veterinario">Veterinario</option>
                          <option value="recepcionista">Recepcionista</option>
                          <option value="baños">Baños y cuidados</option>
                        </select>
                        <Button
                          onClick={() => aprobarUsuario(usuario)}
                          className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm"
                        >
                          Aprobar usuario
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.p
                  {...(shouldReduceMotion ? {} : pageTransition)}
                  className="text-center text-sm text-gray-500"
                >
                  No se encontraron usuarios.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {vista === "aprobados" && (
          <motion.section
            key="aprobados"
            {...(shouldReduceMotion ? {} : pageTransition)}
            className="space-y-4"
          >
            <AnimatePresence>
              {aprobados.length === 0 ? (
                <motion.p
                  {...(shouldReduceMotion ? {} : pageTransition)}
                  className="text-center text-sm text-gray-500"
                >
                  No hay usuarios aprobados aún.
                </motion.p>
              ) : (
                aprobados.map((usuario) => (
                  <motion.div
                    key={usuario.dni}
                    {...(shouldReduceMotion ? {} : cardVariants)}
                    layout
                  >
                    <Card className="flex flex-col md:flex-row items-start gap-6 p-6 border dark:border-gray-700 rounded-2xl">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-xl font-bold text-white shrink-0">
                        {usuario.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      {/* Información principal */}
                      <div className="flex-1 space-y-2">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {usuario.nombre}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <p>
                            <strong>DNI:</strong> {usuario.dni}
                          </p>
                          <p>
                            <strong>Correo:</strong> {usuario.correo}
                          </p>
                          <p>
                            <strong>Cargo actual:</strong>{" "}
                            <span className="capitalize font-medium text-gray-800 dark:text-white">
                              {usuario.rol}
                            </span>
                          </p>
                          <p>
                            <strong>Estado:</strong>{" "}
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300">
                              Activo
                            </span>
                          </p>
                          <p>
                            <strong>Meses trabajando:</strong> 8 meses
                          </p>
                          <p>
                            <strong>Dispositivo conectado:</strong> Xiaomi Redmi
                            Note 10
                          </p>
                          <p>
                            <strong>Último acceso:</strong> Hace 2 días
                          </p>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="w-full md:w-56 flex flex-col gap-3">
                        {/* Cambiar de cargo */}
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nuevo cargo
                          </label>
                          <select
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-gray-900"
                            defaultValue={usuario.rol}
                          >
                            <option value="admin">Administrador</option>
                            <option value="veterinario">Veterinario</option>
                            <option value="recepcionista">Recepcionista</option>
                            <option value="baños">Baños y cuidados</option>
                          </select>
                          <Button
                            onClick={() => cambiarCargo(usuario)}
                            className="w-full px-4 py-2 rounded-lg bg-[var(--button-success)] text-[var(--button-success-text)] hover:bg-[var(--button-success-hover)] text-sm"
                          >
                            Cambiar de cargo
                          </Button>
                        </div>

                        {/* Ver historial */}
                        <Button
                          onClick={() => verHistorial(usuario)}
                          className="w-full px-4 py-2 rounded-lg bg-[var(--button-secondary)] text-[var(--button-secondary-text)] hover:bg-[var(--primary)] text-sm"
                        >
                          Ver historial
                        </Button>

                        {/* Dar de baja */}
                        <Button
                          onClick={() => bajaUsuario(usuario)}
                          className="w-full px-4 py-2 rounded-lg bg-[var(--button-danger)] text-[var(--button-secondary-text)] hover:bg-[var(--button-danger-hover)] text-sm"
                        >
                          Dar de baja
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
