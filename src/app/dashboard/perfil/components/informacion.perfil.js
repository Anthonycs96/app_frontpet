"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from 'react-toastify'
import {
    MapPin, Mail, Smartphone, Shield, Activity, User, CreditCard,
    Calendar, Pencil, Clock, Edit, Cake
} from "lucide-react"

// Componentes
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { useDeviceInfo } from "@/hooks/useDeviceInfo"
import { useCountryCodes } from "@/hooks/useCountryCodes"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import FormCambioContrasena from "@/app/dashboard/perfil/components/fromResetear-password"
import FormEditarDatos from "@/app/dashboard/perfil/components/fromEditarDatos"

// Componentes reutilizables
const ActivityItem = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--secondary)]">
        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <Icon size={16} className="text-[var(--primary)]" />
        </div>
        <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{description}</p>
        </div>
    </div>
)

const InfoField = ({ icon, label, value, placeholder }) => (
    <div className="flex items-center gap-4 p-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--accent)] transition-colors relative group">
        {icon}
        <div className="flex-1">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-[var(--muted-foreground)]">
                {value || placeholder || `Añadir ${label.toLowerCase()}`}
            </p>
        </div>
    </div>
)

// Constantes
const TABS = [
    { id: "personal", icon: User, label: "Personal" },
    { id: "security", icon: Shield, label: "Seguridad" },
    { id: "activity", icon: Activity, label: "Actividad" },
]

// Esquema de validación
const userFormSchema = z.object({
    direccion: z.string().optional(),
    email: z.string().email({ message: "Correo electrónico inválido" }),
    telefono: z.string().optional(),
    documentoIdentidad: z.string().min(1, { message: "El documento de identidad es requerido" }),
    fechaNacimiento: z.string().optional(),
})

export default function InformacionPerfil({
    usuario: initialUsuario,
    formatDate,
    calculateAge,
}) {
    // Estados
    const [activeTab, setActiveTab] = useState("personal")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [usuario, setUsuario] = useState(initialUsuario)

    // Hooks
    const deviceInfo = useDeviceInfo()
    const { countries } = useCountryCodes()
    const form = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            direccion: usuario.usuario.direccion || "",
            email: usuario.usuario.email || "",
            telefono: usuario.usuario.telefono || "",
            documentoIdentidad: usuario.usuario.documentoIdentidad || "",
            fechaNacimiento: usuario.usuario.fechaNacimiento || "",
        },
    })

    // Handlers
    const handleSubmit = async (formData) => {
        try {
            setUsuario(prev => ({
                ...prev,
                usuario: { ...prev.usuario, ...formData }
            }))

            toast.success("Perfil actualizado correctamente")
            setIsDialogOpen(false)
        } catch (error) {
            toast.error("Error al actualizar el perfil")
        }
    }

    // Componentes de pestañas
    const TabContent = {
        personal: () => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid gap-4">
                    <InfoField
                        icon={<MapPin className="text-[var(--primary)]" size={20} />}
                        label="Ubicación"
                        value={usuario.usuario.direccion}
                    />
                    <InfoField
                        icon={<Mail className="text-[var(--primary)]" size={20} />}
                        label="Correo"
                        value={usuario.usuario.email}
                    />
                    <InfoField
                        icon={<Smartphone className="text-[var(--primary)]" size={20} />}
                        label="Teléfono"
                        value={usuario.usuario.telefono}
                    />
                </div>
            </motion.div>
        ),

        security: () => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-[var(--secondary)] p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Contraseña</h3>
                            <p className="text-sm text-[var(--muted-foreground)]">
                                Última actualización: {new Date(usuario.usuario.contraseniaActualizada).toLocaleDateString()}
                            </p>
                        </div>
                        <Button className="bg-[var(--button)] hover:bg-[var(--button-hover)]" variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
                            Cambiar
                        </Button>
                    </div>
                </div>
            </motion.div>
        ),

        activity: () => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="space-y-2">
                    <ActivityItem
                        icon={Clock}
                        title="Inicio de sesión exitoso"
                        description={`Hace 5 minutos • ${deviceInfo.browserName}`}
                    />
                </div>
            </motion.div>
        )
    }

    return (
        <div className="w-full bg-[var(--background-secondary)] rounded-lg shadow-lg overflow-hidden">
            {/* Navegación */}
            <nav className="border-custom p-4 overflow-x-auto">
                <div className="flex gap-6 min-w-max">
                    {TABS.map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-2 pb-2 px-1 font-medium text-sm ${activeTab === id ? "border-b-2 border-[var(--primary)]" : "opacity-50"
                                }`}
                        >
                            <Icon size={16} />
                            {label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Contenido principal */}
            <div className="p-6">
                <AnimatePresence mode="wait">
                    {TabContent[activeTab]()}
                </AnimatePresence>

                {/* Sección de información personal */}
                {activeTab === 'personal' && (
                    <div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="p-3 bg-[var(--secondary)] rounded-lg">
                                <p className="text-xs text-[var(--muted-foreground)]">Documento de Identidad</p>
                                <p className="flex items-center gap-2">
                                    <CreditCard size={16} className="text-[var(--primary)]" />
                                    {usuario.usuario.documentoIdentidad}
                                </p>
                            </div>

                            <div className="p-3 bg-[var(--secondary)] rounded-lg">
                                <p className="text-xs text-[var(--muted-foreground)]">Fecha de Nacimiento</p>
                                <p className="flex items-center gap-2">
                                    <Cake size={16} className="text-[var(--primary)]" />
                                    {formatDate(usuario.usuario.fechaNacimiento)}
                                </p>
                            </div>
                            {/* Botón de editar */}
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(true)}
                                className="bg-[var(--button)] hover:bg-[var(--button-hover)] flex items-center gap-2"
                            >
                                <Pencil size={16} />
                                Editar perfil
                            </Button>
                        </div>
                    </div>

                )}


            </div>

            {/* Modales */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <FormCambioContrasena
                        onClose={() => setIsDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <FormEditarDatos
                        usuario={usuario}
                        countries={countries}
                        onClose={() => setIsEditDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}