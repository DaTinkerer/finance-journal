import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


createApp(App).use(store).use(router).mount('#app')

const axiosInstance = axios.create({
  baseURL: 'http://198.211.106.130',
    headers: {'Content-Type': 'application/json'}
  })
  axiosInstance.interceptors.request.use((config) => {
    let token = store.state.token;
    config.headers['Authorization'] = `Token ${token}`;
    return config;
  })
  
  export default axiosInstance;