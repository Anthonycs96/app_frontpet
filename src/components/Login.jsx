"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+51"); // Default to Peru
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data
          .map((country) => ({
            name: country.name.common,
            code:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ""),
          }))
          .filter((country) => country.code);

        const sortedCountries = countryList.sort((a, b) => {
          if (a.code === "+51") return -1; // Peru first
          if (b.code === "+51") return 1;
          return a.name.localeCompare(b.name);
        });

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de autenticación
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="h-full w-full sm:flex sm:items-center sm:justify-center">
      <div className="min-h-screen max-w-[480px] p-0 sm:p-6 md:p-8 transition-colors duration-300 flex items-center">
        <Card className="w-screen h-screen sm:w-auto sm:h-auto p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="space-y-6 flex flex-col justify-center h-full transition-all duration-500 ease-in-out">
            <div className="text-center mb-6 sm:mb-8">
              <Heading
                level="h2"
                className="text-3xl sm:text-3xl font-bold mb-2 sm:mb-3"
              >
                Inicia sesión con cuenta VetListo+
              </Heading>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* País */}
              <div>
                <Label htmlFor="countryCode">País</Label>
                <select
                  id="countryCode"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full p-2.5 pr-3 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors"
                >
                  {countries.map((country) => (
                    <option
                      className="bg-[var(--background-secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:text-[var(--foreground)]"
                      key={`${country.code}-${country.name}`}
                      value={country.code}
                    >
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
              </div>
              {/* Teléfono */}
              <div>
                <Label htmlFor="phoneNumber">Número de Teléfono</Label>
                <div className="relative">
                  <Input
                    id="countryCode"
                    name="countryCode"
                    type="text"
                    value={countryCode}
                    readOnly
                    className="absolute left-3 top-1/2 -translate-y-1/2  text-sm sm:text-base"
                  />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    required
                    className=" w-full pl-[4.5rem] pr-3 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors"
                    placeholder="987654321"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-3 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full bg-[var(--primary)] text-[var(--background)]"
              >
                Iniciar sesión
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-[var(--muted-foreground)]">o</span>
                </div>
              </div>
              <Link href="/register" className="block w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-[var(--button-secondary)] text-[var(--foreground)]"
                >
                  Crear cuenta nueva
                </Button>
              </Link>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
