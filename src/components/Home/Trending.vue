<template>
  <div :class="{ 'dark': theme === 'dark' }" class="space-y-4">
    <!-- Trending Section -->
    <div
      :class="theme === 'dark' ? 'bg-[#2d3748] text-[#e2e8f0]' : 'bg-[#f7fafc] text-[#1a202c]'"
      class="p-4 rounded-lg shadow"
    >
      <h3
        :class="theme === 'dark' ? 'text-[#ffffff]' : 'text-[#1a202c]'"
        class="font-bold text-lg"
      >
        Trending
      </h3>
      <ul class="mt-4 space-y-2">
        <li
          v-for="topic in trendingTopics"
          :key="topic.id"
          class="flex justify-between"
        >
          <span
            :class="theme === 'dark' ? 'text-[#e2e8f0]' : 'text-[#1a202c]'"
          >
            #{{ topic.name }}
          </span>
          <span
            :class="theme === 'dark' ? 'text-[#a0aec0]' : 'text-[#718096]'"
          >
            {{ topic.posts }} posts
          </span>
        </li>
      </ul>
    </div>

    <!-- Explore Section -->
    <div
      :class="theme === 'dark' ? 'bg-[#2d3748] text-[#e2e8f0]' : 'bg-[#f7fafc] text-[#1a202c]'"
      class="mt-8 space-y-4 shadow rounded-lg p-4 flex flex-col items-start"
    >
      <h3
        :class="theme === 'dark' ? 'text-[#ffffff]' : 'text-[#1a202c]'"
        class="font-bold"
      >
        Explore
      </h3>
      <div
        class="flex items-center space-x-2 cursor-pointer"
        :class="theme === 'dark' ? 'text-[#a0aec0] hover:text-[#e2e8f0]' : 'text-[#718096] hover:text-[#1a202c]'"
      >
        <i class="ri-store-line"></i>
        <span>Marketplace</span>
      </div>
      <div
        class="flex items-center space-x-2 cursor-pointer"
        :class="theme === 'dark' ? 'text-[#a0aec0] hover:text-[#e2e8f0]' : 'text-[#718096] hover:text-[#1a202c]'"
      >
        <i class="ri-wallet-line"></i>
        <span>Wallet</span>
      </div>
      <div
        class="flex items-center space-x-2 cursor-pointer"
        :class="theme === 'dark' ? 'text-[#a0aec0] hover:text-[#e2e8f0]' : 'text-[#718096] hover:text-[#1a202c]'"
      >
        <i class="ri-briefcase-line"></i>
        <span>Jobs</span>
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
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Custom Tailwind-like adjustments if needed */
</style>
