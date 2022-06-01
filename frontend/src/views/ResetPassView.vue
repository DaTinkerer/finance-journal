<template>
  <div class="form-page">
    <div class="content">
      <div class="form">
        <h2 class="title">Reset Password</h2>

        <p class="success" v-if="success">{{ success_msg.detail }}</p>
        <form @submit.prevent="resetPassword" class="login-form">
          <div class="password-div">
            <strong v-if="wrong_cred" class="error">{{ passwd_msg1 }}</strong>
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
            <strong v-if="wrong_cred" class="error">{{ passwd_msg2 }}</strong>
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

          <div @click="resetPassword" class="submit">
            <p>Reset</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ResetPass",
  data() {
    return {
      newpass1: null,
      newpass2: null,
      uid: this.$route.params.uid,
      token: this.$route.params.token,
      wrong_cred: false,
      success: false,
      success_msg: "",
      passwd_msg1: [],
      passwd_msg2: [],
    };
  },
  methods: {
    resetPassword() {
      axios({
        method: "POST",
        url: `https://api.budgetbook.live/password-reset-confirm/${this.uid}/${this.token}/`,
        headers: { "Content-Type": "application/json" },
        data: {
          new_password1: this.newpass1,
          new_password2: this.newpass2,
          uid: this.uid,
          token: this.token,
        },
      })
        .then((response) => {
          this.success_msg = response.data;
          this.wrong_cred = false;
          this.success = true;
        })
        .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data.new_password1 != null) {
            this.passwd_msg1 = err.response.data.new_password1
              .toString()
              .replace(/,+/g, " ");
          } else {
            this.passwd_msg1 = "";
          }
          if (err.response.data.new_password2 != null) {
            this.passwd_msg2 = err.response.data.new_password2
              .toString()
              .replace(/,+/g, " ");
          } else {
            this.passwd_msg2 = "";
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
