<template>
  <div 
    class="fixed z-50 top-0 w-full border p-4 px-12 flex items-center justify-between shadow-md"
    :class="{
      'bg-white text-gray-800 border-b-blue-400': theme !== 'dark',
      'bg-[#15202b] text-gray-100 border-0 border-b border-b-white': theme === 'dark'
    }"
  >
    <!-- Left: Logo -->
    <router-link to="/home">
      <div class="flex items-center space-x-2">
        <img src="../assets/images/bezal.png" alt="Logo" class="h-8" />
      </div>
    </router-link>

    <!-- Center: Search Bar -->
    <div 
      v-if="search"
      class="hidden lg:flex items-center rounded-lg w-3/5 px-4 py-2 mx-4"
      :class="{
        'bg-gray-100 text-gray-700': theme !== 'dark',
        'bg-gray-700 text-gray-300': theme === 'dark'
      }"
    >
      <i class="ri-search-line" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'"></i>
      <input
        type="text"
        placeholder="Search"
        class="bg-transparent flex-1 focus:outline-none px-2"
        :class="{
          'text-gray-700': theme !== 'dark',
          'text-white': theme === 'dark'
        }"
      />
    </div>

    <!-- Right: Icons and Profile -->
    <div class="flex items-center space-x-4">
      <!-- Dark Mode Toggle -->
      <div
        class="cursor-pointer transition-colors duration-300"
        @click="handleToggleTheme"
        :class="theme === 'dark' ? 'text-yellow-400' : 'text-gray-400'"
      >
        <i v-if="theme === 'dark'" class="ri-sun-fill text-lg"></i>
        <i v-else class="ri-moon-fill text-lg"></i>
      </div>

      <!-- Profile Section -->
      <div class="flex items-center space-x-2 cursor-pointer">
        <router-link to="/profile">
          <img
            :src="profile.profilePicture || 'default-avatar.jpg'"
            alt="User Avatar"
            class="w-8 h-8 rounded-full"
          />
        </router-link>
        <span
          class="hidden lg:block font-bold"
          :class="{
            'text-gray-700': theme !== 'dark',
            'text-white': theme === 'dark'
          }"
        >
          @{{ profile.username || 'Guest' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    theme: {
      type: String,
      required: true,
    },
    search: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleToggleTheme() {
      console.log('Theme toggle button clicked. Current theme:', this.theme);
      this.$emit('toggle-theme');
    },
  },
  computed: {
    ...mapState({
      profile: (state) => state.profile,
    }),
  },
  watch: {
    theme(newTheme) {
      console.log("Navbar.vue - theme prop changed:", newTheme);
    },
  },
};
</script>

<style scoped>
/* All styling handled by Tailwind */
</style>
