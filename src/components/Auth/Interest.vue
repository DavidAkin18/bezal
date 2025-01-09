<template>
  <div class="w-full  lg:bg-[#E5E5E5] lg:min-h-screen flex items-center justify-center">
    <div class="w-full lg:w-4/6  min-h-96 flex-col items-center rounded-lg justify-center p-6 bg-white lg:shadow-lg">
      <!-- Title -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold">Choose Your Interest</h1>
        <p class="text-gray-600 text-sm">Choose which you have more interest in to give you the best experience.</p>
      </div>

      <!-- Interest Buttons -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 w-full max-w-2xl">
        <button
          v-for="interest in interests"
          :key="interest"
          :class="{
            'bg-blue-500 text-white': selectedInterests.includes(interest),
            'bg-white text-gray-800 ': !selectedInterests.includes(interest)
          }"
          class="shadow-lg p-2 rounded-xl w-full  hover:shadow-md hover:cursor-pointer transition-all"
          @click="toggleInterest(interest)"
        >
          {{ interest }}
        </button>
      </div>

      <!-- Selected Interests -->
      <div v-if="selectedInterests.length > 0" class="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <p class="text-gray-700 font-semibold mb-2">Selected Interests:</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="selected in selectedInterests"
            :key="selected"
            class="flex items-center bg-blue-500 text-white py-1 px-3 rounded-full shadow cursor-pointer"
          >
            {{ selected }}
            <i
              class="ri-close-line ml-2 hover:text-gray-200 cursor-pointer"
              @click="removeInterest(selected)"
            ></i>
          </div>
        </div>
      </div>

      <!-- Log In Button -->
     <div class="text-right">
        <button
          class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded"
          @click="logIn"
        >
          Log in
        </button>
     </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {  Router } from 'vue-router';

export default defineComponent({
  setup() {

    const router: Router = useRouter();

    const interests = ref([
    'Stock Market',
      'Web Development',
      'Arts & Music',
      'UI/UX Design',
      'Cryptocurrency',
      'Health',
      'Business',
      'Photography',
      'Backend Development',
      'Metaverse',
      'NFTs',
      'Blockchain',
    ])

    const selectedInterests = ref<string[]>([])

    const toggleInterest=(interest:string) => {
      if(selectedInterests.value.includes(interest)){
        selectedInterests.value = selectedInterests.value.filter((item) => item !== interest);
      } else {
        selectedInterests.value.push(interest);
      }
    }
    const removeInterest = (interest:string) => {
      selectedInterests.value = selectedInterests.value.filter((item) => item !== interest);
    }
    const logIn = () => {
      if (selectedInterests.value.length === 0) {
        alert('Please select at least one interest before proceeding.');
        return;  // Do not proceed to the next page if no interests are selected
      }
      router.push('/login')
    };
    return{
      interests,
      selectedInterests,
      toggleInterest,
      removeInterest,
      logIn
    }
  },
})
</script>
