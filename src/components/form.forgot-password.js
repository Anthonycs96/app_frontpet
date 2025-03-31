import { useState, useEffect } from 'react';
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function FormForgotPassword({ onSubmit }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState("+51"); // Perú por defecto
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
                        if (a.code === "+51") return -1;
                        if (b.code === "+51") return 1;
                        return a.name.localeCompare(b.name);
                    });

                setCountries(countryList);

                // Garantiza que "+51" esté seleccionado luego de cargar los países
                if (countryList.some(c => c.code === "+51")) {
                    setCountryCode("+51");
                } else if (countryList.length > 0) {
                    setCountryCode(countryList[0].code);
                }

            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setTimeout(() => setIsLoading(false), 500);
            }
        };

        fetchCountries();
    }, []);

    const validarTelefono = (numero) => {
        const telefonoRegex = /^[9][0-9]{8}$/;
        return telefonoRegex.test(numero);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!validarTelefono(phoneNumber)) {
        //     alert("Teléfono inválido. Debe empezar con 9 y tener 9 dígitos.");
        //     return;
        // }

        onSubmit({ countryCode, phoneNumber });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="relative">
                <Input
                    id="countryCode"
                    name="countryCode"
                    type="text"
                    value={countryCode}
                    readOnly
                    tabIndex={-1}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm sm:text-base select-none cursor-not-allowed pointer-events-none w-fit px-1 "
                />
                <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPhoneNumber(value);
                    }}
                    type="text"
                    required
                    className="w-full pl-[4.5rem] pr-3 py-2.5 rounded-xl border border-[var(--border)] text-[var(--primary-foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors"
                    placeholder="987654321"
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-primary text-[var(--primary-foreground)] py-3 px-4 rounded-lg  transition-colors font-medium"
            >
                Enviar enlace de recuperación
            </Button>
        </form>
    );
}
