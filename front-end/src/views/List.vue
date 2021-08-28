<template>
  <div class="list">
    <div class="container">
      <div class="navbar-container">
        <h2 class="title">Expenses</h2>
        <div class="dropdown-div">
          <p class="account-btn">Account</p>
          <div class="burger-menu">
            <img src="../assets/burger.svg" alt="" />
          </div>
          <div class="dropdown-content">
            <p @click="goToChangePass">Change Password</p>
            <p @click="logout">Log out</p>
          </div>
        </div>
      </div>
      <!-- Every time I click this I want to show the form with category set to the default category defined in django models -->
      <div
        @click="
          $data.entry = { cost: '', category: 'Uncategorized' };
          showCreateModal = true;
        "
        class="add-expense-btn-container"
      >
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
            <tr
              class="table-data"
              v-for="entry in entries"
              :key="entry.id"
              @click="
                $data.entry = entry;
                showEditModal = true;
              "
            >
              <td>{{ entry.date }}</td>
              <td>{{ entry.category }}</td>
              <td>{{ entry.cost }}</td>
            </tr>
          </tbody>
        </table>

        <p v-if="entries == ''">No expenses yet</p>
      </div>

      <!-- overlay that goes underneath edit and create form modals -->
      <transition name="fade" appear>
        <!-- Every time I exit the create modal I want to clear the form and set category to the default category defined in django models -->
        <div
          class="modal-overlay"
          @click="
            $data.entry = { cost: '', category: 'Uncategorized' };
            showEditModal = false;
            showCreateModal = false;
          "
          v-if="showEditModal || showCreateModal"
        ></div>
      </transition>

      <!-- edit modal with form to edit an entry -->
      <transition>
        <div class="edit-modal" v-if="showEditModal">
          <div class="exit-btn" @click="showEditModal = false">&#10799;</div>
          <label for="category">Change Category:</label>

          <select
            form="edit-form"
            name="category"
            id="category"
            v-model="entry.category"
          >
            <option value="Groceries">Groceries</option>
            <option value="Uncategorized">Uncategorized</option>
            <option value="Dinning &#38; Drinks">Dinning &#38; Drinks</option>
            <option value="Charity">Charity</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Fees &#38; Charges">Fees &#38; Charges</option>
            <option value="Financial">Financial</option>
            <option value="Fitness">Fitness</option>
            <option value="Gifts">Gifts</option>
            <option value="Health">Health</option>
            <option value="Loans">Loans</option>
            <option value="Pets">Pets</option>
            <option value="Shopping">Shopping</option>
            <option value="Taxes">Taxes</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
            <option value="Auto &#38; Transport">Auto &#38; Transport</option>
          </select>
          <form
            @submit.prevent="
              edit();
              showEditModal = false;
            "
            class="edit-form"
            id="edit-form"
          >
            <label for="cost">Change Amount:</label>
            <input
              name="cost"
              type="number"
              step="0.01"
              min="0"
              v-model="entry.cost"
            />
          </form>

          <div class="bottom-modal-container">
            <p
              class="modal-bot-btns"
              id="delete"
              @click="
                del();
                showEditModal = false;
              "
            >
              Delete
            </p>
            <p
              class="modal-bot-btns"
              id="update"
              @click="
                edit();
                showEditModal = false;
              "
            >
              Update
            </p>
          </div>
        </div>
      </transition>

      <!-- A form to create a new entry -->
      <transition>
        <div class="create-modal" v-if="showCreateModal">
          <div
            class="exit-btn"
            @click="
              $data.entry = { cost: '', category: 'Uncategorized' };
              showCreateModal = false;
            "
          >
            &#10799;
          </div>
          <label for="category">Add Category:</label>

          <select
            form="create-form"
            name="category"
            id="category"
            v-model="entry.category"
          >
            <option value="Groceries">Groceries</option>
            <option value="Dinning &#38; Drinks">Dinning &#38; Drinks</option>
            <option value="Charity">Charity</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Fees &#38; Charges">Fees &#38; Charges</option>
            <option value="Financial">Financial</option>
            <option value="Fitness">Fitness</option>
            <option value="Gifts">Gifts</option>
            <option value="Health">Health</option>
            <option value="Loans">Loans</option>
            <option value="Pets">Pets</option>
            <option value="Shopping">Shopping</option>
            <option value="Taxes">Taxes</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
            <option value="Auto &#38; Transport">Auto &#38; Transport</option>
            <option value="Uncategorized">Uncategorized</option>
          </select>
          <form
            @submit.prevent="
              createEntry();
              showCreateModal = false;
            "
            class="create-form"
            id="create-form"
          >
            <label for="cost">Add Amount:</label>
            <input
              name="cost"
              type="number"
              step="0.01"
              min="0"
              v-model="entry.cost"
            />
          </form>

          <div class="bottom-modal-container">
            <p
              class="modal-bot-btns"
              id="create"
              @click="
                createEntry();
                showCreateModal = false;
              "
            >
              Create
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../main.js";

export default {
  name: "List",
  data() {
    return {
      entries: [],
      entry: {},

      showEditModal: false,
      showCreateModal: false,
    };
  },
  async created() {
    await this.getEntries();
  },
  methods: {
    async createEntry() {
      const data = new FormData();

      data.append("cost", this.entry.cost);
      data.append("category", this.entry.category);

      axiosInstance
        .post("/journal/create/", data)
        .then(() => {
          this.getEntries();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async edit() {
      const data = new FormData();

      data.append("cost", this.entry.cost);
      data.append("category", this.entry.category);

      axiosInstance
        .patch(`/journal/update/${this.entry.id}/`, data)
        .then(() => {
          this.getEntries();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async del() {
      axiosInstance
        .post(`/journal/delete/${this.entry.id}/`)
        .then(() => {
          this.getEntries();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getEntries() {
      axiosInstance
        .get("/journal/")
        .then((response) => {
          // changes response.data array objects into a new array with human readable dates.
          this.entries = response.data.map((x) => ({
            user: x.user,
            cost: x.cost,
            category: x.category,
            date: new Date(x.date).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            id: x.id,
          }));
        })
        .then(() => {
          console.log(this.entries.date);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logout() {
      this.$store
        .dispatch("logoutUser")
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goToChangePass() {
      this.$router.push({ name: "ChangePass" });
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap");
$nav-background: #f3fef4;
$btn-color: #afe7a1;
$primary-hover: #5f8d53;
// top navbar style

.list {
  background: #fff;
  height: 100vh;
  width: 100%;
}

.navbar-container {
  background: $nav-background;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  .title {
    display: block;
    margin-left: 4em;
    font-weight: 400;
  }
  .account-btn {
    display: block;
    margin-top: -1em;
    margin-bottom: -1em;
    font-weight: 200;
    padding: 0.5em 3em 0.5em 3em;

    border-radius: 0.4em;
    background: $btn-color;
    &:hover {
      background: $primary-hover;
      color: white;
      transition-duration: 0.2s;
      cursor: pointer;
    }
  }
  .burger-menu {
    display: none;
  }
}

.dropdown-div {
  position: relative;
  display: inline-block;
  margin-right: 6em;
  margin-bottom: 1.5em;
  margin-top: 2em;

  &:hover,
  &:active {
    cursor: pointer;
    .dropdown-content {
      display: block;
      margin-top: 1em;
    }
  }
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  p {
    padding: 1em 1em;
    display: block;
    &:hover {
      background-color: #ddd;
      cursor: pointer;
    }
  }
}
.add-expense-btn-container {
  font-weight: 200;
  padding: 0.2em 2em 0.2em 2em;
  background: $btn-color;
  width: 7em;
  margin-top: 3em;
  margin-left: 7em;
  padding-left: 2em;
  padding-right: 1em;

  border-radius: 0.4em;
  background: $btn-color;
  &:hover {
    background: $primary-hover;
    color: white;
    transition-duration: 0.2s;

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
  th,
  td {
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
  @media (orientation: landscape) {
    position: fixed;
  }
}

.edit-modal,
.create-modal {
  @media (orientation: landscape) {
    position: relative;
  }
  position: fixed;

  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 4rem 4rem;
  padding-top: 1em;
  padding-bottom: 1rem;

  border-radius: 0.5em;

  label {
    margin-right: 1rem;
  }
  input {
    padding: 0.8rem;
    border-radius: 0.4em;
    border: #d3d3d3 0.2em solid;
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
    border-radius: 0.4em;
    border: #d3d3d3 0.1em solid;
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
    padding: 0.8em;
  }

  #delete {
    margin-right: 2em;
    background: #e60000;
    color: #fff;
    border-radius: 0.4em;

    &:hover {
      background: #b30000;
      cursor: pointer;
      transition-duration: 0.2s;
    }
  }
  #update,
  #create {
    background: $btn-color;
    border-radius: 0.4em;
    &:hover {
      color: #fff;
      background: $primary-hover;
      cursor: pointer;
      transition-duration: 0.2s;
    }
  }

  #create {
    margin-left: 6.8em;
  }
}

@media (max-width: 768px) {
  .navbar-container .account-btn {
    display: none;
  }

  .navbar-container .burger-menu {
    display: block;
  }

  .dropdown-div {
    margin-left: 7em;
    &:hover,
    &:focus {
      .dropdown-content {
        margin-top: -0.5em;
        margin-left: -8em;
      }
    }

    margin-right: 0em;
    margin-left: auto;
  }
  .navbar-container .title {
    margin-left: 0em;
  }

  .add-expense-btn-container {
    margin-left: 1em;
  }

  .data-section {
    margin-left: 0em;
    margin-right: 0em;
  }
}
@media (max-width: 545px) {
  .edit-modal,
  .create-modal {
    transform: translate(0, 0);
    height: 100%;
    width: 100vh;
    position: absolute;
    padding-left: 0.3em;
    padding-right: 0.3em;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    .exit-btn {
      margin-left: 24em;
    }

    .bottom-modal-container {
      margin-left: 13em;
    }
  }
}
</style>
