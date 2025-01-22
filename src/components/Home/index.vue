<template>
  <div :class="{ 'dark': theme === 'dark' }" class="min-h-screen " 
  >
    <!-- Navbar -->
    <Navbar :theme="theme" @toggle-theme="handleToggleTheme" />

    <div class="flex pb-2 flex-col md:flex-row gap-4">
      <!-- Mobile Sidebar -->
      <div class="md:hidden">
        <MobileSidebar :theme="theme" />
      </div>

      <!-- Medium Sidebar -->
      <div class="hidden md:block lg:hidden">
        <MediumSideBar :theme="theme" />
      </div>

      <!-- Sidebar for Large Screens -->
      <div class="hidden w-3/6 lg:block border-red-500 ">
        <Sidebar :theme="theme" class="w-1/4" />
      </div>

      <div
        :class="{
          'bg-[#ffffff] text-[#000000]': theme === 'light',
          'bg-[#15202b] text-[#e1e8ed]': theme === 'dark'
        }"
        class="w-full mt-16 md:m-24 lg:m-0  lg:mt-20"
      >
        <ParentPost :theme="theme" />
      </div>

      <!-- Trending and Friend Suggestions -->
      <div
        :class="{
          'bg-[#ffffff] text-[#000000]': theme === 'light',
          'bg-[#15202b] text-[#e1e8ed]': theme === 'dark'
        }"
        class="w-full lg:w-2/4 mt-20 space-y-4 hidden pr-4 lg:block"
      >
        <Trending :theme="theme" />
        <FriendSuggestions :theme="theme" />
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
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  components: {
    Sidebar,
    ParentPost,
    Trending,
    FriendSuggestions,
    Navbar,
    MobileSidebar,
    MediumSideBar,
  },
  methods: {
    handleToggleTheme() {
      console.log("Theme toggle button clicked. Current theme:", this.theme);
      this.$emit("toggle-theme");
    },
  },
};
</script>

<style scoped>
/* For any non-Tailwind adjustments */
</style>
