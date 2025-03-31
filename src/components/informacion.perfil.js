import { MapPin, Mail, Smartphone, ArrowLeft, Shield, Activity, User, CreditCard, Calendar, Bell, ToggleLeft, ToggleRight, Clock, Edit, Cake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/button";
import { useState } from "react";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import { ActivityItem } from './ActivityItem';

export default function InformacionPerfil({ usuario, formatDate, smsAlerts, handleToggleSmsAlerts, calculateAge }) {

    const [activeTab, setActiveTab] = useState("personal");
    const deviceInfo = useDeviceInfo();
    if (!usuario) return null;

    const handleSubmit = async (formData) => {
        console.log("Datos del usuario aca:", formData);
    };


    const getRelativeTime = (date) => {
        const now = new Date();
        const diff = now - new Date(date);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 60) return `Hace ${minutes} minutos`;
        if (hours < 24) return `Hace ${hours} horas`;
        return `Hace ${days} días`;
    };

    const renderContent = () => {
        switch (activeTab) {
            case "personal":
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >

                        <div className="grid gap-4">
                            <div className="flex items-center gap-4 p-4 bg-[var(--secondary)] rounded-lg hover:bg-[var(--accent)] transition-colors">
                                <MapPin className="text-[var(--primary)]" size={20} />
                                <div>
                                    <p className="text-sm font-medium">Ubicación</p>
                                    <p className="text-[var(--muted-foreground)]">
                                        {usuario.usuario.direccion || "Añadir dirección"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-[var(--secondary)] rounded-lg hover:bg-[var(--accent)] transition-colors">
                                <Mail className="text-[var(--primary)]" size={20} />
                                <div>
                                    <p className="text-sm font-medium">Correo</p>
                                    <p className="text-[var(--muted-foreground)]">{usuario.usuario.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-[var(--secondary)] rounded-lg hover:bg-[var(--accent)] transition-colors">
                                <Smartphone className="text-[var(--primary)]" size={20} />
                                <div>
                                    <p className="text-sm font-medium">Teléfono</p>
                                    <p className="text-[var(--muted-foreground)]">
                                        {usuario.usuario.telefono || "Añadir teléfono"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            // ... otros casos
        }
    };

    const notificationsSection = (
        <div className="pt-4">
            <p className="text-xs text-[var(--muted-foreground)] mb-1">Notificaciones</p>
            <div className="bg-[var(--secondary)] p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell size={16} className="text-[var(--primary)]" />
                        <span className="text-sm font-medium">Alertas SMS</span>
                    </div>
                    <button
                        onClick={handleToggleSmsAlerts}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                        style={{
                            backgroundColor: smsAlerts ? 'var(--primary)' : 'var(--muted)'
                        }}
                    >
                        <span
                            className={`${smsAlerts ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );

    const activitySection = (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-[var(--foreground)]">Actividad reciente</h3>
                <Button variant="outline" size="sm">Ver todo</Button>
            </div>

            <div className="space-y-2">
                <ActivityItem
                    icon={Clock}
                    title="Inicio de sesión exitoso"
                    description={`${getRelativeTime(new Date())} • ${deviceInfo.browserName} en ${deviceInfo.deviceType}`}
                />

                <ActivityItem
                    icon={Edit}
                    title="Perfil actualizado"
                    description="Hace 3 días • Información personal"
                />

                <ActivityItem
                    icon={Clock}
                    title="Cuenta creada"
                    description="Hace 1 semana"
                />
            </div>
        </motion.div>
    );

    return (
        <div className="w-full bg-[var(--background-secondary)] rounded-lg shadow-lg overflow-hidden">

            <nav className="border-b border-[var(--border)] p-4">
                <div className="flex gap-6">
                    {[
                        { id: "personal", icon: User, label: "Personal" },
                        { id: "security", icon: Shield, label: "Seguridad" },
                        { id: "activity", icon: Activity, label: "Actividad" }
                    ].map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`
                                flex items-center gap-2 pb-2 px-1
                                font-medium text-sm transition-all
                                ${activeTab === id
                                    ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                }
                            `}
                        >
                            <Icon size={16} />
                            {label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="mt-4">
                {activeTab === "personal" && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-[var(--muted-foreground)]">
                                    Documento de Identidad
                                </p>
                                <p className="flex items-center gap-2">
                                    <CreditCard size={16} className="text-[var(--primary)]" />
                                    {usuario.usuario.documentoIdentidad}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs text-[var(--muted-foreground)]">
                                    Fecha de Nacimiento
                                </p>
                                <p className="flex items-center gap-2">
                                    <Cake size={16} className="text-[var(--primary)]" />
                                    {formatDate(usuario.usuario.fechaNacimiento)}

                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-[var(--muted-foreground)]">
                                    Edad
                                </p>
                                <p className="flex items-center gap-2">
                                    <Calendar size={16} className="text-[var(--primary)]" />
                                    {usuario.usuario.fechaNacimiento && (
                                        <span>
                                            {calculateAge(usuario.usuario.fechaNacimiento)}{" "}
                                            años
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {notificationsSection}
                    </div>
                )}

                {activeTab === "security" && (
                    <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">Contraseña</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Última actualización: {getRelativeTime(usuario.usuario.contraseniaActualizada)}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Cambiar
                                </Button>
                            </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">
                                        Verificación en dos pasos
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        No activada
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Activar
                                </Button>
                            </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="font-medium mb-2 text-[var(--foreground)]">
                                Dispositivos conectados
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                                            <Shield size={20} className="text-[var(--primary)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[var(--foreground)]">
                                                Este dispositivo
                                            </p>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-xs text-[var(--muted-foreground)]">
                                                    {deviceInfo.browserName} • {deviceInfo.deviceType}
                                                </p>
                                                <p className="text-xs text-[var(--muted-foreground)]">
                                                    Último acceso: {deviceInfo.lastActive}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs px-2.5 py-1 bg-green-500/10 text-green-500 rounded-full font-medium">
                                            Activo ahora
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "activity" && activitySection}
            </div>

            <div className="p-6">
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>
        </div>
    );
}