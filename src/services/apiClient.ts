// services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)  // 이건 외부에서 핸들링해오는 부분입니다.
);

export default apiClient;
