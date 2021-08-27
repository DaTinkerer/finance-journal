<template>
  <div class="forgotpass">
    <div class="email-section">
      <div class="form">
        <h1 class="title">Reset Password</h1>
        <strong v-if="wrong_cred" class="error">Email is Invalid</strong>
        <p class="success" v-if="success">{{ success_msg.detail }}</p>
        <form @submit.prevent="sendLink" class="login-form">
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
          <input type="submit" style="position: absolute; left: -9999px" />

          <div @click="sendLink" class="submit">
            <p>Send Link</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ForgotPassword",
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
        url: "http://198.211.106.130/auth/password/reset/",
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
          this.success = false;

          this.wrong_cred = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.forgotpass {
  background: #afe7a1;
  height: 100vh;
  width: 100vw;
  position: fixed;
}

.email-section {
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
        margin-left: 1.9em;
      }
    }

    .error {
      color: rgb(224, 9, 9);
      display: block;
    }
    .success {
      color: #5f8d53;
    }
  }
}

@media (max-width: 620px) {
  .email-section {
    width: 100%;
  }
  .email-section .form .form-inputs {
    width: 50%;
  }
}
</style>
