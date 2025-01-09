<template>
  <div class="auths">
    <Login />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import Login from '@/components/Auth/Login.vue';
import SignUp from '@/components/Auth/SignUp.vue';

export default defineComponent({
    components:{
        Login,
        SignUp
    },
    setup() {
        
    },
})
</script>

<style>

</style>
