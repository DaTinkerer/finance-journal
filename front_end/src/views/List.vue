<template>
    <div class="list">
    </div>
        
</template>

<script>
// import axiosInstance from '../main.js'
import axios from 'axios'
import store from '../store'
import moment from 'moment';
export default {
    name:'List',
    data () {
        return {
          
        
  
       
        entry: []
        }
    },
    created() {
        
        axios.interceptors.request.use((config) => {
        let token = store.state.token;
        config.headers['Authorization'] = `Token ${token}`;
        return config;
      })

        axios({
          url: 'http://localhost:8000/journal/',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        }) .then(response => {
          this.entry = response.data
          
        }) .catch(err => {
          console.log(err)
        })

        const m = moment(this.entry['date'])

        console.log(m.format('MMM Do YYYY'))

        
        
    }
}
</script>
