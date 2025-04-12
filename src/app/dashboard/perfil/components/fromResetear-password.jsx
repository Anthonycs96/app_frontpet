"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode"; // ✅ Esto funciona

import {
  resetearPassword,
  verifyCurrentPassword,
} from "@/api/endpoints/resetear-password";

export default function FormCambioContrasena({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Verificar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      // Obtener el token y decodificarlo para obtener el userId
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded?.id;

      if (!userId) {
        setError("Token inválido: no se encontró el ID del usuario.");
        setLoading(false);
        return;
      }

      // Verificar la contraseña actual
      const verifyResponse = await verifyCurrentPassword(
        currentPassword,
        userId,
        token
      );

      if (verifyResponse.message !== "Contraseña actual válida.") {
        setError("La contraseña actual es incorrecta.");
        setLoading(false);
        return;
      }

      // Proceder con el cambio de contraseña
      const response = await resetearPassword(newPassword, userId);
      console.log("Respuesta de cambio de contraseña:", response.status); // Para depuración

      if (response.status === 200) {
        setSuccess(response.data.message || "Contraseña cambiada con éxito.");
        onClose(); // Cerrar el modal o realizar otra acción
      } else {
        setError("Error al cambiar la contraseña.");
      }
    } catch (err) {
      setError("Error al cambiar la contraseña. Inténtalo de nuevo.");
      console.error("Error al cambiar la contraseña", err); // Para depuración
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 bg-[var(--background-secondary)] rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-semibold text-center mb-4">
        Cambiar contraseña
      </h2>

      {/* Contraseña actual */}
      <div className="relative">
        <Label htmlFor="currentPassword">Contraseña Actual</Label>
        <Input
          id="currentPassword"
          type={showCurrentPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          placeholder="Ingrese su contraseña actual"
        />
        <button
          type="button"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          className="absolute top-[70%] right-0 transform -translate-y-1/2 flex items-center justify-center w-10 text-[var(--muted-foreground)] hover:text-gray-700"
        >
          {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Nueva contraseña */}
      <div className="relative">
        <Label htmlFor="newPassword">Nueva contraseña</Label>
        <Input
          id="newPassword"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          placeholder="Ingrese su nueva contraseña"
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute top-[70%] right-0 transform -translate-y-1/2 flex items-center justify-center w-10 text-[var(--muted-foreground)] hover:text-gray-700"
        >
          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Confirmar nueva contraseña */}
      <div className="relative">
        <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirme su nueva contraseña"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute top-[70%] right-0 transform -translate-y-1/2 flex items-center justify-center w-10 text-[var(--muted-foreground)] hover:text-gray-700"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Mensajes */}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      {/* Botones de acción */}
      <div className="flex justify-end items-center gap-4 mt-4">
        <Button
          className="bg-[var(--button-danger)] hover:bg-[var(--button-danger-hover)]"
          type="button"
          variant="outline"
          onClick={onClose} // Botón de cancelar que también cierra el diálogo
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
