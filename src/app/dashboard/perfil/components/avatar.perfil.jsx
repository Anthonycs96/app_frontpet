import { MapPin, Mail, Smartphone, Camera } from "lucide-react";
import Avatar from "@/components/avatar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AvatarPerfil({ usuario }) {
  if (!usuario) return null;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full md:w-72 rounded-lg overflow-hidden bg-[var(--background-secondary)] shadow-lg"
    >
      {/* Sección Superior */}
      <div className="relative h-32 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-foreground)] opacity-90">
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-[var(--background-secondary)]"
          >
            <Avatar
              src={usuario.usuario.fotoPerfil}
              name={usuario.usuario.nombre}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white w-6 h-6" />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Información Personal */}
      <div className="pt-16 pb-4 px-4 text-center">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          {usuario.usuario.nombre}
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          {usuario.usuario.rol} · {usuario.usuario.especialidad}
        </p>
      </div>
      {/* Información de Contacto */}
      <div className="px-4 pb-4 space-y-2">
        {[
          // {
          //   icon: MapPin,
          //   content: usuario.usuario.direccion,
          //   href: `https://maps.google.com/?q=${usuario.usuario.direccion}`,
          // },
          // {
          //   icon: Mail,
          //   content: usuario.usuario.email,
          //   href: `mailto:${usuario.usuario.email}`,
          // },
          {
            icon: Smartphone,
            content: `${usuario.usuario.paisCode} ${usuario.usuario.telefono}`,
            // href: `tel:${usuario.usuario.paisCode}${usuario.usuario.telefono}`,
          },
        ].map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 p-2 rounded hover:bg-[var(--accent)] transition-colors"
          >
            <item.icon className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-sm text-[var(--foreground)]">
              {item.content}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
