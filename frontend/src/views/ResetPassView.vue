<template>
  <div class="resetpass">
    <div class="reset-section">
      <div class="form">
        <h1 class="title">Reset Password</h1>

        <p class="success" v-if="success">{{ success_msg.detail }}</p>
        <form @submit.prevent="resetPassword" class="login-form">
          <div class="password-div">
            <label for="password" class="form-label">New Password:</label>
            <strong v-if="wrong_cred" class="error">{{ passwd_msg1 }}</strong>
            <div>
              <input
                v-model="newpass1"
                type="password"
                name="password"
                class="form-inputs"
              />
            </div>
          </div>

          <div class="password2-div">
            <label for="password2" class="form-label"
              >Re-enter New Password:</label
            >
            <strong v-if="wrong_cred" class="error">{{ passwd_msg2 }}</strong>
            <div>
              <input
                v-model="newpass2"
                type="password"
                name="password2"
                class="form-inputs"
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
.resetpass {
  @media (orientation: landscape) {
    height: 200vh;
    position: absolute;
  }
  @media (max-width: 500px) {
    height: 200vh;
  }
  background: #afe7a1;
  height: 100vh;
  width: 100vw;
  position: fixed;
}
.reset-section {
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
  }
  .title {
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
    @media (max-width: 500px) {
      margin-bottom: 1em;
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
    display: block;
    @media (max-width: 500px) {
      width: 50%;
    }
  }
  @media (max-width: 500px) {
    padding: 0;
    margin-top: 3em;
    margin-left: 1em;
    margin-right: 1em;
  }
}
@media (max-width: 620px) {
  .reset-section .form .form-inputs {
    width: 50%;
  }
}
</style>
