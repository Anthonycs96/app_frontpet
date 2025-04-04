'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading";
import { useRouter } from "next/navigation";
import { recuperarPassword } from "@/api/endpoints/recuperar-password";
import { toast } from 'react-toastify';
import { Frown } from 'lucide-react';
import Button from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import FormForgotPassword from '@/app/auth/ForgotPasswordPage/form.forgot-password';
import { Modal, ModalContent, ModalTitle, ModalDescription, ModalTrigger } from '@/components/ui/Modal';

export default function ForgotPasswordPage() {
    const [codigorecuperacion, setCodigorecuperacion] = useState('');
    const [mesajerecuperacion, setMesajerecuperacion] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    console.log("codigorecuperacion:", codigorecuperacion);
    console.log("mesajerecuperacion:", mesajerecuperacion);
    const navegar = () => {
        router.push("/");
    };

    // Verificar si el usuario ya está autenticado
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/dashboard");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await recuperarPassword(formData);
            setCodigorecuperacion(response.codigo);
            setMesajerecuperacion(response.mensaje);

            // Redirigir con el código en la URL
            const url = `/auth/PasswordChangeRequestPage?codigo=${encodeURIComponent(response.codigo)}`;
            router.push(url);

        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            setErrorMessage('Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
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
            <div className="min-h-screen max-w-[480px] p-2 sm:p-6 md:p-8 transition-colors duration-300 flex items-center">
                <Card className="w-screen h-screen sm:w-auto sm:h-auto p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="space-y-6 flex flex-col justify-center h-full transition-all duration-500 ease-in-out">
                        <CardHeader className="text-center mb-6 sm:mb-8">
                            <Heading
                                level="h2"
                                className="text-3xl sm:text-3xl font-bold mb-2 sm:mb-3"
                            >
                                Recupera tu contraseña
                            </Heading>
                            <p className="text-muted-foreground">
                                Ingrese su número de teléfono para restablecer su contraseña
                            </p>
                        </CardHeader>

                        <CardContent>
                            <FormForgotPassword
                                countryCode={countryCode}
                                setCountryCode={setCountryCode}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                                password={password}
                                setPassword={setPassword}
                                errorMessage={errorMessage}
                                onSubmit={handleSubmit}
                            />
                        </CardContent>

                        <CardFooter className="flex justify-center">
                            <button
                                onClick={navegar}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                ← Volver al inicio de sesión
                            </button>
                        </CardFooter>
                    </div>
                </Card>
            </div>

            <Modal open={modalOpen} onOpenChange={setModalOpen}>
                <ModalContent>
                    <ModalTitle className="flex items-center justify-center gap-2 text-[var(--destructive)]">
                        <Frown className="w-6 h-6" />
                        Error al recuperar contraseña
                    </ModalTitle>

                    <ModalDescription>
                        {modalMessage}
                    </ModalDescription>
                    <div className="flex items-center justify-center mt-4">
                        <Button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2 rounded bg-[var(--background-secondary)] text-[var(--primary-foreground)] hover:bg-[var(--background-secondary)]/90 transition-colors"
                        >
                            Cerrar
                        </Button>
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
}
