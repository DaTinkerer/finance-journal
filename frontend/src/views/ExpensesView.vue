<template>
  <div class="expenses">
    <div class="navbar-container">
      <h2 class="title">budgetbook</h2>
      <div class="dropdown-div">
        <div class="burger-menu">
          <img src="../assets/burger.svg" alt="" />
        </div>
        <div class="dropdown-content">
          <p @click="goToChangePass">Change Password</p>
          <p @click="logout">Log out</p>
        </div>
      </div>
    </div>

    <div class="data-section">
      <!-- table section  -->
      <table class="table">
        <thead>
          <th
            @click="
              $data.entry = { cost: '', category: 'Uncategorized' };
              showCreateModal = true;
            "
          >
            <font-awesome-icon id="add-btn" icon="plus" />
          </th>
          <tr>
            <th scope="col" class="column-title">Date</th>
            <th scope="col" class="column-title">Category</th>
            <th scope="col" class="column-title">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr class="table-data" v-for="entry in entries" :key="entry.id">
            <td>{{ entry.date }}</td>
            <td>{{ entry.category }}</td>
            <td>{{ entry.cost }}</td>
            <div class="edit-del-btns">
              <font-awesome-icon
                @click="
                  showEditModal = true;
                  $data.entry = entry;
                "
                class="edit-icon"
                icon="pencil"
              />
              &nbsp; &nbsp; &nbsp;
              <font-awesome-icon
                @click="
                  $data.entry = entry;
                  del();
                "
                class="del-icon"
                icon="trash"
              />
            </div>
          </tr>
        </tbody>
      </table>

      <p class="default-msg" v-if="entries == ''">
        Great Job! You haven't spent any money.
      </p>
    </div>
    <Transition name="fade">
      <div class="modal-overlay" v-if="showEditModal || showCreateModal">
        <!-- edit modal  -->
        <div class="edit-modal" v-if="showEditModal">
          <div
            class="exit-btn"
            @click="
              getEntries();
              showEditModal = false;
            "
          >
            <font-awesome-icon icon="xmark" />
          </div>
          <label for="category">Change Category:</label>

          <form
            @submit.prevent="
              edit();
              showEditModal = false;
            "
            class="edit-form"
            id="edit-form"
          >
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
            <label for="cost">Change Amount:</label>
            <input
              name="cost"
              type="number"
              step="0.01"
              min="0"
              v-model="entry.cost"
            />
          </form>

          <p
            class="modal-btn"
            id="update"
            @click="
              edit();
              showEditModal = false;
            "
          >
            Update
          </p>
        </div>
        <!-- create modal -->
        <div class="create-modal" v-if="showCreateModal">
          <div class="exit-btn" @click="showCreateModal = false">
            <font-awesome-icon icon="xmark" />
          </div>
          <label for="category">Add Category:</label>

          <form
            @submit.prevent="
              createEntry();
              showCreateModal = false;
            "
            class="create-form"
            id="create-form"
          >
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
            <label for="cost">Add Amount:</label>
            <input
              name="cost"
              type="number"
              step="0.01"
              min="0"
              v-model="entry.cost"
            />
          </form>

          <p
            class="modal-btn"
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
    </Transition>
  </div>
</template>

<script>
import axiosInstance from "../main.js";

export default {
  name: "ExpensesView",
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
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/_expenses.scss";
</style>
