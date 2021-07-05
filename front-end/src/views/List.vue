<template>
    <div class="list">
        <div v-for="entry in entry" :key="entry.id">

            <p>{{ entry.cost }}</p>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'List',
    data () {
        return {
            entry: []
        }
    },

    async created() {
        axios({
        method: 'GET',
        url: 'http://localhost:8000/journal/',
        headers: {'Authorization': `Token ${this.$store.state.token}`},
        
      }).then(response =>{

          this.entry = response.data


        
      })
    }
}
</script>