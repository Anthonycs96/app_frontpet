"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Bell,
    Edit,
    Camera,
    Shield,
    Clock,
    Settings,
    ChevronDown,
    LogOut,
    Smartphone,
    Mail,
    MapPin,
    Calendar,
    CreditCard,
    Moon,
    Sun,
    ArrowLeft,
} from "lucide-react";
import Button from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import AvatarPerfil from "@/components/avatar.perfil";
import InformacionPerfil from "@/components/informacion.perfil";
import { jwtDecode } from "jwt-decode"; // ✅ Esto funciona
import { obtenerUsuarioPorId } from "@/api/endpoints/perfil";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PerfilPage() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [usuario, setUsuario] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isBlocked, setIsBlocked] = useState(false);
    const [smsAlerts, setSmsAlerts] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                if (!token) {
                    router.push("/");
                    return;
                }

                // Decodificar el token
                const decoded = jwtDecode(token);
                const userId = decoded?.id;

                if (!userId) {
                    throw new Error("Token inválido: no se encontró el ID del usuario");
                }

                // Obtener datos reales desde el backend
                const usuario = await obtenerUsuarioPorId(userId);
                console.log("🚀 usuario aqui:", usuario);
                setUsuario(usuario);
                setEditedData(usuario);
                setPageLoading(false); // Cargar la página si hay token
            } catch (error) {
                console.error("❌ Error al cargar datos del usuario:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    console.log("🚀 usuario con estado:", usuario);

    // Cargar datos del usuario
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // Simular una llamada a la API
                await new Promise((resolve) => setTimeout(resolve, 800));

                // Datos de ejemplo
                const data = {
                    id: "USR-2024-0042",
                    nombre: "María Rodríguez",
                    email: "maria.rodriguez@empresa.com",
                    direccion: "Lima, Perú",
                    countryCode: "+51",
                    phoneNumber: "987654321",
                    documentoIdentidad: "45678912",
                    fechaNacimiento: "1990-05-15",
                    fotoPerfil: "https://randomuser.me/api/portraits/women/44.jpg",
                    respuestaSecreta: "Firulais",
                    rol: "Especialista",
                    especialidad: "Recursos Humanos",
                    sueldo: 3500,
                    estado: "activo",
                    fechaContratacion: "2022-03-10",
                    departamento: "Administración",
                    supervisor: "Carlos Mendoza",
                    proyectosActivos: 3,
                };

                setUserData(data);
                setEditedData(data);
            } catch (error) {
                console.error("Error al cargar datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlockUnblock = () => {
        setIsBlocked(!isBlocked);
    };

    const handleToggleSmsAlerts = () => {
        setSmsAlerts(!smsAlerts);
    };

    const handleSaveChanges = () => {
        // Aquí enviarías los datos actualizados a tu backend
        console.log("Datos actualizados:", editedData);

        // Actualizar el estado local
        setUserData(editedData);

        // Mostrar notificación de éxito (en una app real usarías un toast)
        alert("Perfil actualizado correctamente");
    };

    // Formatear fecha de nacimiento
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    // Calcular edad
    const calculateAge = (dateString) => {
        if (!dateString) return "";
        const birthDate = new Date(dateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    if (pageLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)]">
                <LoadingSpinner size={60} color="var(--primary)" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[var(--background)]">
            {/* Barra de navegación fija */}
            <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border)]">
                <div className="flex items-center h-14 px-4">
                    <button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="mr-2 md:hidden"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-semibold">Perfil</h1>
                </div>
            </nav>

            {/* Contenido principal con scroll */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-0 md:p-6">
                    <Card className="w-full max-w-full">
                        <CardContent className="p-0 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start md:gap-x-10 space-y-6 md:space-y-0">
                                {/* Columna izquierda */}
                                <div className="w-full md:w-auto md:sticky md:top-20">
                                    <AvatarPerfil usuario={usuario} formatDate={formatDate} />
                                </div>

                                {/* Columna derecha con scroll independiente */}
                                <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
                                    <InformacionPerfil
                                        usuario={usuario}
                                        formatDate={formatDate}
                                        smsAlerts={smsAlerts}
                                        calculateAge={calculateAge}
                                        handleToggleSmsAlerts={handleToggleSmsAlerts}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
