"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  User,
  MapPin,
  Smartphone,
  Mail,
  Lock,
  Camera,
  Calendar,
  CreditCard,
  ChevronLeft,
  Check,
  X,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function FormRegistrarUsuarioEscritorio({ onSubmit }) {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [countryCode, setCountryCode] = useState("+51");
  const preguntas = [
    "¿Cuál es el nombre de tu primera mascota?",
    "¿Cuál fue tu escuela primaria?",
    "¿Cuál es el nombre de tu ciudad natal?",
    "¿Cuál es tu comida favorita?",
  ];

  const [selectedQuestion, setSelectedQuestion] = useState(preguntas[0]);
  const [respuestaSecreta, setRespuestaSecreta] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    paisCode: "",
    direccion: "",
    documentoIdentidad: "",
    password: "",
    fotoPerfil: "",
    fechaNacimiento: "",
  });

  const passwordCriteria = useMemo(() => {
    return {
      length: { met: password.length >= 8, text: "Al menos 8 caracteres" },
      uppercase: {
        met: /[A-Z]/.test(password),
        text: "Al menos una mayúscula",
      },
      number: { met: /\d/.test(password), text: "Al menos un número" },
      special: {
        met: /[!@#$%^&*]/.test(password),
        text: "Al menos un carácter especial",
      },
    };
  }, [password]);

  const passwordStrength = useMemo(() => {
    const metCriteria = Object.values(passwordCriteria).filter(
      (c) => c.met
    ).length;
    return {
      score: metCriteria,
      percentage: metCriteria * 25,
      text:
        ["Débil", "Regular", "Buena", "Fuerte", "Excelente"][metCriteria] ||
        "Débil",
      color:
        [
          "bg-red-500",
          "bg-orange-500",
          "bg-yellow-500",
          "bg-green-500",
          "bg-green-600",
        ][metCriteria] || "bg-red-500",
    };
  }, [passwordCriteria]);

  const navegar = () => {
    router.push("/recuperar-password");
  };

  const navegarregistrar = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data
          .map((country) => ({
            name: country.name.common,
            code:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ""),
          }))
          .filter((country) => country.code)
          .sort((a, b) => {
            if (a.code === "+51") return -1; // Peru first
            if (b.code === "+51") return 1;
            return a.name.localeCompare(b.name);
          });

        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, password }));
  }, [password]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, telefono: phoneNumber }));
  }, [phoneNumber]);

  const validarTelefono = (numero) => /^[9][0-9]{8}$/.test(numero);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarTelefono(phoneNumber)) {
      alert("Teléfono inválido. Debe empezar con 9 y tener 9 dígitos.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorPassword("Las contraseñas no coinciden.");
      return;
    }

    if (passwordStrength.score < 3) {
      setErrorPassword("La contraseña es demasiado débil.");
      return;
    }

    setErrorPassword("");

    onSubmit({
      nombre,
      email,
      telefono: phoneNumber,
      paisCode: countryCode,
      direccion,
      documentoIdentidad,
      fechaNacimiento,
      preguntaSecreta: selectedQuestion,
      respuestaSecreta,
      password,
    });
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className=" mx-autorounded-2xl shadow-md p-0 sm:p-0 space-y-4"
    >
      <Card className="background[var(--background)] shadow-none">
        <CardHeader className="px-2 pb-2">
          <h2 className="text-2xl font-semibold text-primary">
            Información Personal
          </h2>
          <p className="text-sm text-muted-foreground">
            Ingresa tus datos personales para crear tu cuenta
          </p>
        </CardHeader>
        <CardContent className="p-2 pt-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="flex items-center gap-2">
                <User size={16} className="text-primary" />
                Nombre completo
              </Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full pl-4 pr-3 py-2.5 rounded-xl border background[var(--border)]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion" className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Dirección
              </Label>
              <Input
                id="direccion"
                name="direccion"
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
                className="w-full pl-4 pr-3 py-2.5 rounded-xl border background[var(--border)]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryCode" className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                País
              </Label>
              <div className="relative">
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 background2 backgroundprimary backgroundt-transparent rounded-full"></div>
                  </div>
                )}
                <select
                  id="countryCode"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border background[var(--border)] bg-background text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary focus:backgroundtransparent"
                >
                  {isLoading ? (
                    <option>Cargando países...</option>
                  ) : (
                    countries.map((country) => (
                      <option
                        key={`${country.code}-${country.name}`}
                        value={country.code}
                      >
                        {country.name} ({country.code})
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                <Smartphone size={16} className="text-primary" />
                Teléfono
              </Label>
              <div className="flex gap-2">
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, ""))
                  }
                  type="text"
                  required
                  className="w-full pl-4 pr-3 py-2.5 rounded-xl border"
                  placeholder="987654321"
                />
              </div>
              {phoneNumber && !validarTelefono(phoneNumber) && (
                <p className="text-xs text-red-500 mt-1">
                  Debe empezar con 9 y tener 9 dígitos
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="h-[1px] w-full bg-[var(--border)] my-6"></div>

      <Card className="backgroundnone shadow-none">
        <CardHeader className="px-2 pb-2">
          <h2 className="text-2xl font-semibold text-primary">
            Datos de Identificación
          </h2>
          <p className="text-sm text-muted-foreground">
            Información para verificar tu identidad
          </p>
        </CardHeader>
        <CardContent className="p-2 pt-4">
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label
                htmlFor="documentoIdentidad"
                className="flex items-center gap-2"
              >
                <CreditCard size={16} className="text-primary" />
                Documento de identidad
              </Label>
              <Input
                id="documentoIdentidad"
                name="documentoIdentidad"
                type="number"
                value={documentoIdentidad}
                onChange={(e) => setDocumentoIdentidad(e.target.value)}
                required
                className="w-full pl-4 pr-3 py-2.5 rounded-xl border background[var(--border)]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="fechaNacimiento"
                className="flex items-center gap-2"
              >
                <Calendar
                  size={16}
                  className="text-[var(--icon-secondary-bg)]"
                />
                Fecha de nacimiento
              </Label>
              <Input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
                className="
    w-full pl-4 pr-3 py-2.5 rounded-xl border border-[var(--border)]
    text-[var(--icon-secondary-bg)]
    [&::-webkit-calendar-picker-indicator]:cursor-pointer
    [&::-webkit-calendar-picker-indicator]:invert-0
    dark:[&::-webkit-calendar-picker-indicator]:invert
  "
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-4 pr-3 py-2.5 rounded-xl border background[var(--border)]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="h-[1px] w-full bg-[var(--border)] my-6"></div>

      <Card className="backgroundnone shadow-none">
        <CardHeader className="px-2 pb-2">
          <h2 className="text-2xl font-semibold text-primary">Seguridad</h2>
          <p className="text-sm text-muted-foreground">
            Configura tu contraseña y pregunta de seguridad
          </p>
        </CardHeader>
        <CardContent className="p-2 pt-4">
          <div className="grid sm:grid-cols-1 gap-5 mb-6">
            <div className="space-y-2">
              <Label
                htmlFor="respuestaSecreta"
                className="flex items-center gap-2 font-medium"
              >
                Pregunta secreta:
              </Label>
              <select
                id="preguntaSecreta"
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] text-[var(--foreground)] focus:ring-primary transition"
                required
              >
                {preguntas.map((q, i) => (
                  <option key={i} value={q}>
                    {q}
                  </option>
                ))}
              </select>
              <Input
                id="respuestaSecreta"
                type="text"
                value={respuestaSecreta}
                onChange={(e) => setRespuestaSecreta(e.target.value)}
                required
                placeholder="Ingresa la respuesta"
                className="w-full pl-4 pr-3 py-2.5 rounded-xl border background[var(--border)]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock size={16} className="text-primary" />
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Ingresa tu contraseña"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border background[var(--border)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Fortaleza: {passwordStrength.text}</span>
                    <span>{passwordStrength.score}/4</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full transition-all ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.percentage}%` }}
                    />
                  </div>
                  <ul className="space-y-1 text-xs mt-2">
                    {Object.values(passwordCriteria).map((criteria, index) => (
                      <li key={index} className="flex items-center gap-1.5">
                        {criteria.met ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-red-500" />
                        )}
                        <span
                          className={
                            criteria.met ? "text-green-700" : "text-red-700"
                          }
                        >
                          {criteria.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="flex items-center gap-2"
              >
                <Lock size={16} className="text-primary" />
                Confirmar contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repite contraseña"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border background[var(--border)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  Las contraseñas no coinciden
                </p>
              )}
              {errorPassword && (
                <p className="mt-1 text-sm text-red-500">{errorPassword}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <CardFooter className="flex flex-col space-y-4 px-2 pt-4">
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-[var(--button-hover)] text-base font-medium transition-colors"
        >
          Registrarse
        </Button>

        <button
          type="button"
          onClick={navegarregistrar}
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
        >
          <ChevronLeft size={16} />
          Volver al login
        </button>
      </CardFooter>
    </form>
  );
}
