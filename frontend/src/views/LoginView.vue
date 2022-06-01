<template>
  <div class="form-page">
    <section class="content">
      <form @submit.prevent="submitForm" class="form">
        <h2 class="title">Log In</h2>
        <strong v-if="wrong_cred" class="error"
          >Email or password is invalid</strong
        >
        <div class="email-div">
          <div>
            <input
              placeholder="Email"
              v-model="email"
              type="email"
              name="eamil"
              class="form-inputs"
            />
          </div>
        </div>

        <div class="password-div">
          <div>
            <input
              placeholder="Password"
              v-model="password"
              type="password"
              name="password"
              class="form-inputs"
            />
          </div>
        </div>
        <input type="submit" id="submit" />

        <div @click="submitForm" class="submit">
          <p>Log In</p>
        </div>

        <div class="links-div">
          <router-link to="register"
            ><p class="form-links">Register</p></router-link
          >
          <router-link to="forgot-password"
            ><p class="form-links">Forgot Password?</p></router-link
          >
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: null,

      show: false,
      password: null,

      token: "",
      wrong_cred: false,
    };
  },
  props: {},
  methods: {
    submitForm() {
      this.$store
        .dispatch("loginUser", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Expenses" });
        })
        .catch(() => {
          this.wrong_cred = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/_forms.scss";
</style>
