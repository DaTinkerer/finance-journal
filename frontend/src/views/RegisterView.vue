<template>
  <div class="register">
    <div>
      <div class="register-section">
        <div class="form">
          <h1 class="title">Register</h1>

          <form @submit.prevent="signUp" class="login-form">
            <strong v-if="wrong_cred" class="error">{{ nfe_msg }}</strong>

            <p class="success" v-if="success">Successfully created account</p>
            <div class="email-div">
              <label for="email" class="form-label">Email:</label>
              <strong v-if="wrong_cred" class="error">{{
                email_err_msg
              }}</strong>
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
              <strong v-if="wrong_cred" class="error">{{
                passwd1_err_msg
              }}</strong>
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
              <label for="password2" class="form-label"
                >Re-enter Password:</label
              >
              <strong v-if="wrong_cred" class="error">
                {{ passwd2_err_msg }}
              </strong>

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

            <div @click="signUp" class="submit">
              <p>Sign Up</p>
            </div>
          </form>
          <div class="links">
            <router-link to="/"><p class="form-links">Log In</p></router-link>
            <router-link to="forgot-password"
              ><p class="form-links">Forgot Password?</p></router-link
            >
          </div>
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
          this.$router.push({ path: "Login" });
        })
        .catch((err) => {
          console.log(err.response.data);
          this.err_msg = "";
          this.err_msg = err.response.data;
          console.log(err.response.data.password1);

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
.register {
  background: #afe7a1;
  height: 100vh;
  width: 100vw;
  position: fixed;
  @media (orientation: landscape) {
    height: 300vh;
    position: absolute;
  }
  @media (max-width: 500px) {
    height: 200vh;
    position: absolute;
  }
}

.register-section {
  display: flex;

  padding: 2em;

  max-width: 531.5px;

  border-radius: 1em;
  box-shadow: 1px 3px 3px #888888;

  background: #fff;

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
      @media (max-width: 620px) {
        margin-right: 1em;
      }
    }
    .form-links {
      margin-top: 1em;
      color: #137911;
    }
  }

  a {
    text-decoration: none;
    :hover {
      cursor: pointer;
    }
  }
  .error {
    color: rgb(224, 9, 9);
    display: block;
    margin-top: 1em;
    @media (max-width: 500px) {
      font-size: 12px;
      width: 50%;
    }
  }

  .success {
    color: #5f8d53;
  }
  @media (max-width: 500px) {
    padding: 0;
    margin-top: 3em;
    margin-left: 1em;
    margin-right: 1em;
  }
}

@media (max-width: 620px) {
  .register-section .form {
    width: 50%;
  }
}
</style>
