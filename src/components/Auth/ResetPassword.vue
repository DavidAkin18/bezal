<template>
  <div class="dark-part flex flex-col lg:flex-row items-center gap-8 lg:gap-0 lg:justify-center min-h-screen lg:bg-gray-200">
    <!-- Black Section -->
    <DarkPart />
    <div class="min-h-screen w-full md:w-3/4 p-2 relative">
        <div class="text-right lg:px-6 lg:py-2 bg-white w-full absolute top-0 left-0">
            <router-link to="/">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-14 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-200 text-right ">
               Join
                </button>
            </router-link>
        </div>
        <div class="bg-white w-full lg:w-4/6 mx-auto lg:mt-20 p-4 lg:py-20 space-y-2  lg:p-12 md:shadow-lg md:rounded-xl">
            <h2 class="font-bold text-2xl" >Reset Your Password</h2>
            <p class="text-gray-700 text-sm">To request a new password, enter your email </p>
            <form action="" @submit.prevent="passwordSuccessful" class="space-y-6 w-full" >
                <div>
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
                        Enter email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="Your email address"
                        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <p class="text-red-400">{{ emailError }}</p>
                </div>
                <div class="w-full text-left">
                    <button type="submit"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-200 text-right ">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>





<script lang="ts">

import { defineComponent, ref } from 'vue';
import DarkPart from './DarkPart.vue';
import { useRouter } from 'vue-router';
import {  Router } from 'vue-router';
export default defineComponent({
    components:{DarkPart},
    setup() {

        const router: Router = useRouter();
        const email = ref('');
        const emailError = ref('');

        const  passwordSuccessful = () =>{
            if(email.value.trim() === ''){
                emailError.value = 'Please enter a valid email address'
            }else{
                emailError.value = ''
                router.push('/completeLogin')
            }
        }

        return {
            email,
            emailError,
            passwordSuccessful,
        }

       
    },
})
</script>

<style>

</style>