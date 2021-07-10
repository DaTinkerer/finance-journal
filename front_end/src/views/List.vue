<template>
    <div class="list">
        <v-container>

            <v-data-table
              :headers="headers"
              :items="entry"
              
            ></v-data-table>
        </v-container>
  
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
          
        headers: [
          {
            text: 'Date',
            align: 'start',
            filterable: false,
            value: 'timestamp',
          },
          { text: 'Category', value: 'category' },
          { text: 'Amount', value: 'cost' },
         
        ],
  
       
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
        
   
    }
}
</script>
