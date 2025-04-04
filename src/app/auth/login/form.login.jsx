"use client";

import { useState } from "react";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormLogin({ onSubmit, countries = [] }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+51"); // Default a Perú
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const navigate = () => {
    router.push("/auth/ForgotPasswordPage");
  };

  const navigateRegister = () => {
    router.push("/auth/Register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    setError("");
    setIsSubmitting(true);
    try {
      console.log("Submit capturado en FormLogin");
      const response = await onSubmit({
        countryCode,
        phoneNumber,
        password,
      });

      // if (!response.ok) {
      //   if (response.status === 401) {
      //     alert(
      //       "Credenciales incorrectas. Por favor, verifica tu usuario y contraseña."
      //     );
      //   } else {
      //     alert("Ocurrió un error inesperado. Inténtalo de nuevo más tarde.");
      //   }
      // } else {
      //   console.log("Login exitoso");
      // }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      alert("Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Selección de País */}
        <div>
          <Label htmlFor="countryCodeSelect">País</Label>
          <select
            id="countryCodeSelect"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full p-2.5 pr-3 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors"
          >
            {countries.map((country) => (
              <option
                key={`${country.code}-${country.name}`}
                value={country.code}
              >
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>
        {/* Número de Teléfono */}
        <div>
          <Label htmlFor="phoneNumber">Número de Teléfono</Label>
          <div className="relative">
            <Input
              id="countryCodeDisplay"
              name="countryCodeDisplay"
              type="text"
              value={countryCode}
              readOnly
              tabIndex={-1}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm sm:text-base select-none cursor-not-allowed pointer-events-none w-fit px-1"
            />
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPhoneNumber(value);
              }}
              type="text"
              required
              className="w-full pl-[4.5rem] pr-10 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors"
              placeholder="987654321"
            />
          </div>
        </div>
        {/* Contraseña */}
        <div>
          <div className="relative">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingrese su contraseña"
              className="w-full p-2.5 pr-10 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[70%] right-0 transform -translate-y-1/2 flex items-center justify-center w-10 px-3 text-[var(--muted-foreground)] hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        {/* Enlace para "Olvidé mi contraseña" */}
        <div className="text-right mt-2 flex">
          <button
            type="button"
            onClick={navigate}
            className="text-sm text-[var(--muted-foreground)] hover:underline"
          >
            Olvidé mi contraseña, da click aquí!
          </button>
        </div>
        {/* Botón de Envío */}
        <Button
          type="submit"
          className="w-full bg-[var(--primary)] text-[var(--background)] py-2.5 rounded-xl"
        >
          Iniciar Sesión
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-[var(--muted-foreground)]">o</span>
          </div>
        </div>
        <Button
          type="button"
          onClick={navigateRegister}
          className="w-full bg-[var(--button-secondary)] text-[var(--foreground)] py-2.5 rounded-xl"
        >
          Crear cuenta nueva
        </Button>
      </div>
    </form>
  );
}
