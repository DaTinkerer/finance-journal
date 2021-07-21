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

        
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="column-title">Date</th>
              <th scope="col" class="column-title">Category</th>
              <th scope="col" class="column-title">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr class="table-data" v-for="entry in entries" :key="entry.id" @click="$data.entry = entry; showEditModal=true;">
              <td>{{entry.date}}</td>
              <td >{{entry.category}}</td>
              <td>{{entry.cost}}</td>
            </tr>
          </tbody>

          
        </table>

      </div>
      
      <transition name="fade" appear>
        <div class="edit-modal-overlay" v-if="showEditModal"></div>
      </transition>

      <transition>
        <div class="edit-modal" v-if="showEditModal">
        <div class="exit-btn" @click="showEditModal=false">&#10799;</div>
          <form @submit.prevent="edit(); showEditModal=false" class="edit-form">
            <label for="cost">Change Amount:</label>
            <input name="cost" type="number" v-model="entry.cost">
          </form>


        </div>
      </transition>

  </div>
        
</template>

<script>
import axiosInstance from '../main.js'
export default {
    name:'List',
    data () {
        return {
          entries: [],
          entry: {},
         
          showEditModal: false
        
  
       
        
        
        }
    },
  async created() {
     
     await this.getEntries()
      

    },
    methods: {
      edit () {
        axiosInstance.patch(
          `/journal/update/${this.entry.id}/`,
          {data: {cost: JSON.stringify(this.entry.cost)}}
          
          
        ) .then(this.getEntries())

    },

    async getEntries () {
        
        axiosInstance.get(
         '/journal/',
        
        ) .then(response => {
          // changes response.data array objects into a new array with human readable dates.
          this.entries = response.data.map(x => ({
            user: x.user,  
            cost: x.cost, 
            category: x.category, 
            date:
            new Date(x.date).toLocaleString(
              'en-US',
            {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
            }
          ),
          id: x.id}))
        
        }) .catch(err => {
          console.log(err)
        })
    } 
        
      
    }
}
</script>

<style lang="scss">
$nav-background: #F3FEF4;
$btn-color: #AFE7A1;
  body {
    margin: 0;
    height: 100vh;
    font-family: 'Inter';
    
  }
  // top navbar style 
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
    // data section
    .data-section {
      margin-top: 5em;
      margin-left: 6.9em;
      margin-right: 7.5em;
      .column-title {
        margin-bottom: 3em;
        font-weight: 400;
      }
      table {
        width: 100%;
        
        border-collapse: collapse;
      }
      tbody td {
        text-align: left;
      }
      thead th {
        text-align: left;
      }
      thead th:nth-child(1) {
        width: 30%;
      }
      thead th:nth-child(2) {
        width: 30%;
      }
      thead th:nth-child(3) {
        width: 5%;
      }
      th, td {
        padding: 10px;
      }
      .table-data {
        cursor: pointer;
        &:hover {
          background: $nav-background;
        }
        
        
      }
      
      td {
        
        font-weight: 200;
        
      }
    
    }

    .edit-modal-overlay {

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.3);

      }

      .edit-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        width: 100%;
        max-width: 400px;
        background: #fff;
        padding: 4rem;
        padding-top: 1rem;
        border-radius: .5rem;
        
        
        label {
          margin-right: 1rem;
        }
        input {
          
          padding: .8rem;
          border-radius: .4em;
          border-color: #D3D3D3;

          
        }

        .exit-btn {
          padding-bottom: 1.5rem;
          margin-left: 27rem;
          &:hover {
            cursor: pointer;
          
          }
        }
      }

</style>

