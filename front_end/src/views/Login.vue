<template>
  <div class="login">
    <div class="login-section">
      <div class="form">
        <h1 class="title">Log In</h1>
        <strong v-if="wrong_cred" class="error"
          >Email or password is invalid</strong
        >
        <form @submit.prevent="submitForm" class="login-form">
          <div class="email-div">
            <label for="email" class="form-label">Email:</label>
            <div>
              <input
                v-model="email"
                type="email"
                name="eamil"
                class="form-inputs"
              />
            </div>
          </div>

          <div class="password-div">
            <label for="password" class="form-label">Password:</label>
            <div>
              <input
                v-model="password"
                type="password"
                name="password"
                class="form-inputs"
              />
            </div>
          </div>
          <input type="submit" style="position: absolute; left: -9999px" />

          <div @click="submitForm" class="submit">
            <p>Log In</p>
          </div>
        </form>
        <div class="links-div">
          <router-link to="register"
            ><p class="form-links">Register</p></router-link
          >
          <router-link to="forgot-password"
            ><p class="form-links">Forgot Password?</p></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
          this.$router.push({ name: "List" });
        })
        .catch((err) => {
          console.log(err);
          this.wrong_cred = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  @media (orientation: landscape) {
    height: 200vh;
    position: absolute;
    
    
  }
  background: #afe7a1;
  height: 100vh;
  width: 100vw;
  position: fixed;
}

.login-section {
  display: flex;

  padding: 2em;

  max-width: 531.5px;
  border-radius: 1em;
  box-shadow: 1px 3px 3px #888888;

  background: #f5f4f2;

  width: 100%;
  margin: auto;
  margin-top: 6em;

  .form {
    width: 100%;
    margin-left: 2em;
    margin-right: 2em;

    .title {
      font-weight: 400;
    }
    .email-div {
      margin-top: 1em;
      font-weight: 400;
    }

    .password-div {
      margin-top: 2em;
      font-weight: 400;
    }

    input {
      width: 100%;
      margin-top: 2em;
      padding: 0.7em;
      border-radius: 0.5em;
      box-sizing: border-box;
      border: #aaaaaa 0.2em solid;
    }

    .submit {
      margin-top: 2em;
      background: #afe7a1;
      padding: 0.1em;
      margin-right: 21em;
      border-radius: 0.4em;
      min-width: 131.5px;
      &:hover {
        background: #5f8d53;
        color: white;
        transition-duration: 0.2s;

        cursor: pointer;
      }

      p {
        margin-left: 2.5em;
      }
    }
    .links-div {
      margin-top: 2em;
      margin-right: 21em;
    }
    .form-links {
      margin-top: 1em;
      color: #137911;
    }
  }
  .links p {
    &:hover {
      cursor: pointer;
    }
  }

  a {
    text-decoration: none;
  }

  strong {
    color: rgb(224, 9, 9);
    display: block;
    margin-top: 3em;
  }
}
@media (max-width: 620px) {
  .login-section {
    width: 100%;
  }
  .login-section .form .form-inputs {
    width: 50%;
  }
}
</style>
