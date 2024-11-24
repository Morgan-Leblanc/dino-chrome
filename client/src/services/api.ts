import axios, { AxiosError } from 'axios';


const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const apiError = {
      message: error.response?.data || error.message,
      status: error.response?.status || 500,
      details: error.response?.data
    };

    console.error('API Error:', apiError);
    return Promise.reject(apiError);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;