import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    token: localStorage.getItem("token"),
  },
  mutations: {
    getToken(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    deleteToken(state) {
      state.token = null;
    },
  },
  actions: {
    loginUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "https://api.budgetbook.live/auth/login/",
          headers: { "Content-Type": "application/json" },
          data: {
            email: data.email,
            password: data.password,
          },
        })
          .then((response) => {
            commit("getToken", response.data["key"]);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    logoutUser({ commit }) {
      return new Promise((resolve) => {
        axios({
          method: "POST",
          url: "https://api.budgetbook.live/auth/logout/",
          headers: { "Content-Type": "application/json" },
        })
          .then(() => {
            localStorage.removeItem("token");
            commit("deleteToken");
            resolve();
          })
          .catch((err) => {
            localStorage.removeItem("token");
            resolve(err);
          });
      });
    },
  },

  modules: {},
});
