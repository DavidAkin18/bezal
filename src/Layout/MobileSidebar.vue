<template>
  <div :class="{'bg-white': theme !== 'dark', 'dark:bg-gray-800': theme === 'dark'}" class="fixed bottom-0 left-0 w-full shadow-lg lg:hidden">
    <!-- Button Bar for Mobile Sidebar -->
    <div class="flex justify-around p-2">
      <!-- Home Button -->
      <div class="flex flex-col items-center cursor-pointer" @click="navigateToHome">
        <i :class="{'text-[#4385F5]': theme !== 'dark', 'dark:text-[#4FC3F7]': theme === 'dark'}" class="ri-home-5-fill text-2xl"></i>
      </div>

      <!-- Message Button -->
      <div class="flex flex-col items-center cursor-pointer" @click="navigateToMessages">
        <i :class="{'text-[#AAAAAA]': theme !== 'dark', 'dark:text-gray-400': theme === 'dark'}" class="ri-mail-fill text-2xl"></i>
      </div>

      <!-- Notification Button -->
      <div class="flex flex-col items-center cursor-pointer" @click="navigateToNotifications">
        <i :class="{'text-[#AAAAAA]': theme !== 'dark', 'dark:text-gray-400': theme === 'dark'}" class="ri-notification-2-fill text-2xl"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const navigateToHome = () => {
      router.push('/home'); // Adjust based on your route
    };

    const navigateToMessages = () => {
      router.push('/messages'); // Adjust based on your route
    };

    const navigateToNotifications = () => {
      router.push('/notifications'); // Adjust based on your route
    };

    return {
      navigateToHome,
      navigateToMessages,
      navigateToNotifications,
    };
  },
};
</script>

<style scoped>
/* No custom CSS, using Tailwind for everything */
</style>
