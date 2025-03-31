import { useState, useEffect } from 'react';
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';

export default function FormChangePassword({ onSubmit }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [respuestaSecreta, setRespuestaSecreta] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [password, setPassword] = useState('');
    const [countryCode, setCountryCode] = useState("+51");
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
                const countryList = data
                    .map((country) => ({
                        name: country.name.common,
                        code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
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
                // Solo ocultamos el spinner después de 500ms para evitar parpadeos
                setTimeout(() => setIsLoading(false), 500);
            }
        };

        fetchCountries();
    }, []);


    const validarTelefono = numero => /^[9][0-9]{8}$/.test(numero);

    const handleSubmit = e => {
        e.preventDefault();

        if (!validarTelefono(phoneNumber)) {
            alert("Teléfono inválido. Debe empezar con 9 y tener 9 dígitos.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorPassword("Las contraseñas no coinciden.");
            return;
        }

        setErrorPassword("");
        onSubmit({ countryCode, phoneNumber, respuestaSecreta, password });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-xl mx-auto p-0 sm:p-6 md:p-8 bg-[var(--background)] rounded-xl shadow-md"
        >
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="countryCode">País</Label>
                    <select
                        id="countryCode"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)]"
                    >
                        {isLoading ? (
                            <option>Cargando países...</option>
                        ) : (
                            countries.map(country => (
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

                <div className="relative">
                    <Label htmlFor="phoneNumber">Teléfono</Label>
                    <Input
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        type="text"
                        required
                        className="w-full pl-4 pr-3 py-2.5 rounded-xl border border-[var(--border)]"
                        placeholder="987654321"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="respuestaSecreta" className="font-medium text-[var(--foreground)]">
                    Pregunta secreta:
                </Label>
                <p className="text-sm text-[var(--primary)]  bg-opacity-10 px-2 py-1 rounded-lg inline-block my-2">
                    ¿Cuál es el nombre de tu primera mascota?
                </p>
                <Input
                    id="respuestaSecreta"
                    type="text"
                    value={respuestaSecreta}
                    onChange={(e) => setRespuestaSecreta(e.target.value)}
                    required
                    placeholder="Ingresa la respuesta"
                    className="w-full p-2.5 rounded-xl border border-[var(--border)]"
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-[var(--border)] pr-10"
                        placeholder="Ingresa tu contraseña"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[70%] right-0 transform -translate-y-1/2 flex items-center justify-center w-10 px-3 text-[var(--muted-foreground)] hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>


                </div>


                <div className="relative">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Repite contraseña"
                        className="w-full p-2.5 rounded-xl border border-[var(--border)] pr-10"
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute top-[70%] right-0 transform -translate-y-1/2 flex items-center justify-center w-10 px-3 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                    {errorPassword && <p className="mt-1 text-sm text-red-500">{errorPassword}</p>}
                </div>

            </div>

            <Button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
            >
                Enviar enlace de recuperación
            </Button>
        </form>
    );
}
