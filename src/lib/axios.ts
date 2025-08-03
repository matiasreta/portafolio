import axios from 'axios';

// Configuración base de axios con timeouts
const apiClient = axios.create({
  baseURL: 'https://portafolio-backend-c246.onrender.com',
  timeout: 30000, // 30 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    console.log('Enviando request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Error en request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response) => {
    console.log('Respuesta recibida:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout: La solicitud tardó demasiado tiempo');
      return Promise.reject(new Error('La solicitud tardó demasiado tiempo. Por favor, intenta de nuevo.'));
    }
    
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error del servidor:', error.response.status, error.response.data);
      return Promise.reject(new Error(`Error del servidor: ${error.response.status}`));
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('Sin respuesta del servidor');
      return Promise.reject(new Error('No se pudo conectar con el servidor. Verifica tu conexión.'));
    } else {
      // Algo más causó el error
      console.error('Error:', error.message);
      return Promise.reject(new Error('Error inesperado. Por favor, intenta de nuevo.'));
    }
  }
);

export default apiClient; 