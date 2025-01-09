<template>
  <div :class="{ 'dark': darkMode }" class="flex w-full flex-col min-h-screen">
    <!-- Navbar -->
    <Navbar />
  
    <div :class="{'bg-white': !darkMode, 'bg-gray-900': darkMode}" class="flex pb-2 flex-col md:flex-row flex-1">
    
      <div class="md:hidden">
        <!-- This will only be visible on mobile (smaller than 768px) -->
        <MobileSidebar />
      </div>

      <div class="hidden md:block lg:hidden">
        <!-- This will only be visible on medium screens (768px to 1023px) -->
        <MediumSideBar />
      </div>

      <div class="hidden w-3/6  lg:block">
        <!-- This will only be visible on large screens (1024px and up) -->
        <Sidebar class="w-1/4" />
      </div>

      <!-- Main Feed -->
      <div :class="{'bg-white': !darkMode, 'bg-gray-900': darkMode}" class="w-full px-2 mt-24 md:m-24 lg:m-0 lg:mt-24 lg:pr-4">
        <!-- Post Input -->
        <ParentPost />
      </div>

      <!-- Right Sidebar -->
      <div :class="{'bg-white': !darkMode, 'bg-gray-900': darkMode}" class="w-full lg:w-2/4 mt-24 space-y-4 hidden pr-4 lg:block">
        <Trending />
        <FriendSuggestions />
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from "@/Layout/Sidebar.vue";
  import MobileSidebar from "@/Layout/MobileSidebar.vue";
  import Trending from "./Trending.vue";
  import FriendSuggestions from "./FriendSuggestions.vue";
  import Navbar from "@/Layout/Navbar.vue";
  import MediumSideBar from "@/Layout/MediumSideBar.vue";
  import ParentPost from "./ParentPost.vue";

  export default {
    components: {
      Sidebar,
      ParentPost,
      Trending,
      FriendSuggestions,
      Navbar,
      MobileSidebar,
      MediumSideBar,
    },
    computed: {
      darkMode() {
        return this.$store.state.darkMode; // Access darkMode state from Vuex store
      },
    },
  };
</script>

<style scoped>
.dark .bg-white {
  background-color: #2d3748; /* Dark background for white elements */
}

.dark .bg-gray-900 {
  background-color: #2d3748; /* Dark background for sections */
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
.dark .border {
  border-color: #ffffff;
}
.dark .shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adjust shadow for dark mode */
}
</style>
