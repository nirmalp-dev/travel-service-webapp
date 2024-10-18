import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor risky code / check only if confident
// axiosClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         if (error.response.status === 401) {
//             // Handle 401 error - e.g., redirect to login page
//             localStorage.removeItem('token');
//             // You might want to redirect to the login page here
//             // window.location = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosClient;