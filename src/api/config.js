// Importamos axios para hacer peticiones HTTP
import axios from 'axios';

// Creamos una instancia de Axios con configuración base
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base para todas las peticiones (de .env)
    headers: {
        'Content-Type': 'application/json', // Indicamos que los datos se enviarán en formato JSON
    },
});


// Antes de enviar cada petición, se ejecuta este interceptor
API.interceptors.request.use((config) => {
    // Buscamos el token de autenticación guardado en localStorage
    const token = localStorage.getItem('authToken');

    // Si existe, lo añadimos a los headers como "Authorization: Bearer {token}"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Retornamos la configuración modificada
    return config;
});


API.interceptors.response.use(
    (response) => response, // Si la respuesta es exitosa, simplemente la retornamos
    (error) => {
        // Si ocurre un error y es un 401 (no autorizado)
        if (error.response && error.response.status === 401) {

            // 🧹 Limpiamos el token del localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user'); // Si guardas más cosas, como el usuario
            // Redirige al usuario al inicio (por ejemplo, login)
            window.location.href = '/';
        }

        // Rechazamos el error para que pueda manejarse en el componente que hizo la petición
        return Promise.reject(error);
    }
);

export default API;