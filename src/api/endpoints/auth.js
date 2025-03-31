import API from '../config';

export const login = async (credentials) => {
    try {
        const response = await API.post('/api/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.log("💥 Backend error payload:", error.response?.data);
        const errorMessage =
            error.response?.data?.mensaje ||
            error.response?.data?.message ||
            "Error inesperado";
        throw Error(errorMessage);
    }
};

export const logout = async () => {
    try {
        const response = await API.post('/api/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};
