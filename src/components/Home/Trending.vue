<template>
  <div :class="{ 'dark': darkMode }" class="space-y-4">
    <!-- Trending Section -->
    <div :class="{'bg-white': !darkMode, 'bg-gray-800': darkMode}" class="p-4 rounded-lg shadow">
      <h3 :class="{'text-gray-700': !darkMode, 'text-gray-100': darkMode}" class="font-bold text-lg">Trending</h3>
      <ul class="mt-4 space-y-2">
        <li v-for="topic in trendingTopics" :key="topic.id" class="flex justify-between">
          <span :class="{'text-gray-700': !darkMode, 'text-gray-100': darkMode}">#{{ topic.name }}</span>
          <span :class="{'text-gray-500': !darkMode, 'text-gray-200': darkMode}">{{ topic.posts }} posts</span>
        </li>
      </ul>
    </div>

    <!-- Explore Section -->
    <div :class="{'bg-white': !darkMode, 'bg-gray-800': darkMode}" class="mt-8 space-y-4 shadow-lg rounded-lg p-4 flex flex-col items-start">
      <h3 :class="{'text-gray-700': !darkMode, 'text-gray-300': darkMode}" class="font-bold">Explore</h3>
      <div class="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
        <i class="ri-store-line"></i>
        <span :class="{'text-gray-700': !darkMode, 'text-gray-300': darkMode}">Marketplace</span>
      </div>
      <div class="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
        <i class="ri-wallet-line"></i>
        <span :class="{'text-gray-700': !darkMode, 'text-gray-300': darkMode}">Wallet</span>
      </div>
      <div class="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
        <i class="ri-briefcase-line"></i>
        <span :class="{'text-gray-700': !darkMode, 'text-gray-300': darkMode}">Jobs</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trendingTopics: [
        { id: 1, name: "Ukraine", posts: 345 },
        { id: 2, name: "Metaverse", posts: 200 },
      ],
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
  },
};
</script>

<style scoped>
.dark .bg-white {
  background-color: #2d3748; /* Dark background for white elements */
}

.dark .text-gray-700 {
  color: #e2e8f0; /* Light gray text for dark mode */
}

.dark .text-gray-500 {
  color: #a0aec0; /* Adjust gray text color */
}

.dark .text-gray-300 {
  color: #cbd5e0; /* Lighter gray text for dark mode */
}

.dark .text-gray-400 {
  color: #e2e8f0; /* Lighter gray for dark mode posts count */
}

.dark .shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adjust shadow for dark mode */
}
</style>
