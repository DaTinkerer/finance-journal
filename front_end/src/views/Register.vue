<template>
  <div class="register">
    <div class="register-section">
      <div class="form">
        <h1 class="title">Register</h1>

        <form @submit.prevent="signUpForm" class="login-form">
          <strong v-if="wrong_cred" class="error">Invalid Fields</strong>
          <p class="success" v-if="success">{{ success_msg.detail }}</p>
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
                v-model="password1"
                type="password"
                name="password"
                class="form-inputs"
              />
            </div>
          </div>

          <div class="password2-div">
            <label for="password2" class="form-label">Re-enter Password:</label>

            <div>
              <input
                v-model="password2"
                type="password"
                name="password2"
                class="form-inputs"
              />
            </div>
          </div>

          <input type="submit" style="position: absolute; left: -9999px" />

          <div @click="signUpForm" class="submit">
            <p>Sign Up</p>
          </div>
        </form>
        <div class="links">
          <router-link to="/login"
            ><p class="form-links">Log In</p></router-link
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
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      email: null,
      password1: null,
      password2: null,
      wrong_cred: false,

      success: false,
      success_msg: "",
    };
  },
  props: {},
  methods: {
    signUpForm() {
      axios({
        method: "POST",
        url: "http://localhost:8000/register/",
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
          this.$router.push({ name: "Login" });
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
.register {
  @media (orientation: landscape) {
    height: 200vh;
    position: absolute;
    
    
  }
  background: #afe7a1;
  height: 100vh;
  width: 100vw;
  position: fixed;
}

.register-section {
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
    .password2-div {
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
    .links {
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
  .error {
    color: rgb(224, 9, 9);
    display: block;
    margin-top: 1em;
  }

  .success {
    color: #5f8d53;
  }
}

@media (max-width: 620px) {
  .register-section {
    width: 100%;
  }
  .register-section .form .form-inputs {
    width: 50%;
  }
}
</style>
