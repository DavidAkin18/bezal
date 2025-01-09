<template>
  <div class="login flex flex-col lg:flex-row items-center gap-8 lg:justify-center min-h-screen bg-[#E5E5E5]">
    <!-- Black Section -->
    <DarkPart />

    <!-- Form Section -->
    <div class="bg-white w-full md:w-3/4 lg:w-2/4 mx-auto p-6 md:p-12 md:shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-6">Sign Up</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            Email*
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Your Email Address"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-2">
            Please enter a valid email address.
          </p>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
            Password*
          </label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              @input="passwordTime = true"
            />
            <!-- Eye Icon -->
            <span
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <i v-if="showPassword" class="ri-eye-line text-xl"></i>
              <i v-else class="ri-eye-off-line text-xl"></i>
            </span>
          </div>
          <!-- Password Validation List -->
          <ul class="mt-2 text-sm" v-if="passwordTime">
            <li
              :class="{ 'text-green-500': hasUppercase, 'text-gray-500': !hasUppercase }"
            >
              <span v-if="hasUppercase">✔</span>
              <span v-else>✗</span> At least 1 uppercase letter
            </li>
            <li
              :class="{ 'text-green-500': hasNumber, 'text-gray-500': !hasNumber }"
            >
              <span v-if="hasNumber">✔</span>
              <span v-else>✗</span> At least 1 number
            </li>
            <li
              :class="{ 'text-green-500': hasSymbol, 'text-gray-500': !hasSymbol }"
            >
              <span v-if="hasSymbol">✔</span>
              <span v-else>✗</span> At least 1 special character
            </li>
            <li
              :class="{ 'text-green-500': isLongEnough, 'text-gray-500': !isLongEnough }"
            >
              <span v-if="isLongEnough">✔</span>
              <span v-else>✗</span> Minimum 6 characters
            </li>
          </ul>
        </div>

        <!-- Repeat Password Input -->
        <div>
          <label for="repeat-password" class="block text-gray-700 text-sm font-bold mb-2">
            Repeat Password*
          </label>
          <div class="relative">
            <input
              :type="showRepeatPassword ? 'text' : 'password'"
              id="repeat-password"
              v-model="repeatPassword"
              placeholder="Repeat your password"
              class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            <!-- Eye Icon -->
            <span
              @click="toggleRepeatPasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <i v-if="showRepeatPassword" class="ri-eye-line text-xl"></i>
              <i v-else class="ri-eye-off-line text-xl"></i>
            </span>
          </div>
          <p v-if="repeatPasswordError" class="text-red-500 text-sm mt-2">
            Passwords do not match.
          </p>
        </div>

        <!-- Terms Agreement -->
        <div class="flex items-center">
          <input
            type="checkbox"
            id="agree"
            v-model="agreeToTerms"
            class="mr-2"
          />
          <label for="agree" class="text-gray-700 text-sm">
            Agree to our <a href="#" class="text-blue-500 hover:underline">terms of service</a>.
          </label>
        </div>
        <p v-if="termsError" class="text-red-500 text-sm mt-2">
          You must agree to the terms of service.
        </p>

        <!-- Actions -->
        <div class="flex items-center gap-4 mt-4">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-200"
          >
            Sign Up
          </button>
          <p class="text-sm text-gray-500 flex items-center gap-4">
            <span class="text-xs hidden md:block">Already have an account?</span>
            <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import DarkPart from './DarkPart.vue';

export default defineComponent({
  components: { DarkPart },
  setup() {
    const email = ref('');
    const password = ref('');
    const repeatPassword = ref('');
    const agreeToTerms = ref(false);

    const emailError = ref(false);
    const repeatPasswordError = ref(false);
    const termsError = ref(false);

    const passwordTime = ref(false);

    const showPassword = ref(false);
    const showRepeatPassword = ref(false);

    const router = useRouter();

    // Password validation computed properties
    const hasUppercase = computed(() => /[A-Z]/.test(password.value));
    const hasNumber = computed(() => /\d/.test(password.value));
    const hasSymbol = computed(() => /[@$!%*?&#+-]/.test(password.value));
    const isLongEnough = computed(() => password.value.length >= 6);

    const allPasswordValid = computed(() => {
      return hasUppercase.value && hasNumber.value && hasSymbol.value && isLongEnough.value;
    });

    const handleSubmit = () => {
      emailError.value = !email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      repeatPasswordError.value = password.value !== repeatPassword.value;
      termsError.value = !agreeToTerms.value;

      // Only proceed if all conditions are met
      if (!emailError.value && allPasswordValid.value && !repeatPasswordError.value && !termsError.value) {
        router.push('/interest');
       
      }
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const toggleRepeatPasswordVisibility = () => {
      showRepeatPassword.value = !showRepeatPassword.value;
    };

    return {
      email,
      password,
      repeatPassword,
      agreeToTerms,

      emailError,
      repeatPasswordError,
      termsError,

      passwordTime,

      hasUppercase,
      hasNumber,
      hasSymbol,
      isLongEnough,
      allPasswordValid,
      showPassword,
      showRepeatPassword,

      togglePasswordVisibility,
      toggleRepeatPasswordVisibility,
      handleSubmit,
    };
  },
});
</script>

