<template>
    <div class="fixed bottom-0 left-0 w-full bg-white shadow-lg lg:hidden">
      <!-- Button Bar for Mobile Sidebar -->
      <div class="flex justify-around p-2">
        <!-- Home Button -->
        <div class="flex flex-col items-center cursor-pointer" @click="navigateToHome">
          <i class="ri-home-5-fill text-2xl text-[#4385F5]"></i>
        </div>
  
        <!-- Message Button -->
        <div class="flex flex-col items-center cursor-pointer" @click="navigateToMessages">
          <i class="ri-mail-fill text-2xl text-[#AAAAAA]"></i>

        </div>
  
        <!-- Notification Button -->
        <div class="flex flex-col items-center cursor-pointer" @click="navigateToNotifications">
          <i class="ri-notification-2-fill text-2xl text-[#AAAAAA]"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
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
        navigateToNotifications
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  