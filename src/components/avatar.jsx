"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Avatar({
  src,
  alt = "Avatar",
  name,
  size = "md",
  shape = "circle",
  status = "none",
  border = false,
  className,
  fallbackClassName,
  onClick,
}) {
  const [imageError, setImageError] = useState(false);
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");

  // Generar iniciales a partir del nombre
  useEffect(() => {
    if (name) {
      const nameParts = name.split(" ");
      if (nameParts.length >= 2) {
        setInitials(`${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase());
      } else if (nameParts.length === 1 && nameParts[0].length > 0) {
        setInitials(nameParts[0][0].toUpperCase());
      } else {
        setInitials("");
      }
    } else {
      setInitials("");
    }
  }, [name]);

  // Generar un color de fondo basado en el nombre
  useEffect(() => {
    if (name) {
      // Generar un color basado en el nombre para que sea consistente
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }

      // Convertir a un color HSL con saturación y luminosidad fijas para asegurar legibilidad
      const h = Math.abs(hash % 360);
      setBgColor(`hsl(${h}, 70%, 60%)`);
    } else {
      // Color por defecto
      setBgColor("hsl(210, 70%, 60%)");
    }
  }, [name]);

  // Manejar error de carga de imagen
  const handleImageError = () => {
    setImageError(true);
  };

  // Mapeo de tamaños a clases
  const sizeClasses = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-xl",
  };

  // Mapeo de formas a clases
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-lg",
  };

  // Mapeo de estados a clases
  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
    none: "hidden",
  };

  // Determinar qué renderizar (imagen, iniciales o icono)
  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn("w-full h-full object-cover", shapeClasses[shape])}
          onError={handleImageError}
        />
      );
    } else if (initials) {
      return (
        <div
          className={cn(
            "flex items-center justify-center w-full h-full font-medium text-white",
            shapeClasses[shape],
            fallbackClassName
          )}
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
      );
    } else {
      return (
        <div
          className={cn(
            "flex items-center justify-center w-full h-full bg-muted",
            shapeClasses[shape],
            fallbackClassName
          )}
        >
          <User className="w-1/2 h-1/2 text-muted-foreground/60" />
        </div>
      );
    }
  };

  return (
    <div
      className={cn(
        "relative inline-block",
        sizeClasses[size],
        border && "ring-2 ring-background",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {renderContent()}

      {/* Indicador de estado */}
      {status !== "none" && (
        <span
          className={cn(
            "absolute block rounded-full ring-2 ring-background",
            statusClasses[status],
            size === "xs"
              ? "w-2 h-2 right-0 bottom-0"
              : "w-3 h-3 right-0 bottom-0"
          )}
        />
      )}
    </div>
  );
}
