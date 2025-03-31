import API from '../config';

export const registrarMascota = async (credentials) => {
    try {
        const { data } = await API.post('/api/veterinaria/', credentials);
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
