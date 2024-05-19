import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store'; // Импортируйте хранилище из папки store
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

axios.defaults.baseURL = 'http://localhost:9090';
const app = createApp(App);
app.use(router);
app.use(store); // Добавьте хранилище в приложение

app.mount('#app');

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
