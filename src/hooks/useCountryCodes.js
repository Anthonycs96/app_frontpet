import { useEffect, useState } from "react";

export const useCountryCodes = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCountries = () => {
            const data = [
                { name: "Perú", code: "+51" },
                { name: "Argentina", code: "+54" },
                { name: "Chile", code: "+56" },
                { name: "Colombia", code: "+57" },
                { name: "México", code: "+52" },
                { name: "España", code: "+34" },
                { name: "Estados Unidos", code: "+1" },
                { name: "Ecuador", code: "+593" },
                { name: "Brasil", code: "+55" },
                { name: "Bolivia", code: "+591" },
                { name: "Paraguay", code: "+595" },
                { name: "Uruguay", code: "+598" },
                // Agrega más si quieres
            ];

            const sorted = data.sort((a, b) =>
                a.code === "+51" ? -1 :
                    b.code === "+51" ? 1 :
                        a.name.localeCompare(b.name)
            );

            setCountries(sorted);
            setLoading(false);
        };

        loadCountries();
    }, []);

    return { countries, loading };
};
