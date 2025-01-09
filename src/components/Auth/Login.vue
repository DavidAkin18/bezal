<template>
  <div class="login flex flex-col lg:flex-row items-center gap-8 lg:justify-center min-h-screen lg:bg-[#E5E5E5]">
    <!-- Black Section -->
    <DarkPart />

    <!-- Form Section -->
    <div class="bg-white w-full md:w-3/4 lg:w-2/4 mx-auto p-4 md:p-12 md:shadow-md md:rounded-lg">
      <h2 class="text-2xl font-bold mb-6">Login</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="akindayodavid@gmail.com"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <!-- Password Input -->
        <div class="relative">
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Password*
          </label>
         <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'" 
            id="password"
            placeholder="password"
            v-model="password"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
          <!-- Eye icon to toggle password visibility -->
          <span>
            <i
            :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            @click="togglePasswordVisibility"
          ></i>
          </span>
         </div>
          <p v-if="passwordError" class="text-red-500 text-sm mt-2">
            Password must include at least 1 uppercase letter, 1 number, and 1 special symbol.
          </p>
        </div>

        <!-- Forgot Password -->
        <router-link to="/reset" class="text-blue-500 text-sm font-bold hover:underline inline-block">
          Forgot your Password?
        </router-link>

        <!-- Actions -->
        <div class="flex items-center gap-4 mt-4">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-200"
          >
            Log In
          </button>
          <p class="text-sm text-gray-500">
            <router-link to="/" class="text-blue-500 hover:underline">Sign Up</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, ref } from 'vue';
import DarkPart from './DarkPart.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { DarkPart },
  setup() {
    const email = ref('');
    const password = ref('');
    const passwordError = ref(false);
    const showPassword = ref(false); // Add a ref for toggling password visibility
    const router = useRouter();

    const validatePassword = (password: string) => {
      // Ensure password includes at least one capital letter, number, and symbol
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+-])[A-Za-z\d@$!%*?&#+-]{8,}$/;
      return regex.test(password);
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value; // Toggle password visibility
    };

    const handleSubmit = () => {
      if (email.value && password.value) {
        if (validatePassword(password.value)) {
          // If all conditions are met, redirect to /reset
          router.push('/home');
        } else {
          // Show password error
          passwordError.value = true;
        }
      } else {
        // Optionally, add additional validation messages for empty fields
        alert('Please fill out all fields.');
      }
    };

    return {
      email,
      password,
      passwordError,
      showPassword,  // Add this to return the visibility state
      togglePasswordVisibility,  // Add this to toggle visibility
      handleSubmit,
    };
  },
});
</script>


<style scoped>
@media (max-width: 768px) {
  /* Adjust mobile view */
  .login {
    flex-direction: column; /* Stack items vertically on mobile */
  }
  .bg-black {
    width: 100%; /* Full width on mobile */
  }
}
</style>
