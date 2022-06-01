<template>
  <div class="form-page">
    <div class="content">
      <div class="form">
        <h2 class="title">Register</h2>

        <form @submit.prevent="signUp" class="login-form">
          <strong v-if="wrong_cred" class="error">{{ nfe_msg }}</strong>

          <p class="success" v-if="success">Successfully created account</p>
          <div class="email-div">
            <strong v-if="wrong_cred" class="error">{{ email_err_msg }}</strong>
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

          <div class="password-div">
            <strong v-if="wrong_cred" class="error">{{
              passwd1_err_msg
            }}</strong>
            <div>
              <input
                v-model="password1"
                type="password"
                name="password"
                class="form-inputs"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="password2-div">
            <strong v-if="wrong_cred" class="error">
              {{ passwd2_err_msg }}
            </strong>

            <div>
              <input
                v-model="password2"
                type="password"
                name="password2"
                class="form-inputs"
                placeholder="Re-enter password"
              />
            </div>
          </div>

          <input type="submit" style="position: absolute; left: -9999px" />

          <div @click="signUp" class="submit">
            <p>Sign Up</p>
          </div>
        </form>
        <div class="links-div">
          <router-link to="/"><p class="form-links">Log In</p></router-link>
          <router-link to="forgot-password"
            ><p class="form-links">Forgot Password?</p></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterView",
  data() {
    return {
      email: null,
      password1: null,
      password2: null,
      wrong_cred: false,

      success: false,
      err_msg: {},

      email_err_msg: [],
      passwd1_err_msg: [],
      passwd2_err_msg: [],
      nfe_msg: [],
    };
  },
  props: {},
  methods: {
    signUp() {
      axios({
        method: "POST",
        url: "https://api.budgetbook.live/register/",
        headers: { "Content-Type": "application/json" },
        data: {
          email: this.email,
          password1: this.password1,
          password2: this.password2,
        },
      })
        .then((response) => {
          this.success_msg = response.data;
          this.wrong_cred = false;
          this.success = true;
        })

        .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
        .then(() => {
          this.$router.push({ path: "Login" });
        })
        .catch((err) => {
          this.err_msg = "";
          this.err_msg = err.response.data;

          // converts the err message arrays into strings and changes the commas, if any,
          // to spaces with regex

          // going through each possible key value for the backend error messages and
          // displaying them if they exist
          if (err.response.data.email != null) {
            this.email_err_msg = err.response.data.email
              .toString()
              .replace(/,+/g, " ");
          } else {
            this.email_err_msg = "";
          }
          if (err.response.data.password1 != null) {
            this.passwd1_err_msg = err.response.data.password1
              .toString()
              .replace(/,+/g, " ");
          } else {
            this.passwd1_err_msg = "";
          }
          if (err.response.data.password2 != null) {
            this.passwd2_err_msg = err.response.data.password2
              .toString()
              .replace(/,+/g, " ");
          } else {
            this.passwd2_err_msg = "";
          }
          if (err.response.data.non_field_errors != null) {
            this.nfe_msg = err.response.data.non_field_errors
              .toString()
              .replace(/\[\]"+/g, "");
          } else {
            this.nfe_msg = "";
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
