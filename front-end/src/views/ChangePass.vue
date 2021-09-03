<template>
  <div class="changepass">
    <div>
      <div class="change-section">
        <div class="form">
          <h1 class="title">Change Password</h1>
          <strong v-if="wrong_cred" class="error">{{ passwd_msg }}</strong>
          <p class="success" v-if="success">{{ success_msg.detail }}</p>
          <form @submit.prevent="changePassword" class="login-form">
            <div class="password-div">
              <label for="password" class="form-label">New Password:</label>
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

            <div @click="changePassword" class="submit">
              <p>Change</p>
            </div>
          </form>
        </div>
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
.changepass {
  background: #afe7a1;
  height: 100vh;
  width: 100vw;
  position: fixed;
  @media (orientation: landscape) {
    height: 200vh;
    position: absolute;
  }
  @media (max-width: 500px) {
    height: 200vh;
    position: absolute;
  }
}
.change-section {
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
    @media (max-width: 500px) {
      font-size: 12px;
    }
  }
  .success {
    color: #5f8d53;
    display: block;
    margin-right: 1em;
  }
  @media (max-width: 500px) {
    padding: 0;
    margin-top: 3em;
    margin-left: 1em;
    margin-right: 1em;
  }
}
@media (max-width: 620px) {
  .change-section .form .form-inputs {
    width: 50%;
  }
}
</style>
