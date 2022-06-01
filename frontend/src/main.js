import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// fontawesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// prime vue imports
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-green/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
// prime vue components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
library.add(fas);
createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use("Card", Card)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("Button", Button)
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
