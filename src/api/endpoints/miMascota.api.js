import API from '../config';
export const registrarMascota = async (credentials, token) => {
    try {
        const { data } = await API.post('/api/pacientes/cliente', credentials, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return data;
    } catch (error) {
        console.error("💥 Error completo:", error); // 💡 Muestra todo el error (útil para debugging)

        if (error.response) {
            console.error("💥 Error status:", error.response.status);
            console.error("💥 Error headers:", error.response.headers);
            console.error("💥 Error data:", error.response.data); // 💡 Esto es lo que realmente manda tu backend
        } else if (error.request) {
            console.error("💥 No hubo respuesta del backend. Request:", error.request);
        } else {
            console.error("💥 Error al configurar la solicitud:", error.message);
        }

        const errorMessage =
            error.response?.data?.mensaje ||
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Error inesperado";

        throw new Error(errorMessage);
    }

};

export const misMascotas = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token");

        const { data } = await API.get("/api/pacientes/cliente", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error) {
        console.log("💥 Backend error payload:", error.response?.data);
        const errorMessage =
            error.response?.data?.mensaje ||
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Error inesperado";
        throw new Error(errorMessage);
    }
};
