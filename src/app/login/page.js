"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";
import FormLogin from "@/components/form.login";
import { useRouter } from "next/navigation";
import { login } from "@/api/endpoints/auth";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Login() {
    const [countries, setCountries] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const router = useRouter();

    const [error, setError] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("loginError") || "";
        }
        return "";
    });

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
        if (token) return router.push("/dashboard/citas");
        setPageLoading(false);
    }, [router]);

    // Fetch country codes
    useEffect(() => {
        const fetchCountries = async () => {
            setPageLoading(true);
            try {
                const resp = await fetch("https://restcountries.com/v3.1/all");
                const data = await resp.json();
                const list = data
                    .map(c => ({
                        name: c.name.common,
                        code: c.idd.root + (c.idd.suffixes?.[0] ?? ""),
                    }))
                    .filter(c => c.code)
                    .sort((a, b) => (a.code === "+51" ? -1 : b.code === "+51" ? 1 : a.name.localeCompare(b.name)));
                setCountries(list);
            } catch {
                toast.error("Error cargando países");
            }
            finally {
                setTimeout(() => setPageLoading(false), 500);
            }
        };
        fetchCountries();
    }, []);

    const handleSubmit = async (formData) => {
        setError("");
        setSubmitLoading(true);

        const telefono = `${formData.countryCode}${formData.phoneNumber}`;
        const password = formData.password;

        if (!telefono || !password) {
            setError("Ingresa teléfono y contraseña.");
            localStorage.setItem("loginError", "Ingresa teléfono y contraseña.");
            setSubmitLoading(false);
            return;
        }

        try {
            const response = await login({ telefono, password });
            console.log("Login exitoso:", response);
            localStorage.setItem("token", response.token);
            setError("");
            localStorage.removeItem("loginError");
            router.push("/dashboard/citas");
        } catch (err) {
            const msg = err.response?.data?.message || "Credenciales incorrectas.";
            setError(msg);
            localStorage.setItem("loginError", msg);
        } finally {
            setSubmitLoading(false);
        }
    };


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
                <Card className="w-screen h-screen sm:w-auto sm:h-auto p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="space-y-6 flex flex-col justify-center h-full transition-all duration-500 ease-in-out">
                        <div className="text-center mb-2 sm:mb-2">
                            <Heading
                                level="h2"
                                className="text-3xl sm:text-3xl font-bold mb-2 sm:mb-3"
                            >
                                Inicia sesión con cuenta VetListo+
                            </Heading>
                            {error && (
                                <div className="relative p-2 bg-red-100 text-red-700 rounded">
                                    {error}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setError("");
                                            localStorage.removeItem("loginError");
                                        }}
                                        className="absolute top-1 right-2 text-xl font-bold leading-none"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                        </div>
                        <FormLogin onSubmit={handleSubmit} countries={countries} disabled={submitLoading} />
                    </div>
                </Card>
            </div>
        </div>
    );
}
