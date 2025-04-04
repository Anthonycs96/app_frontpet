"use client";

import Link from "next/link";
import { ArrowLeftCircle, Orbit } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

// Generador de números pseudoaleatorios con semilla
function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  // Estrellas pseudoaleatorias fijas
  const starPositions = useMemo(() => {
    const random = seededRandom(12345);
    return Array(20)
      .fill(0)
      .map(() => ({
        top: Math.floor(random() * 100),
        left: Math.floor(random() * 100),
        duration: 1 + Math.floor(random() * 2),
        delay: Math.floor(random() * 2),
      }));
  }, []);

  const animations = {
    float: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]"
    >
      {/* Burbuja decorativa */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-[var(--button)] opacity-10 blur-xl"
        variants={!shouldReduceMotion ? animations.float : {}}
        animate="float"
        style={{ left: "20%", top: "30%" }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-[var(--button-secondary)] opacity-10 blur-xl"
        variants={!shouldReduceMotion ? animations.float : {}}
        animate="float"
        style={{ right: "15%", top: "50%" }}
      />

      {/* Contenido */}
      <motion.div
        variants={animations.container}
        initial="hidden"
        animate="show"
        className="text-center p-8 rounded-xl relative z-10"
      >
        <motion.div variants={animations.item}>
          <div className="relative inline-block">
            <motion.div
              animate={!shouldReduceMotion ? { rotate: 360 } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-20"
            >
              <Orbit size={200} className="text-[var(--button)]" />
            </motion.div>
            <h1 className="text-9xl font-bold bg-gradient-to-r from-[var(--button)] to-[var(--button-secondary)] bg-clip-text text-transparent mb-4">
              404
            </h1>
          </div>
        </motion.div>

        <motion.p
          variants={animations.item}
          className="text-xl mb-2 max-w-2xl mx-auto"
        >
          ¡UPS! Parece que te has embarcado en un viaje cósmico sin rumbo...
        </motion.p>

        <motion.p
          variants={animations.item}
          className="text-sm text-[var(--muted-foreground)] mb-3"
        >
          La constelación que buscas se ha desplazado o quizás nunca existió en
          nuestro universo.
        </motion.p>

        <motion.p
          variants={animations.item}
          className="text-sm text-yellow-400 italic mb-8"
        >
          🛠️ Esta página está actualmente en construcción. Pronto estará
          disponible.
        </motion.p>

        <motion.div variants={animations.item}>
          <Link href="/auth/login">
            <motion.button
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--button)] to-[var(--button-secondary)] text-[var(--button-text)] rounded-lg hover:shadow-lg transition-all duration-300 mx-auto"
            >
              <ArrowLeftCircle size={20} />
              <span className="font-semibold">
                Regresar a la base terrestre
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Estrellas */}
      <div className="absolute inset-0 pointer-events-none">
        {starPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--muted-foreground)] rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
            }}
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
