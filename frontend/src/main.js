import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);
createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
const axiosInstance = axios.create({
  baseURL: "https://api.budgetbook.live",
  headers: { "Content-Type": "application/json" },
});
axiosInstance.interceptors.request.use((config) => {
  let token = store.state.token;
  config.headers["Authorization"] = `Token ${token}`;
  return config;
});

export default axiosInstance;
