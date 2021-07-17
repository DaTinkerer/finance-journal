<template>
    <div class="list">

      <ul v-for="entry in entry" :key="entry.id">
        <li>{{entry.date}}</li>
      </ul>

      


    </div>
        
</template>

<script>
// import axiosInstance from '../main.js'
import axios from 'axios'
import store from '../store'
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
          // changes the previous response.data array into a new array with human readable dates.
          this.entry = this.entry.map(x => ({user: x.user,  cost: x.cost, category: x.category, date:
          new Date(x.date).toLocaleString(
            'en-US',
          {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
          }
        ), id: x.id}))
         
          
          
        }) .catch(err => {
          console.log(err)
        })

        
       
        
        
    },
    methods: {
      formatDate () {
       
      }
        
      
    }
}
</script>