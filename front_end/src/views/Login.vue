<template>
  <div class="login">
    
     <v-form v-on:submit.prevent="submitForm" >
        <v-container>
          <p v-if="wrong_cred" class="red--text">Email or Password is Incorrect</p>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required></v-text-field>

          <v-text-field
            v-model="password"
            
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
          ></v-text-field>

          <v-btn
            
            color="#A5D6A7"
            class="mr-4"
            @click="submitForm"
          >
            Log In
          </v-btn>
    
        </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return{
      email: null,
       emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],

      show: false,
      password: null,
      rules: {
          required: value => !!value || 'Required.',
      },

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