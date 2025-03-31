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
import FormForgotPassword from '@/components/form.forgot-password';
import { Modal, ModalContent, ModalTitle, ModalDescription, ModalTrigger } from '@/components/ui/Modal';


export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que se recargue la página
        console.log("Evento submit capturado, evitando recarga.");

        try {
            const response = await onSubmit({
                countryCode,
                phoneNumber,
                password,
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setErrorMessage("Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.");
                } else {
                    setErrorMessage("Ocurrió un error inesperado. Inténtalo de nuevo más tarde.");
                }
            } else {
                console.log("Login exitoso");
                setErrorMessage(""); // Limpia el mensaje de error si el login es exitoso
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error);
            setErrorMessage("Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo.");
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
                                Ingresa tu correo electrónico para restablecer tu contraseña
                            </p>
                        </CardHeader>

                        <CardContent>
                            <FormForgotPassword onSubmit={handleSubmit} />
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