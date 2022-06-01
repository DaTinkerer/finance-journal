<template>
  <div class="form-page">
    <div class="content">
      <div class="form">
        <h2 class="title">Change Password</h2>
        <strong v-if="wrong_cred" class="error">{{ passwd_msg }}</strong>
        <p class="success" v-if="success">{{ success_msg.detail }}</p>
        <form @submit.prevent="changePassword" class="login-form">
          <div class="password-div">
            <div>
              <input
                v-model="newpass1"
                type="password"
                name="password"
                class="form-inputs"
                placeholder="New Password"
              />
            </div>
          </div>

          <div class="password2-div">
            <div>
              <input
                v-model="newpass2"
                type="password"
                name="password2"
                class="form-inputs"
                placeholder="Re-enter New Password"
              />
            </div>
          </div>
          <input type="submit" style="position: absolute; left: -9999px" />

          <div @click="changePassword" class="submit">
            <p>Change Password</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../main.js";
export default {
  name: "ChangePass",
  data() {
    return {
      newpass1: null,
      newpass2: null,

      wrong_cred: false,

      success: false,
      success_msg: "",

      passwd_msg: [],
    };
  },

  methods: {
    changePassword() {
      const data = new FormData();
      data.append("new_password1", this.newpass1);
      data.append("new_password2", this.newpass2);
      axiosInstance
        .post("/auth/password/change/", data)

        .then((response) => {
          this.success_msg = response.data;
          this.wrong_cred = false;
          this.success = true;
        })
        .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))

        .then(() => {
          this.$router.push({ name: "Expenses" });
        })

        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data.new_password2 != null) {
            this.passwd_msg = err.response.data.new_password2
              .toString()
              .replace(/,+/g, " ");
          } else {
            this.passwd_msg = "";
          }
          this.wrong_cred = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/_forms.scss";
</style>
