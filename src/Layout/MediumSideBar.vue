<template>
  <div 
    :class="{ dark: darkMode }" 
    class="fixed top-16 left-0 w-16 h-full border border-l-0  border-r-blue-400  bg-white
    shadow-md lg:flex flex-col justify-between hidden md:block">
    <!-- Sidebar Icons -->
    <div class="flex flex-col items-center space-y-8 p-4">
      <!-- Home Icon -->
      <div 
        class="cursor-pointer p-2 rounded-md"
        @click="navigateToHome"
        :class="{ 'active-page': $route.path === '/home' }">
        <i class="ri-home-line text-2xl"></i>
      </div>

      <!-- Message Icon -->
      <div 
        class="cursor-pointer p-2 rounded-md"
        @click="navigateToMessages"
        :class="{ 'active-page': $route.path === '/messages' }">
        <i class="ri-message-3-line text-2xl"></i>
      </div>

      <!-- Notification Icon -->
      <div 
        class="cursor-pointer p-2 rounded-md"
        @click="navigateToNotifications"
        :class="{ 'active-page': $route.path === '/notifications' }">
        <i class="ri-notification-3-line text-2xl"></i>
      </div>
    </div>

    <!-- Bottom or Other Actions (Optional) -->
    <div class="p-4">
      <!-- Logout Icon -->
      <div 
        class="cursor-pointer p-2 rounded-md"
        @click="logout">
        <i class="ri-logout-box-r-line text-2xl"
           :class="{'text-gray-700': !darkMode, 'text-white': darkMode}"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const darkMode = computed(() => store.state.darkMode);

    const navigateToHome = () => {
      router.push('/home'); // Adjust based on your route
    };

    const navigateToMessages = () => {
      router.push('/messages'); // Adjust based on your route
    };

    const navigateToNotifications = () => {
      router.push('/notifications'); // Adjust based on your route
    };

    const logout = () => {
      // Handle logout logic
      alert("Logging out!");
      router.push('/login'); // Redirect to login page
    };

    return {
      navigateToHome,
      navigateToMessages,
      navigateToNotifications,
      logout,
      darkMode,
    };
  },
};
</script>

<style scoped>
/* Active page styling */
.active-page {
  background-color: #e2e8f0; /* Light mode background for active page */
  color: #1a202c; /* Darker text for active page in light mode */
}

.dark .active-page {
  background-color: #4a5568; /* Dark mode background for active page */
  color: #ffffff; /* White text for active page in dark mode */
}

/* Add styles for dark mode */
.dark {
  background-color: #2d3748; /* Primary dark mode background color */
  color: #ffffff; /* Text color in dark mode */
}

.dark .text-gray-700 {
  color: #e2e8f0; /* Adjust text color for icons in dark mode */
}

.dark .hover\\:bg-gray-100:hover {
  background-color: #4a5568; /* Hover color in dark mode */
}

.sidebar {
  transition: transform 0.3s ease;
}
.sidebar.hidden {
  transform: translateX(-100%);
}
</style>
