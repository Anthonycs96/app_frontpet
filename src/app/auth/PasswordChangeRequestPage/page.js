'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';
import LoadingSpinner from "@/components/LoadingSpinner";
import FormChangePassword from '@/app/auth/PasswordChangeRequestPage/form.change-password';
import { cambiarPassword } from '@/api/endpoints/cambiar-password';

export default function PasswordChangeRequestPage() {
    console.log("PasswordChangeRequestPage - Componente montado");

    const [isLoading, setIsLoading] = useState(true);
    const [codigoRecuperacion, setCodigoRecuperacion] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();

    const navigate = () => {
        router.push("/auth/login");
    };

    useEffect(() => {
        console.log("PasswordChangeRequestPage - useEffect ejecutado");
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/");
        } else {
            const codigo = searchParams.get('codigo');
            if (codigo) {
                console.log("PasswordChangeRequestPage - Código encontrado en URL:", codigo);
                setCodigoRecuperacion(codigo);
                setIsLoading(false);
            } else {
                console.log("PasswordChangeRequestPage - No se encontró código en URL");
                // Si no hay código en la URL, redirigir al usuario
                router.push('/auth/ForgotPasswordPage');
            }
        }
    }, [searchParams, router]);

    const handleSubmit = async (formData) => {
        const paisCode = formData.countryCode;
        const telefono = formData.phoneNumber;
        const nuevaPassword = formData.password;
        const respuestaSecreta = formData.respuestaSecreta;

        console.log("Datos armados:", {
            paisCode,
            telefono,
            nuevaPassword,
            respuestaSecreta,
            codigo: codigoRecuperacion,
        });

        try {
            const response = await cambiarPassword({
                paisCode,
                telefono,
                nuevaPassword,
                respuestaSecreta,
                codigo: codigoRecuperacion
            });

            console.log("Respuesta del servidor:", response);
            toast.success("Enlace de recuperación enviado");
            router.push('/auth/login')
            console.log("Respuesta del servidor 2:", response);
        } catch (error) {
            console.error("Error al recuperar la contraseña:", error);
            toast.error(error.message || "Error al recuperar la contraseña");
        }
    };

    if (isLoading) {
        console.log("PasswordChangeRequestPage - Cargando...");
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
                                Ingresa tu nueva contraseña usando el código: {codigoRecuperacion}
                            </p>
                        </CardHeader>

                        <CardContent>
                            <FormChangePassword
                                codigoRecuperacion={codigoRecuperacion}
                                onSubmit={handleSubmit}
                            />
                        </CardContent>

                        <CardFooter className="flex justify-center">
                            <button
                                onClick={navigate}
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