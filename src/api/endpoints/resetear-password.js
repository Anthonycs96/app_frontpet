import API from '../config';

export const resetearPassword = async (newPassword, userId) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token");
    try {
        const response = await API.post('/api/auth/resetear-password', {
            nuevaPassword: newPassword, token, userId
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Aquí agregamos el token en el header
                },
            }
        );
        console.log("Respuesta completa de resetearPassword:", response);
        return { status: response.status, data: response.data };

    } catch (error) {
        // Extraer el mensaje de error del backend
        const errorMessage = error.response?.data?.mensaje ||
            error.response?.data?.message ||
            "Error inesperado";
        throw new Error(errorMessage);
    }
};


// Nueva función para verificar la contraseña actual
export const verifyCurrentPassword = async (currentPassword, userId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token");

        // Enviar el token en los encabezados
        const response = await API.post(
            '/api/auth/verificar-password',
            { contrasenaActual: currentPassword, usuarioId: userId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Aquí agregamos el token en el header
                },
            }
        );

        return response.data;  // Se asume que la respuesta tendrá un campo de éxito
    } catch (error) {
        console.log("💥 Backend error payload:", error.response?.data);
        const errorMessage =
            error.response?.data?.mensaje ||
            error.response?.data?.message ||
            "Error al verificar la contraseña actual";
        throw Error(errorMessage);
    }
};
