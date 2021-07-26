<template>
    <div class="list">

      <div class="navbar-container">
        <h2 class="title">Expenses</h2>
        
          <p class="account-btn">Account</p>
        
      </div>
       <!-- Every time I click this I want to show the form with category set to the default category defined in django models -->
      <div @click="$data.entry = {cost: '', category:'Uncategorized'}; showCreateModal=true" class="add-expense-btn-container">
        <p>Add Expense</p>
      </div>

      <div class="data-section">

        <!-- table section that displays entries -->
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
      
      <!-- overlay that goes underneath edit and create form modals -->
      <transition name="fade" appear>
        <!-- Every time I exit the create modal I want to clear the form and set category to the default category defined in django models -->
        <div class="modal-overlay" @click="$data.entry = {cost: '', category:'Uncategorized'}; showEditModal=false; showCreateModal=false" 
         v-if="showEditModal || showCreateModal"></div>
      </transition>
      
      <!-- edit modal with form to edit an entry -->
      <transition>
        <div class="edit-modal" v-if="showEditModal">
        <div class="exit-btn" @click="showEditModal=false">&#10799;</div>
        <label for="category">Change Category:</label>

            <select form="edit-form" name="category" id="category" v-model="entry.category">
              <option value="Groceries">Groceries</option>
              <option value="Uncategorized">Uncategorized</option>
              
            </select>
          <form @submit.prevent="edit(); showEditModal=false" class="edit-form" id="edit-form">
            <label for="cost">Change Amount:</label>
            <input name="cost" type="number" step="0.01" min="0" v-model="entry.cost">

          </form>
          
          <div class="bottom-modal-container">
            <p class="modal-bot-btns" id="delete"  @click="del(); showEditModal=false">Delete</p>
            <p class="modal-bot-btns" id="update"  @click="edit(); showEditModal=false">Update</p>
          </div>

            


        </div>
      </transition>

        <!-- A form to create a new entry -->
        <transition>
        <div class="create-modal" v-if="showCreateModal">
        <div class="exit-btn" @click="$data.entry = {cost: '', category:'Uncategorized'}; showCreateModal=false">&#10799;</div>
        <label for="category">Add Category:</label>

            <select form="create-form" name="category" id="category" v-model="entry.category">
              <option value="Groceries">Groceries</option>
              <option value="Uncategorized">Uncategorized</option>
              
            </select>
          <form @submit.prevent="createEntry(); showCreateModal=false" class="create-form" id="create-form">
            <label for="cost">Add Amount:</label>
            <input name="cost" type="number" step="0.01" min="0" v-model="entry.cost">

          </form>
          
          <div class="bottom-modal-container">
            
            <p class="modal-bot-btns" id="create"  @click="createEntry(); showCreateModal=false">Create</p>
          </div>

            


        </div>
      </transition>


  </div>
        
</template>

<script>
import axiosInstance from '../main.js'
// import axios from 'axios'
export default {
    name:'List',
    data () {
        return {
          entries: [],
          entry: {},

          
         
          showEditModal: false,
          showCreateModal: false
        
  
       
        
        
        }
    },
  async created() {
     
     await this.getEntries()
      

    },
  methods: {
    async createEntry () {
      const data = new FormData()

      data.append('cost', this.entry.cost)
      data.append('category', this.entry.category)
      

      axiosInstance.post('/journal/create/', data)
      .then(() => {
        this.getEntries()
      }).catch(err => {
        console.log(err)
      })

    },

      
    async edit () {
       
      const data = new FormData()

      data.append('cost', this.entry.cost)
      data.append('category', this.entry.category)

       
        
        axiosInstance.patch(
          `/journal/update/${this.entry.id}/`,
          data
        ).then(() => {
          this.getEntries()
        }).catch(err => {
          console.log(err)
        })
        

    },

    async del () {
        axiosInstance.post(`/journal/delete/${this.entry.id}/`)
        .then(() => {
          this.getEntries()
        }).catch(err => {
          console.log(err)
        })
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
$primary-hover: #5F8D53;
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
        background: $primary-hover;
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
        background: $primary-hover;
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

    .modal-overlay {

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.3);

      }

      .edit-modal, .create-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        width: 100%;
        max-width: 400px;
        background: #fff;
        padding: 4rem 4rem;
        padding-top: 1em;
        padding-bottom: 1rem;
        ;
        border-radius: .5em;
        
        
        label {
          margin-right: 1rem;
        }
        input {
          
          padding: .8rem;
          border-radius: .4em;
          border-color: #D3D3D3;

          
        }

        .exit-btn {
          padding-bottom: 1.5em;
          margin-left: 27em;
          &:hover {
            cursor: pointer;
          
          }
        }

        select {
          margin-bottom: 2em;
          padding: 1em;
          padding-right: 3.3em;
          border-radius: .4em;
          border-color: #D3D3D3;
          &:hover {
            cursor: pointer;
          }
        }

        .bottom-modal-container {
          display: flex;
          margin-top: 2em;
          margin-left: 16em;

          
        }

        .modal-bot-btns {
          padding: .8em;
          
        }
        

        #delete {
          margin-right: 2em;
          background: #e60000;
          color: #fff;
          border-radius: .4em;
          
           &:hover {
            background: #b30000;
            cursor: pointer;
            transition-duration: .2s;
          }
        }
        #update, #create {
          background: $btn-color;
          border-radius: .4em;
          &:hover {
            color: #fff;
            background: $primary-hover;
            cursor: pointer;
            transition-duration: .2s;
          }

        }

        #create {
          margin-left: 6.8em;
        }

        
      }

</style>

