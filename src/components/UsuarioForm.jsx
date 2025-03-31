'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useState } from "react";

export default function UsuarioForm({ usuario, onSubmit }) {
  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || "",
    direccion: usuario?.direccion || "",
    documentoIdentidad: usuario?.documentoIdentidad || "",
    especialidad: usuario?.especialidad || "",
    sueldo: usuario?.sueldo || "",
    fechaNacimiento: usuario?.fechaNacimiento || "",
    rol: usuario?.rol || "Cliente",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Usuario</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Documento de Identidad</label>
            <input
              type="text"
              name="documentoIdentidad"
              value={form.documentoIdentidad}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Especialidad</label>
            <input
              type="text"
              name="especialidad"
              value={form.especialidad}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sueldo</label>
            <input
              type="number"
              name="sueldo"
              value={form.sueldo}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Cliente">Cliente</option>
              <option value="Trabajador">Trabajador</option>
              <option value="Administrador">Administrador</option>
              <option value="Veterinario">Veterinario</option>
              <option value="Recepcionista">Recepcionista</option>
              <option value="Asistente Veterinario">Asistente Veterinario</option>
              <option value="Personal de Servicios">Personal de Servicios</option>
              <option value="Encargado de Inventario">Encargado de Inventario</option>
              <option value="Superadmin">Superadmin</option>
            </select>
          </div>

          <Button type="submit">Guardar Cambios</Button>
        </form>
      </CardContent>
    </Card>
  );
}
