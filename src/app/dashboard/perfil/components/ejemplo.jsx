"use client";

import { useState } from "react";
import {
  MapPin,
  Mail,
  Smartphone,
  Shield,
  Activity,
  User,
  CreditCard,
  Calendar,
  Bell,
  Clock,
  Edit,
  Cake,
  Pencil,
  Import,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import FormCambioContrasena from "@/app/dashboard/perfil/components/fromResetear-password";

import FormEditarDatos from "@/app/dashboard/perfil/components/fromEditarDatos";
import { useCountryCodes } from "@/hooks/useCountryCodes";

// Extracted reusable components
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
);

const InfoField = ({ icon, label, value, onEdit, placeholder }) => (
  <div className="flex items-center gap-4 p-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--accent)] transition-colors relative group">
    {icon}
    <div className="flex-1">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-[var(--muted-foreground)]">
        {value || placeholder || `Añadir ${label.toLowerCase()}`}
      </p>
    </div>
  </div>
);

// Constants
const TABS = [
  { id: "personal", icon: User, label: "Personal" },
  { id: "security", icon: Shield, label: "Seguridad" },
  { id: "activity", icon: Activity, label: "Actividad" },
];

// Validation schema
const userFormSchema = z.object({
  direccion: z.string().optional(),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  telefono: z.string().optional(),
  documentoIdentidad: z
    .string()
    .min(1, { message: "El documento de identidad es requerido" }),
  fechaNacimiento: z.string().optional(),
});

export default function InformacionPerfil({
  usuario: initialUsuario,
  formatDate,
  smsAlerts,
  handleToggleSmsAlerts,
  calculateAge,
  handleResetPassword,
}) {
  const [activeTab, setActiveTab] = useState("personal");
  const [dialogField, setDialogField] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [usuario, setUsuario] = useState(initialUsuario);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { countries, loading } = useCountryCodes();

  const deviceInfo = useDeviceInfo();

  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      direccion: usuario.usuario.direccion || "",
      email: usuario.usuario.email || "",
      telefono: usuario.usuario.telefono || "",
      documentoIdentidad: usuario.usuario.documentoIdentidad || "",
      fechaNacimiento: usuario.usuario.fechaNacimiento || "",
    },
  });

  // Helper functions
  const getRelativeTime = (date) => {
    if (!date) return "Fecha no disponible";

    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `Hace ${minutes} minutos`;
    if (hours < 24) return `Hace ${hours} horas`;
    return `Hace ${days} días`;
  };

  const handleEditField = (field) => {
    setDialogField(field);

    // Reset form values to current user values
    Object.entries(usuario.usuario).forEach(([key, value]) => {
      if (form.getValues(key) !== undefined) {
        form.setValue(key, value || "");
      }
    });

    setIsDialogOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      // Simulated API request
      console.log("Datos del usuario actualizados:", formData);

      // Update local state
      setUsuario({
        ...usuario,
        usuario: {
          ...usuario.usuario,
          ...formData,
        },
      });

      toast({
        title: "Perfil actualizado",
        description:
          "La información de tu perfil ha sido actualizada correctamente.",
        variant: "success",
      });

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast({
        title: "Error",
        description:
          "No se pudo actualizar la información. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  // Tab content components
  const PersonalTabContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
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
  );

  const SecurityTabContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="bg-[var(--secondary)] p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Contraseña</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Última actualización:{" "}
              {getRelativeTime(usuario.usuario.contraseniaActualizada)}
            </p>
          </div>
          <Button
            className="bg-[var(--button)] hover:bg-[var(--button-hover)]"
            variant="outline"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
          >
            Cambiar
          </Button>
        </div>
      </div>

      {/* <div className="bg-[var(--secondary)] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium">Verificación en dos pasos</h3>
                        <p className="text-sm text-[var(--muted-foreground)]">No activada</p>
                    </div>
                    <Button variant="outline" size="sm">
                        Activar
                    </Button>
                </div>
            </div> */}

      <div className="bg-[var(--secondary)] p-4 rounded-lg">
        <h3 className="font-medium mb-2 text-[var(--foreground)]">
          Dispositivos conectados
        </h3>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs px-2.5 py-1 bg-green-500/10 text-green-500 rounded-full font-medium">
                Activo ahora
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ActivityTabContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[var(--foreground)]">
          Actividad reciente
        </h3>
        <Button
          className="bg-[var(--button-success)] hover:bg-[var(--button-success-hover)]"
          variant="outline"
          size="sm"
        >
          Ver todo
        </Button>
      </div>

      <div className="space-y-2">
        <ActivityItem
          icon={Clock}
          title="Inicio de sesión exitoso"
          description={`${getRelativeTime(new Date())} • ${
            deviceInfo.browserName
          } en ${deviceInfo.deviceType}`}
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalTabContent />;
      case "security":
        return <SecurityTabContent />;
      case "activity":
        return <ActivityTabContent />;
      default:
        return null; // Asegurarse de que no se rendericen tabs no existentes
    }
  };

  const BtnEditar = () => (
    <Button
      className="bg-[var(--button)] hover:bg-[var(--button-hover)] text-white rounded-md transition-all shadow-sm  "
      variant="outline"
      size="sm"
      onClick={() => setIsEditDialogOpen(true)}
    >
      <Pencil size={16} className="mr-2" />
      Editar
    </Button>
  );

  const renderPersonalInfoFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 p-3 bg-[var(--secondary)] rounded-lg">
          <p className="text-xs text-[var(--muted-foreground)]">
            Documento de Identidad
          </p>
          <p className="flex items-center gap-2">
            <CreditCard size={16} className="text-[var(--primary)]" />
            {usuario.usuario.documentoIdentidad}
          </p>
        </div>

        <div className="space-y-1 p-3 bg-[var(--secondary)] rounded-lg">
          <p className="text-xs text-[var(--muted-foreground)]">
            Fecha de Nacimiento
          </p>
          <p className="flex items-center gap-2">
            <Cake size={16} className="text-[var(--primary)]" />
            {formatDate(usuario.usuario.fechaNacimiento)}
          </p>
        </div>

        <div className="space-y-1 p-3 bg-[var(--secondary)] rounded-lg">
          <p className="text-xs text-[var(--muted-foreground)]">Edad</p>
          <p className="flex items-center gap-2">
            <Calendar size={16} className="text-[var(--primary)]" />
            {usuario.usuario.fechaNacimiento && (
              <span>{calculateAge(usuario.usuario.fechaNacimiento)} años</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );

  // Form field renderer for dialog
  const renderFormField = () => {
    const fieldConfigs = {
      direccion: {
        label: "Dirección",
        placeholder: "Ingresa tu dirección",
      },
      email: {
        label: "Correo electrónico",
        placeholder: "Ingresa tu correo",
      },
      telefono: {
        label: "Teléfono",
        placeholder: "Ingresa tu teléfono",
      },
      documentoIdentidad: {
        label: "Documento de identidad",
        placeholder: "Ingresa tu documento",
      },
      fechaNacimiento: {
        label: "Fecha de nacimiento",
        type: "date",
      },
    };

    if (!dialogField || !fieldConfigs[dialogField]) return null;

    const config = fieldConfigs[dialogField];

    return (
      <FormField
        control={form.control}
        name={dialogField}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{config.label}</FormLabel>
            <FormControl>
              <Input
                type={config.type || "text"}
                placeholder={config.placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="w-full bg-[var(--background-secondary)] rounded-lg shadow-lg overflow-hidden">
      {/* Navigation Tabs */}
      <nav className="border-custom p-4 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {TABS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
          relative flex items-center gap-2 pb-2 px-1 font-medium text-sm
          tab-underline ${activeTab === id ? "tab-underline-active" : ""}
        `}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 md:p-6">
        {/* Personal Info Section (only shown in personal tab) */}
        {activeTab === "personal" && renderPersonalInfoFields()}

        {/* Main Content Area */}
        <div className="p-6">
          <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
        </div>
        <div className="flex justify-end mb-2">
          <BtnEditar />
        </div>
      </div>

      {/* Edit Dialog - FIXED: no longer nesting forms */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <FormCambioContrasena />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <FormEditarDatos usuario={usuario} countries={countries} />

          <DialogFooter className="mt-6"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
