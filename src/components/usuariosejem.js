"use client";

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { useState } from "react";
// import UsuarioForm from "@/components/UsuarioForm";
// import { Loader2 } from "lucide-react";
import { Mail, Phone, MapPin, User, ArrowLeft } from "lucide-react";

export default function UsuariosPage() {
    // Datos de relleno
    const usuarios = [
        {
            id: 1,
            nombre: "Juan Pérez",
            email: "juan@example.com",
            telefono: "555-1234",
            direccion: "Calle 123",
            estado: "activo",
            rol: "Cliente",
        },
        {
            id: 2,
            nombre: "María López",
            email: "maria@example.com",
            telefono: "555-5678",
            direccion: "Avenida 456",
            estado: "activo",
            rol: "Trabajador",
        },
        {
            id: 3,
            nombre: "Carlos García",
            email: "carlos@example.com",
            telefono: "555-9012",
            direccion: "Carrera 789",
            estado: "inactivo",
            rol: "Administrador",
        },
    ];

    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [expandedUsers, setExpandedUsers] = useState([]);

    const handleEdit = (usuario) => {
        setSelectedUsuario(usuario);
        setShowForm(true);
    };

    const toggleExpand = (id) => {
        setExpandedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-4">
            <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--border)]">
                <div className="flex items-center h-14 px-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="mr-2 md:hidden"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl font-semibold">Gestion Usuarios</h1>
                </div>
            </nav>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                {usuarios.map((usuario) => (
                    <Card
                        key={usuario.id}
                        className="w-full max-w-sm rounded-xl bg-[var(--background)] shadow-md hover:shadow-lg transition-shadow relative overflow-hidden border border-[var(--border)]"
                    >
                        {/* HEADER */}
                        <CardHeader className="flex flex-row items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
                                {usuario.nombre.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-[var(--foreground)] leading-tight">
                                    {usuario.nombre}
                                </h3>
                                <span className="text-sm text-muted-foreground">
                                    {usuario.rol}
                                </span>
                            </div>
                        </CardHeader>

                        {/* CONTENIDO OCULTO con transición */}
                        <CardContent
                            className={`transition-all duration-300 p-4 rounded-lg bg-[var(--card)] border border-[var(--border)] shadow-md ${expandedUsers.includes(usuario.id)
                                    ? "block max-h-96 opacity-100 scale-100"
                                    : "hidden max-h-0 opacity-0 scale-95"
                                }`}
                        >
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-green-500" />
                                    <span>{usuario.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-green-500" />
                                    <span>{usuario.telefono}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-green-500" />
                                    <span>{usuario.direccion}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-green-500" />
                                    <Badge
                                        className={`capitalize px-2 py-1 rounded-full ${usuario.estado === "activo"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                            }`}
                                    >
                                        {usuario.estado}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>

                        {/* FOOTER */}
                        <div className="flex flex-col gap-2 p-4 border-t border-[var(--border)]">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(usuario)}
                                className="w-full text-sm rounded-full text-green-700 dark:text-green-300 border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30"
                            >
                                Editar
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                className="w-full text-sm rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                                onClick={() => toggleExpand(usuario.id)}
                            >
                                {expandedUsers.includes(usuario.id) ? "Ocultar" : "Ver más"}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-md">
            <UsuarioForm usuario={selectedUsuario} onSubmit={handleUpdate} />
          </div>
        </div>
      )} */}
        </div>
    );
}
