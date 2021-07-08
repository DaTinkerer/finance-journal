import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import VueCookies from 'vue-cookies';

createApp(App).use(store).use(router).mount('#app')
// createApp(App).use(VueCookies)

const axiosInstance = axios.create({
    headers: {'Content-Type': 'application/json'}
})
axiosInstance.interceptors.request.use((config) => {
    let token = store.state.token;
    config.headers['Authorization'] = 'Token ' + token;
    return config;
})

export default axiosInstance;