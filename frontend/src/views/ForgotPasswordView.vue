<template>
  <div class="form-page">
    <div class="content">
      <div class="form">
        <h2 class="title">Reset Password</h2>
        <strong v-if="wrong_cred" class="error">Email is Invalid</strong>
        <p class="success" v-if="success">{{ success_msg.detail }}</p>
        <form @submit.prevent="sendLink" class="login-form">
          <div class="email-div">
            <div>
              <input
                v-model="email"
                type="email"
                name="eamil"
                class="form-inputs"
                placeholder="Email"
              />
            </div>
          </div>
          <input type="submit" id="submit" />

          <div @click="sendLink" class="submit">
            <p>Send Reset Link</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ForgotPasswordView",
  data() {
    return {
      email: null,
      wrong_cred: false,
      success: false,
      success_msg: "",
    };
  },
  methods: {
    sendLink() {
      axios({
        method: "POST",
        url: "https://api.budgetbook.live/auth/password/reset/",
        headers: { "Content-Type": "application/json" },
        data: { email: this.email },
      })
        .then((response) => {
          this.success_msg = response.data;
          this.wrong_cred = false;
          this.success = true;
        })
        .catch((err) => {
          this.err_msg = err;
          console.log(err);
          this.success = false;

          this.wrong_cred = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/_forms.scss";
</style>
