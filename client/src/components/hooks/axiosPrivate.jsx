import axios from 'axios';
import matcha from '../../apis/Matcha';
const axiosApiInstance = axios.create();

axiosApiInstance.defaults.baseURL = 'http://localhost:3000/';
axiosApiInstance.defaults.withCredentials = true;
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const session = localStorage.getItem('token');
    const isAuth = localStorage.getItem('auth');
    if (session) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const refresh = sessionStorage.getItem('refreshtoken');
      if (refresh) {
        const response = await matcha.post('/users/refresh', { refresh });
        const result = response.data.jwtToken;
        if (result) {
          localStorage.setItem('token', response.data.jwtToken);
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${result}`,
          };
        }

        return axios(config);
      } else return;
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
