<template>
  <div class="login">
    <p>fuck you</p>
    
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>