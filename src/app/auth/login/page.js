"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";
import FormLogin from "@/app/auth/login/form.login";
import { useRouter } from "next/navigation";
import { login } from "@/api/endpoints/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCountryCodes } from "@/hooks/useCountryCodes";

export default function Login() {
    const { countries, loading } = useCountryCodes();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const router = useRouter();
    const [error, setError] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("loginError") || "";
        }
        return "";
    });

    // Limpiar el error después de 30 segundos
    useEffect(() => {
        if (!error) return;
        const timer = setTimeout(() => {
            setError("");
            localStorage.removeItem("loginError");
        }, 30000);
        return () => clearTimeout(timer);
    }, [error]);

    // Redirigir si ya has iniciado sesión
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // Si no hay token, simplemente no hacer nada
            setPageLoading(false); // No hacer nada y solo permitir que la página se cargue
            return;
        }

        // Si el token está presente, validamos
        try {
            // Aquí puedes agregar tu lógica de validación de token si es necesario (por ejemplo, JWT Decode)
            // O si el token ya es válido, redirigimos al dashboard
            router.push("/dashboard");
        } catch (error) {
            console.error("Token inválido:", error);
            setPageLoading(false); // No hacer nada si el token es inválido
        }
    }, [router]);



    if (pageLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)]">
                <LoadingSpinner size={60} color="var(--primary)" />
            </div>
        );
    }

    const handleCloseError = () => {
        setError('');
        localStorage.removeItem("loginError");
    };

    return (
        <div className="h-full w-full sm:flex sm:items-center sm:justify-center">
            <div className="min-h-screen max-w-[480px] p-0 sm:p-6 md:p-8 transition-colors duration-300 flex items-center">
                <Card className="w-screen h-screen sm:w-auto sm:h-auto p-6 sm:p-8 rounded-2xl shadow-lg bg-[var(--background)]">
                    <div className="space-y-6 flex flex-col justify-center h-full transition-all duration-500 ease-in-out">
                        <div className="text-center mb-2 sm:mb-2">
                            <Heading
                                level="h2"
                                className="text-3xl sm:text-3xl font-bold mb-2 sm:mb-3 text-[var(--foreground)]"
                            >
                                Inicia sesión con cuenta VetListo+
                            </Heading>
                            {error && (
                                <div className="relative p-2 bg-red-100 text-red-700 rounded">
                                    {error}
                                    <button
                                        type="button"
                                        onClick={handleCloseError}
                                        className="absolute top-1 right-2 text-xl font-bold leading-none"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                        <FormLogin countries={countries} disabled={submitLoading} />
                    </div>
                </Card>
            </div>
        </div>
    );
}
