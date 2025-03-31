'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import LoadingSpinner from "@/components/LoadingSpinner";
import FormChangePassword from '@/components/form.change-password';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const navegar = () => {
        router.push("/recuperar-password");
    };

    // Verificar si el usuario ya está autenticado
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    const handleSubmit = async (formData) => {
        // Combinar el código del país con el número de teléfono
        const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;
        console.log("Número completo:", fullPhoneNumber);

        try {
            const response = await recuperarPassword({
                telefono: fullPhoneNumber
            });

            console.log("Respuesta del servidor:", response);
            toast.success("Enlace de recuperación enviado");
            // setTimeout(() => router.push('/login'), 3000);
        } catch (error) {
            console.error("Error al recuperar la contraseña:", error);
            toast.error(error.message || "Error al recuperar la contraseña");
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)]">
                <LoadingSpinner size={60} color="var(--primary)" />
            </div>
        );
    }

    return (
        <div className="h-full w-full sm:flex sm:items-center sm:justify-center">
            <div className="min-h-screen max-w-[980px] p-0 sm:p-6 md:p-8 transition-colors duration-300 flex items-center">
                <Card className="w-screen h-screen sm:w-auto sm:h-auto p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="space-y-6 flex flex-col justify-center h-full transition-all duration-500 ease-in-out">

                        <CardHeader className="text-center mb-6 sm:mb-8">
                            <Heading
                                level="h2"
                                className="text-3xl sm:text-3xl font-bold mb-2 sm:mb-3"
                            >
                                Cambiar contraseña
                            </Heading>
                            <p className="text-muted-foreground">
                                Ingresa tu número de teléfono para restablecer tu contraseña
                            </p>
                        </CardHeader>

                        <CardContent>
                            <FormChangePassword onSubmit={handleSubmit} />
                        </CardContent>

                        <CardFooter className="flex justify-center">
                            <button
                                onClick={navegar}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                ← Volver al recuperar contraseña
                            </button>
                        </CardFooter>
                    </div>
                </Card>
            </div>
        </div>
    );
}