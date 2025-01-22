<template>
  <div 
    class="fixed border-l-0 mt-16 text-gray-500 border border-r-blue-400 bg-white min-h-screen shadow-md"
    :class="{ ' border-r-white': theme === 'dark' }"
    >
    <nav class="space-y-4  rounded-lg flex flex-col items-start px-6 pt-8">
      <!-- Home -->
      <router-link 
        to="/home" 
        class="flex items-center space-x-4 px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'active-page': $route.path === '/home' }">
        <i class="ri-home-4-line text-xl"></i>
        <span class="font-bold">Home</span>
      </router-link>

      <!-- Explore -->
      <div @click="handleSearch"
        to="/explore" 
        class="flex items-center space-x-4 px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
        <i class="ri-search-line text-xl"></i>
        <span class="font-medium">Explore</span>
    </div>

      <!-- Notifications -->
      <router-link 
        to="/notifications" 
        class="flex items-center space-x-4 px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'active-page': $route.path === '/notifications' }">
        <i class="ri-notification-3-line text-xl"></i>
        <span class="font-medium">Notifications</span>
      </router-link>

      <!-- Messages -->
      <router-link 
        to="/messages" 
        class="flex items-center space-x-4 px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'active-page': $route.path === '/messages' }">
        <i class="ri-message-3-line text-xl"></i>
        <span class="font-medium">Messages</span>
      </router-link>

      <!-- Communities -->
      <router-link 
        to="/communities" 
        class="flex items-center space-x-4 px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'active-page': $route.path === '/communities' }">
        <i class="ri-group-line text-xl"></i>
        <span class="font-medium">Communities</span>
      </router-link>

      <!-- Profile -->
      <router-link 
        to="/profile" 
        class="flex items-center space-x-4 px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'active-page': $route.path === '/profile' }">
        <i class="ri-user-line text-xl"></i>
        <span class="font-medium">Profile</span>
      </router-link>

      <!-- More -->
      <router-link 
        to="/more" 
        class="flex items-center space-x-4 px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'active-page': $route.path === '/more' }">
        <i class="ri-more-2-line text-xl"></i>
        <span class="font-medium">More</span>
      </router-link>

      <!-- Post Button -->
      <button class="mt-4 bg-gray-800 text-white font-semibold py-3 rounded-full w-11/12 hover:bg-gray-700 dark:bg-[#2d3748] dark:bg-gray-600">
        Post
      </button>

      <!-- User Info -->
      <div class="flex  items-center mt-auto space-x-4 w-full py-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-4">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          class="w-10 h-10 rounded-full"
        />
        <div class="">
          <div class="font-bold dark:text-white text-gray-700">He is DayoAkin</div>
          <div class="text-sm dark:text-gray-200 text-gray-500">@Davidakindosu</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    theme: {
      type: String,
      required: true,
    },
    search:{
      type: Boolean,
      required:true
    }
  },
  setup(props, {emit}) {
    const store = useStore();
    const handleSearch = () => {
      emit('toggle-search')
    }

    return {
      handleSearch
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

.dark .bg-white {
  background-color: #2d3748; /* Dark mode container background */
}

.dark .hover\\:bg-gray-100:hover {
  background-color: #4a5568; /* Hover color in dark mode */
}

.dark .text-gray-500 {
  color: #e2e8f0; /* Light text in dark mode */
}

.dark .text-gray-700 {
  color: #edf2f7; /* Text for headings in dark mode */
}
</style>
