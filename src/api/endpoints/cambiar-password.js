import API from '../config';

export const cambiarPassword = async (credentials) => {
    try {
        const response = await API.post('/api/auth/cambiar-password', credentials);
        return response.data;
    } catch (error) {
        // Extraer el mensaje de error del backend
        const errorMessage = error.response?.data?.mensaje ||
            error.response?.data?.message ||
            "Error inesperado";
        throw new Error(errorMessage);
    }
};
