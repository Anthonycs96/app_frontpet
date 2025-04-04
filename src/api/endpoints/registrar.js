import API from '../config';

export const registrar = async (credentials) => {
    try {
        const { data } = await API.post('/api/usuarios/cliente/registrar', credentials);
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
