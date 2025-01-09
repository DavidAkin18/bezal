<template>
  <div class="bg-white shadow-lg fixed z-50 top-0 w-full border
     border-b-blue-400 p-4 px-12 flex items-center justify-between">
    <!-- Left: Logo -->
    <router-link to="/home">
      <div class="flex items-center space-x-2">
        <img src="../assets/images/bezal.png" alt="Logo" class="h-8" />
      </div>
    </router-link>
    <!-- Center: Search Bar -->
    <div class="hidden lg:flex items-center bg-gray-100 rounded-lg w-3/5 border-4 px-4 py-2 mx-4">
      <i class="ri-search-line text-gray-500"></i>
      <input
        type="text"
        placeholder="Search"
        class="bg-transparent flex-1 focus:outline-none px-2 text-gray-700"
      />
    </div>
    
   
    <!-- Right: Icons and Profile -->
    <div class="flex items-center space-x-4">
      <!-- Dark Mode Toggle -->
      <div class="cursor-pointer" @click="toggleDarkMode">
        <i
          class="ri-lightbulb-fill text-2xl"
          :class="{'text-yellow-400': !darkMode, 'text-gray-400': darkMode}"
        ></i>
      </div>
      <div class="flex items-center space-x-2 cursor-pointer">
        <router-link to="/profile">
          <img
            :src="profile.profilePicture || 'default-avatar.jpg'"
            alt="User Avatar"
            class="w-8 h-8 rounded-full"
          />
        </router-link>
        <span class="hidden lg:block text-gray-700 font-medium">@{{ profile.username || 'Guest' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      profile: (state) => state.profile,
      darkMode() {
        return this.$store.getters.darkMode; // Access the darkMode state from Vuex
      },
    }),
  },
  methods: {
    toggleDarkMode() {
      this.$store.dispatch('toggleDarkMode'); // Dispatch the action to toggle dark mode in Vuex
    },
  },
  watch: {
    darkMode(newValue) {
      const html = document.documentElement;
      if (newValue) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    },
  },
  mounted() {
    // Sync with localStorage on mount to initialize dark mode state
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      this.$store.commit('toggleDarkMode'); // Sync Vuex state if dark mode was enabled in localStorage
    }
  },
};
</script>

<style scoped>
/* Default light mode styles */
body {
  background-color: white;
  color: black;
}

/* Dark mode styles */
body.dark {
  background-color: #15202b;
  color: #e1e8ed;
}

.dark .bg-white {
  background-color: #1c1f26;
}

.dark .text-gray-700 {
  color: #e1e8ed;
}

.dark .text-gray-400 {
  color: #8899a6;
}
</style>
