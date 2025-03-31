import API from '../config';

export const login = async (credentials) => {
    try {
        const response = await API.post('/api/auth/loginss', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};


// export const registrarSuperadmin = async (credentials) => {
//     try {
//         const response = await apiClient.post('/register/superadmin', credentials);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };
