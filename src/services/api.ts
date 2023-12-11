import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.defaults.headers.post = {
  crossOriginIsolated: false,
};

instance.defaults.headers.get = {
  crossOriginIsolated: false,
};

export default instance;
