<template>
    <div class="list">
        <div v-for="entry in entry" :key="entry.id">

            <p>{{ entry.cost }}</p>

        </div>
    </div>
</template>

<script>
import axiosInstance from '/src/main.js'
export default {
    name:'List',
    data () {
        return {
            entry: []
        }
    },
    created() {
        axiosInstance.get(
            'http://localhost:8000/journal/'
        ) .then(response => {
            this.entry = response.data
        }) .catch(err => {
            console.log(err)
        })
        
   
    }
}
</script>
