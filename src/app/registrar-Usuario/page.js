"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";
import FormRegistrarUsuarioEscritorio from "@/components/form.registrar";
import { registrar } from "@/api/endpoints/registrar";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        console.log("🔹 Datos del usuario:", formData);

        // const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

        try {
            const response = await registrar({
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                documentoIdentidad: formData.documentoIdentidad,
                preguntaSecreta: formData.preguntaSecreta,
                respuestaSecreta: formData.respuestaSecreta,
                fechaNacimiento: formData.fechaNacimiento,
                password: formData.password,
            });

            console.log("Respuesta del servidor:", response);
            toast.success("Usuario registrado correctamente");
            router.push("/");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            let message = "Error inesperado";

            if (error.response) {
                message = error.response.data?.mensaje || error.response.data?.error || message;
            } else if (error.request) {
                message = "No se pudo conectar con el servidor";
            } else {
                message = error.message;
            }

            toast.error(message);
        } finally {
            setTimeout(() => setIsLoading(false), 500);
        }
    };
    return (
        <div className="h-full w-full sm:flex sm:items-center sm:justify-center">
            <div className="min-h-screen max-w-[1300px] p-0 sm:p-6 md:p-8 transition-colors duration-300 flex items-center">
                <Card className="w-full max-w-[1300px] p-8 rounded-2xl shadow-lg">
                    <div className="space-y-6 flex flex-col justify-center h-full transition-all duration-500 ease-in-out">
                        <div className="text-center mb-4 sm:mb-4">
                            <Heading
                                level="h2"
                                className="text-3xl sm:text-3xl font-bold mb-2 sm:mb-3"
                            >
                                Registra un nuevo usuario
                            </Heading>
                        </div>
                        <FormRegistrarUsuarioEscritorio onSubmit={handleSubmit} />
                        {/* <FormRegistrar /> */}
                    </div>
                </Card>
            </div>
        </div>
    );
}