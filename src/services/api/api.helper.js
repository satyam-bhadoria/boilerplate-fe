import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:5000';
// const BASE_URL = process.env.REACT_APP_API_URL;

const serviceApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const addRequestInterceptor = (axiosInstace) => {
  return axiosInstace.interceptors.request.use(function (config) {
    if (!config.data) {
      delete config.headers['Content-Type'];
    }
    return config;
  }, function (error) {
    toast.error(error.message);
    return Promise.reject(error);
  });
}

const addResponseInterceptor = (axiosInstace, navigate) => {
  return axiosInstace.interceptors.response.use(function (response) {
    return {
      ...response.data,
      statusCode: response.status,
    };
  }, function (error) {
    if (error.response?.status) {
      if (error.response.status === 401) {
        navigate?.('/login');
      }
      return {
        ...error.response.data,
        statusCode: error.response.status,
      }
    }
    toast.error(error.message);
    return Promise.reject({
      status: 'error',
      statusCode: 504,
      code: error.code,
      message: error.message,
    });
  });
}


export { serviceApi, addRequestInterceptor, addResponseInterceptor };