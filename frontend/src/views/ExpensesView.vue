<template>
  <div class="expenses">
    <div class="navbar-container">
      <h2 class="title">budgetbook</h2>
      <div class="dropdown-div">
        <div @click="toggleDropdown()" class="burger-menu">
          <img src="../assets/burger.svg" alt="" />
        </div>
        <Transition name="fade">
          <div v-if="showDropdown" class="dropdown-content">
            <router-link to="/change-password" class="dropdown-items"
              ><p>Change Password</p></router-link
            >
            <p class="dropdown-items" @click="logout">Log out</p>
          </div>
        </Transition>
      </div>
    </div>

    <div class="data-section">
      <!-- The table -->
      <DataTable
        :value="entries"
        stripedRows
        :paginator="true"
        :rows="10"
        responsiveLayout="scroll"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      >
        <template #header>
          <div
            @click="
              $data.entry = { cost: '', category: 'Uncategorized' };
              showCreateModal = true;
            "
          >
            <font-awesome-icon id="add-btn" icon="plus" />
          </div>
        </template>
        <Column field="date" header="Date" :sortable="true"></Column>
        <Column field="category" header="Category" :sortable="true"></Column>
        <Column field="cost" header="Cost" :sortable="true"></Column>
        <Column>
          <template #body="slotProps">
            <font-awesome-icon
              @click="
                showEditModal = true;
                $data.entry = slotProps.data;
              "
              class="edit-icon"
              icon="pencil" />
            &nbsp; &nbsp; &nbsp;
            <font-awesome-icon
              @click="
                $data.entry = slotProps.data;
                del();
              "
              class="del-icon"
              icon="trash"
          /></template>
        </Column>
      </DataTable>
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
          <label for="category">Change Category</label>

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
            <label for="cost">Change Amount</label>
            <input
              name="cost"
              type="number"
              step="0.01"
              min="0"
              v-model="entry.cost"
            />
          </form>

          <Button
            label="Save"
            class="p-button"
            id="update"
            @click="
              edit();
              showEditModal = false;
            "
          />
        </div>
        <!-- create modal -->
        <div class="create-modal" v-if="showCreateModal">
          <div class="exit-btn" @click="showCreateModal = false">
            <font-awesome-icon icon="xmark" />
          </div>
          <label for="category">Add Category</label>

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
            <label id="label" for="cost">Add Amount</label>
            <input
              name="cost"
              type="number"
              step="0.01"
              min="0"
              v-model="entry.cost"
            />
          </form>

          <Button
            class="p-button"
            label="Create"
            id="create"
            @click="
              createEntry();
              showCreateModal = false;
            "
          />
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
      // expenses data
      entries: [],
      entry: {},

      // conditional renders
      showDropdown: false,
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
    toggleDropdown() {
      if (this.showDropdown == false) {
        this.showDropdown = true;
      } else {
        this.showDropdown = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/_expenses.scss";
</style>
