"use client";
//
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  User,
  MapPin,
  Smartphone,
  Mail,
  Lock,
  Camera,
  Calendar,
  CreditCard,
  ChevronLeft,
  Check,
  X,
} from "lucide-react";

export default function fromEditarDatos({ usuario, countries }) {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState(usuario.usuario.PaisCode);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  return (
    <form className="w-full max-w-3xl space-y-4 bg-[var(--background-secondary)] rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold text-center">Editar Datos</h2>
      <p className="text-sm text-center text-[var(--muted-foreground)]">
        Puedes modificar los datos visibles en tu perfil.
      </p>

      {/* Grid con 2 columnas en escritorio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <Label
            htmlFor="nombre"
            className="block text-sm text-[var(--foreground)]"
          >
            Nombre
          </Label>
          <Input
            type="text"
            id="nombre"
            placeholder="Nombre"
            required
            defaultValue={usuario.usuario.nombre}
          />
        </div>

        {/* Apellido */}
        {/* <div>
          <Label
            htmlFor="apellido"
            className="block text-sm text-[var(--foreground)]"
          >
            Apellido
          </Label>
          <Input type="text" id="apellido" placeholder="Apellido" required />
        </div> */}

        {/* Fecha de nacimiento */}
        <div className="space-y-2">
          <Label htmlFor="fechaNacimiento" className="flex items-center gap-2">
            <Calendar size={16} className="text-[var(--icon-secondary-bg)]" />
            Fecha de nacimiento
          </Label>
          <Input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            defaultValue={usuario.usuario.fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
            className="
    w-full pl-4 pr-3 py-2.5 rounded-xl border border-[var(--border)]
    text-[var(--icon-secondary-bg)]
    [&::-webkit-calendar-picker-indicator]:cursor-pointer
    [&::-webkit-calendar-picker-indicator]:invert-0
    dark:[&::-webkit-calendar-picker-indicator]:invert
  "
          />
        </div>

        {/* Dirección */}
        <div>
          <Label
            htmlFor="direccion"
            className="block text-sm text-[var(--foreground)]"
          >
            Dirección
          </Label>
          <Input
            type="text"
            id="direccion"
            placeholder="Dirección"
            required
            defaultValue={usuario.usuario.direccion}
          />
        </div>

        {/* Correo */}
        <div>
          <Label
            htmlFor="correo"
            className="block text-sm text-[var(--foreground)]"
          >
            Correo
          </Label>
          <Input
            type="email"
            id="correo"
            placeholder="Correo electrónico"
            required
            defaultValue={usuario.usuario.email}
          />
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="flex items-center gap-2">
            <Smartphone size={16} className="text-primary" />
            Teléfono
          </Label>
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 background2 backgroundprimary backgroundt-transparent rounded-full"></div>
            </div>
          )}
          <select
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full h-10 px-3 rounded-md border background[var(--border)] bg-background text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary focus:backgroundtransparent"
          >
            {isLoading ? (
              <option>Cargando países...</option>
            ) : (
              countries.map((country) => (
                <option
                  key={`${country.code}-${country.name}`}
                  value={country.code}
                >
                  {country.name} ({country.code})
                </option>
              ))
            )}
          </select>
          <div className="flex gap-2">
            <Input
              id="phoneNumber"
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
              }
              type="text"
              required
              className="w-full pl-4 pr-3 py-2.5 rounded-xl border"
              placeholder="987654321"
              defaultValue={usuario.usuario.telefono}
            />
          </div>
          {phoneNumber && !validarTelefono(phoneNumber) && (
            <p className="text-xs text-red-500 mt-1">
              Debe empezar con 9 y tener 9 dígitos
            </p>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end items-center gap-4 pt-4">
        <Button
          className="bg-[var(--button-danger)] hover:bg-[var(--button-danger-hover)]"
          type="button"
          variant="outline"
          onClick={() => setIsDialogOpen(false)}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-[var(--button)] hover:bg-[var(--button-hover)]"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}
