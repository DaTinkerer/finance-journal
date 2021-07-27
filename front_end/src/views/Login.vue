<template>
  <div class="login">

    <div class="login-section">
      
      <div class="form">
        <h1 class="title">Log In</h1>
        <form @submit.prevent="submitForm" class="login-form">

          <div class="email-div">
          <label for="email" class="form-label">Email:</label>
          <div>
          <input v-model="email" type="email" name="eamil" class="form-inputs">
          </div>
          </div>

          <div class="password-div">
          <label for="password" class="form-label">Password:</label>
          <div>
          <input v-model="password" type="password" name="password" class="form-inputs">
          </div>
          </div>
          <input type="submit" style="position: absolute; left: -9999px"/>

          <div @click="submitForm" class="submit">
          <p>Log In</p>
          </div>

        </form>
          <div class="links">
          <p class="form-links">Register</p>
          <p class="form-links">Forgot Password?</p>
          </div>

      </div>
    </div>
    {{passoword}}
    
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return{
      email: null,
      
      show: false,
      password: null,
      
      token: '',
      wrong_cred: false,
    }
    
  },
  props: {
    
  },
  methods: {
    submitForm () {
      this.$store.dispatch('loginUser',{
        email: this.email,
        password: this.password
      }).then(() =>{
        this.$router.push({ name: 'List' })
      }) .catch(err =>{
        console.log(err)
        this.wrong_cred = true
      })
      
    },
  }
}
</script>


<style lang="scss">


body{
    
    background: #AFE7A1;
    
  }

  .login-section {
    display: flex;
    
    padding: 2em;
    
    max-width: 531.5px;
    border-radius: 1em;
    box-shadow: 1px 3px 3px #888888;
    
    
    background: #fff;
    
    width: 50%;
    margin: auto;
    margin-top: 6em;

    .form {
      width: 100%;
      margin-left: 2em;
      margin-right: 2em;
    
    
    .title {
      font-weight: 400;
    }
    .email-div{
      margin-top: 3.5em;
      font-weight: 400;
    }

    .password-div{
      margin-top: 3.5em;
      font-weight: 400;
    }

    input {
      width: 100%;
      margin-top: 2em;
      padding: .7em;
      border-radius: .5em;
      box-sizing: border-box;
      border: #AAAAAA .2em solid;
      
    }

    .submit {
     margin-top: 2em;
      background:#AFE7A1;
      padding: .1em;
      margin-right: 21em;
      border-radius: .4em;
      min-width: 131.5px;
      &:hover {
        background: #5F8D53;
        color: white;
        transition-duration: .2s;
        
        cursor: pointer;
      }
      

      p {
        margin-left: 2.5em;
      }
    }
    .links {
      margin-top: 2em;
    }
    .form-links {
      margin-top: 1em;
      color: #137911;
       &:hover {
       
        cursor: pointer;
      }
    }
    }


  }

</style>