"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Calendar, Tag, PawPrint } from "lucide-react";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Button from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FormRegistrarMiMascota({ toggleModal, onSubmit }) {
  const [especie, setEspecie] = useState("");
  const [razas, setRazas] = useState([]);
  const [razaSeleccionada, setRazaSeleccionada] = useState("");
  const [esMestizo, setEsMestizo] = useState(false);
  const [tieneAlergias, setTieneAlergias] = useState(false);
  const [genero, setGenero] = useState("");

  const [fotoPerfil, setFotoPerfil] = useState("");
  const [nombre, setNombre] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [alergias, setAlergias] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const especies = [
    { value: "dog", label: "Perro" },
    { value: "cat", label: "Gato" },
  ];

  const obtenerRazas = async (tipo) => {
    const apiUrl =
      tipo === "dog"
        ? "https://api.thedogapi.com/v1/breeds"
        : "https://api.thecatapi.com/v1/breeds";

    const apiKey =
      tipo === "dog"
        ? process.env.NEXT_PUBLIC_DOG_API_KEY
        : process.env.NEXT_PUBLIC_CAT_API_KEY;

    const res = await axios.get(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    setRazas(res.data.map((r) => r.name));
  };

  useEffect(() => {
    if (especie) {
      obtenerRazas(especie);
    }
  }, [especie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) return alert("Nombre es obligatorio.");
    if (!fecha_nacimiento) return alert("Fecha de nacimiento es obligatoria.");
    if (!especie) return alert("Especie es obligatoria.");
    if (!descripcion.trim()) return alert("Descripción es obligatoria.");
    if (!fotoPerfil.trim()) return alert("Foto de perfil es obligatoria.");
    if (tieneAlergias && !alergias.trim())
      return alert("Debes ingresar las alergias.");

    const raza = esMestizo ? "Mestizo/a" : razaSeleccionada;
    if (!raza) return alert("Selecciona una raza o marca como mestizo/a.");

    // Llama a la función onSubmit que viene como prop
    onSubmit({
      nombre,
      fecha_nacimiento,
      especie,
      raza,
      genero,
      fotoPerfil,
      alergias: tieneAlergias ? alergias : "",
      descripcion,
    });
    toggleModal();
  };

  return (
    <div className="text-[var(--foreground)] rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl max-h-screen overflow-y-auto p-4">
      <h2 className="text-xl sm:text-2xl font-bold  text-center mb-4 text-[var(--foreground)]">
        Agregar a tu mascota
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        {/* Imagen */}
        <div className="space-y-2">
          <Label htmlFor="fotoPerfil" className="flex items-center gap-2">
            <Camera size={16} className="text-primary" />
            Foto de perfil (URL)
          </Label>
          <Input
            id="fotoPerfil"
            name="fotoPerfil"
            type="url"
            value={fotoPerfil}
            onChange={(e) => setFotoPerfil(e.target.value)}
          />
        </div>

        {/* Nombre */}
        <div className="grid gap-2">
          <Label htmlFor="nombre" className="flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            Nombre de la Mascota
          </Label>
          <Input
            id="nombre"
            placeholder="Ej. Firulais"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Fecha */}
        <div className="grid gap-2">
          <Label htmlFor="fecha_Nacimiento" className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            Fecha de Nacimiento
          </Label>
          <Input
            id="fecha_Nacimiento"
            type="date"
            value={fecha_nacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        {/* genero */}
        <div className="grid gap-2">
          <Label htmlFor="genero" className="flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            Género
          </Label>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          >
            <option value="">Selecciona género</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>

        {/* Especie */}
        <div className="grid gap-2">
          <Label htmlFor="especie" className="flex items-center gap-2">
            <PawPrint size={16} className="text-primary" />
            Especie
          </Label>
          <select
            id="especie"
            value={especie}
            onChange={(e) => {
              setEspecie(e.target.value);
              setEsMestizo(false);
              setRazaSeleccionada("");
            }}
            className="w-full p-2 border rounded-xl"
          >
            <option value="">Selecciona especie</option>
            {especies.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </div>

        {/* Checkbox mestizo */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="mestizo"
            checked={esMestizo}
            onChange={() => setEsMestizo(!esMestizo)}
          />
          <Label htmlFor="mestizo">¿Es mestizo?</Label>
        </div>

        {/* Raza */}
        {!esMestizo && (
          <div className="grid gap-2">
            <Label htmlFor="raza" className="flex items-center gap-2">
              <PawPrint size={16} className="text-primary" />
              Raza
            </Label>
            <select
              id="raza"
              value={razaSeleccionada}
              onChange={(e) => setRazaSeleccionada(e.target.value)}
              disabled={!razas.length}
              className="p-2 border rounded-xl"
            >
              <option value="">Selecciona raza</option>
              {razas.map((raza, i) => (
                <option key={i} value={raza}>
                  {raza}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Checkbox tiene alergias */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="tieneAlergias"
            checked={tieneAlergias}
            onChange={() => setTieneAlergias(!tieneAlergias)}
          />
          <Label htmlFor="tieneAlergias">¿Tiene alergias?</Label>
        </div>

        {/* Campo alergias */}
        {tieneAlergias && (
          <div className="grid gap-2">
            <Label htmlFor="alergias" className="flex items-center gap-2">
              <PawPrint size={16} className="text-primary" />
              Alergias
            </Label>
            <Input
              id="alergias"
              placeholder="Ej. Alergico a la arena"
              value={alergias}
              onChange={(e) => setAlergias(e.target.value)}
            />
          </div>
        )}

        {/* Descripción */}
        <div className="grid gap-2">
          <Label htmlFor="descripcion" className="flex items-center gap-2">
            Descripción
          </Label>
          <Textarea
            id="descripcion"
            placeholder="Color, características especiales, etc."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Botones */}
        <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
          <Button
            type="button"
            onClick={toggleModal}
            className="bg-[var(--button-danger)] hover:bg-[var(--button-danger-hover)] text-white"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-[var(--button)] hover:bg-[var(--button-hover)] text-white"
            disabled={!nombre || !fecha_nacimiento || !especie || !descripcion}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
