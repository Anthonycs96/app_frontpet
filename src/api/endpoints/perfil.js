import API from '../config';

export const obtenerUsuarioPorId = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token");

        const { data } = await API.get(`/api/usuarios/${id}`, {
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
