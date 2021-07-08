<template>
  <div class="login">
     <form v-on:submit.prevent="submitForm" >
      <input type="email" name="email" placeholder="Enter your Email Address" v-model="email">
      <br>
      <br>
      <input type="password" name="password" placeholder="Enter your Password" v-model="password">
      <input type="submit" value="Log in">
    </form>

    <p>{{ token }}</p>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return{
      email: null,
      password: null,

      token: '',

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
      })
      
    },

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

