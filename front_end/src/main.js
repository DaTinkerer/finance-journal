import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
const axiosInstance = axios.create({
  headers: {'Content-Type': 'application/json'}
})
axiosInstance.interceptors.request.use((config) => {
  let token = store.state.token;
  config.headers['Authorization'] = `Token ${token}`;
  return config;
})

export default axiosInstance;
