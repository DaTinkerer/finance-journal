import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
  },
  mutations: {
    getToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
      
      
    }
  },
  actions: {
    loginUser({ commit }, data){
      return new Promise ((resolve, reject) => {

      
      axios({
        method: 'POST',
        url: 'http://localhost:8000/auth/login/',
        headers: {'Content-Type': 'application/json'},
        data: {
          'email': data.email,
          'password': data.password,
        }
      }).then(response =>{
        commit('getToken', response.data['key'])
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
    }
  },
  modules: {
  }
})
