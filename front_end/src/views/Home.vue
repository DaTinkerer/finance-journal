<template>
  <div class="home">
    <div id="body">
      <div class="top-div">
        <h1 class="logo">budgetbook</h1>
        <div class="top-btns">
          <p @click="goToLogin" class="login-btn">Log In</p>
          <p @click="goToSignup" class="signup-btn">Sign Up</p>
        </div>
      </div>

      <div class="hero">
        <p class="text">
          Simple, hassle free tool for tracking your finances.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: "Login" });
    },
    goToSignup() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  background: #afe7a1;
  height: 100vh;
  min-width: 100vw;
  position: fixed;
}

.top-div {
  display: flex;
  justify-content: space-between;
  background: #fff;
  .logo {
    margin-left: 5em;
    font-weight: bold;
    color: #23640c;
  }

  .top-btns {
    display: flex;
    margin-right: 9em;
    margin-top: 0.3em;
    p {
      display: block;
      font-weight: lighter;
      border-radius: 0.4em;
    }
    .login-btn {
      margin-right: 2em;
      background: #e2f1e3;
      border-style: solid;
      border-width: 0.12em;
      border-color: #23640c;
      padding: 0.5em;
      height: 1.5em;
      &:hover {
        cursor: pointer;
      }
    }
    .signup-btn {
      background: #afe7a1;
      padding: 0.5em;
      height: 1.8em;
      &:hover {
        cursor: pointer;
      }
    }
  }

  @media (max-width: 760px) {
    .top-btns {
      margin-right: 4em;
    }

    .logo {
      margin-left: 2em;
    }
  }
  @media (max-width: 490px) {
    .top-btns {
      margin-right: 1em;
    }

    .logo {
      margin-left: 1em;
      font-size: 23px;
      font-weight: bold;
    }
  }
}

.hero {
  margin-left: 10em;
  margin-top: 10em;

  .text {
    font-size: 64px;
  }
  @media (max-width: 760px) {
    margin-left: 3em;
  }

  @media (max-width: 490px) {
    width: 100%;
    margin-left: 1em;

    .text {
      font-size: 58px;
    }
  }
}
</style>
