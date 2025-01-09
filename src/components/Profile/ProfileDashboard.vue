<template>
  <div :class="{ 'dark': darkMode }" class="w-full flex justify-center items-center py-4 bg-white dark:bg-[#2d3748]">
    <div class="w-full max-w-4xl">
      <div class="flex bg-white dark:bg-gray-800 shadow-xl p-3 rounded-2xl justify-between gap-3 overflow-x-auto mb-6">
        <button
          v-for="filter in filters"
          :key="filter.id"
          @click="setFilter(filter.type)"
          class="bg-[#FAFAFA] dark:bg-[#2d3748] text-gray-600 dark:text-[#ffffff] hover:bg-gray-300 dark:hover:bg-[#4a5568] font-medium py-1 px-2 rounded transition"
          :class="{
            'bg-blue-600 text-white': currentFilter === filter.type, 
            'dark:bg-blue-600': currentFilter === filter.type
          }"
        >
          {{ filter.label }}
        </button>
      </div>

      <div v-if="filteredPosts.length">
        <div v-for="post in filteredPosts" :key="post.id" class="mb-6">
          <PostItem :post="post" @deletePost="handleDeletePost" />
        </div>
      </div>
      <div v-else class="text-gray-600 dark:text-[#ffffff] text-center py-4">
        <p>No posts available for this filter.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import PostItem from '../Home/PostItem.vue';

export default defineComponent({
  components: {
    PostItem,
  },
  setup() {
    const store = useStore();

    // Filters for the button selection
    const filters = ref([
      { id: 1, type: 'all', label: 'Timeline' },
      { id: 2, type: 'image', label: 'Photo' },
      { id: 3, type: 'video', label: 'Video' },
      { id: 4, type: 'interest', label: 'Interest' },
      { id: 5, type: 'tagged', label: 'Tagged' },
    ]);

    // Reactive current filter, fetched from localStorage (if available)
    const currentFilter = ref(localStorage.getItem('currentFilter') || 'all');

    // Computed filtered posts based on the current filter
    const filteredPosts = computed(() => store.getters.filteredPosts);

    // Reactive dark mode state from Vuex store
    const darkMode = computed(() => store.state.darkMode);

    // Set the filter when a user selects one
    const setFilter = (filter: string) => {
      currentFilter.value = filter;
      localStorage.setItem('currentFilter', filter);
      store.dispatch('setFilter', filter); // Update Vuex store filter
    };

    // Delete post by dispatching the deletePost action in Vuex
    const deletePost = (postId: number) => {
      store.dispatch("deletePost", postId); // Dispatch the deletePost action in Vuex
    };

    // Handle delete post from the PostItem component
    const handleDeletePost = (postId: number) => {
      deletePost(postId); // Call deletePost action with postId
    };

    // On mounted, fetch posts from Vuex
    onMounted(() => {
      store.dispatch('fetchPosts'); // Fetch posts when the component mounts
    });

    return {
      filters,
      currentFilter,
      filteredPosts,
      setFilter,
      handleDeletePost,
      darkMode,
    };
  },
});
</script>

<style scoped>
/* Base Transition */
button {
  transition: background-color 0.3s, color 0.3s;
}

/* Active Filter */
button.bg-blue-600 {
  background-color: #3b82f6; /* Blue for active */
  color: white;
}

/* Hover Effect */
button:hover.bg-[#FAFAFA]:not(.bg-blue-600) {
  background-color: #e5e7eb;
}

/* Light Mode Adjustments */
.bg-[#FAFAFA] {
  background-color: #f9fafb;
}

/* Dark Mode Styles */
.dark {
  background-color: #2d3748;
  color: #ffffff;
}

.dark .bg-[#2d3748] {
  background-color: #2d3748;
}

.dark .text-[#ffffff] {
  color: #ffffff;
}

.dark .hover\:bg-[#4a5568]:hover {
  background-color: #4a5568;
}

.dark .bg-blue-600 {
  background-color: #3b82f6; /* Active button blue in dark mode */
}

.dark .text-gray-600 {
  color: #ffffff;
}
</style>
