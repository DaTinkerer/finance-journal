import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
  },
  mutations: {
    getToken(state, token) {
      state.token = token
      console.log(state.token)
      
    }
  },
  actions: {
    loginUser({ commit }, data){
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
      })
    }
  },
  modules: {
  }
})
