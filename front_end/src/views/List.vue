<template>
    <div class="list">

      <div class="navbar-container">
        <h2 class="title">Expenses</h2>
        
          <p class="account-btn">Account</p>
        
      </div>

      <div class="add-expense-btn-container">
        <p>Add Expense</p>
      </div>

      <div class="data-section">

        
        <div class="data-column">
          <p class="column-title">Date</p>
          <ul v-for="entry in entry" :key="entry.id">
            <li>{{entry.date}}</li>
          </ul>
        </div>

        
         <div class="data-column">
           <p class="column-title">Category</p>
          <ul v-for="entry in entry" :key="entry.id">
            <li class="li-cat" @click="editCat">{{entry.category}}</li>
          </ul>
        </div>

        
         <div class="data-column">
           <p class="column-title">Amount</p>
          <ul v-for="entry in entry" :key="entry.id">
            <li class="li-cost" @click="editCost">{{entry.cost}}</li>
          </ul>
        </div>

      </div>

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
          // changes response.data array objects into a new array with human readable dates.
          this.entry = response.data.map(x => ({user: x.user,  cost: x.cost, category: x.category, date:
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
      editCat () {
       
      },

      editCost () {

       
        
        
        
        
        

        

        



      }
        
      
    }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@100;400&family=Inter:wght@100;200;400&display=swap');
$nav-background: #F3FEF4;
$btn-color: #AFE7A1;
  body {
    margin: 0;
    height: 100vh;
    font-family: 'Inter';
    
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .navbar-container {
    background: $nav-background;
    display: flex;
    justify-content: space-between;
    padding: 1em;

    .account-btn {
      margin-right: 6em;
      font-weight: 200;
      padding: .2em 2em .2em 2em;
      margin-bottom: 1.5em;
      border-radius: .4em;
      background: $btn-color;
      &:hover {
        background: #5F8D53;
        color: white;
        transition-duration: .2s;
        cursor: pointer;
      }
    }
    .title {
      margin-left: 4em;
      font-weight: 400;
    }
  }

  .add-expense-btn-container {
    font-weight: 200;
    padding: .2em 2em .2em 2em;
    background: $btn-color;
    width: 7em;
    margin-top: 3em;
    margin-left: 7em;
    padding-left: 2em;
    padding-right: 1em;
    
     border-radius: .4em;
      background: $btn-color;
      &:hover {
        background: #5F8D53;
        color: white;
        transition-duration: .2s;
        
        cursor: pointer;
      }
    }

    .data-section {
      display: flex;
      justify-content: space-between;

      margin-top: 5em;
      margin-left: 6.9em;
      margin-right: 7.5em;

      .column-title {
        margin-bottom: 3em;
        font-weight: 400;
      }

      li {
        margin-bottom: 2em;
        font-weight: 200;
        
      }
      
    }
  
  
</style>

