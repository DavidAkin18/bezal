<template>
  <div :class="{ 'dark': theme === 'dark' }" class="min-h-screen " >
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
      <div class="hidden w-3/6 lg:block">
        <Sidebar :theme="theme" class="w-1/4" />
      </div>

      <!-- Main Content -->
      <div   :class="{
          'bg-[#ffffff] text-[#000000]': theme === 'light',
          'bg-[#15202b] text-[#e1e8ed]': theme === 'dark'
        }"
        class="w-full mt-12 md:m-24 lg:m-0  lg:mt-20">
        <ProfileDetails :theme="theme" />
        <ProfileDashboard :theme="theme" />
      </div>

      <!-- Trending and Friend Suggestions -->
      <div :class="{
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
import ProfileDashboard from "./ProfileDashboard.vue";
import MobileSidebar from "@/Layout/MobileSidebar.vue";
import Trending from "@/components/Home/Trending.vue";
import FriendSuggestions from "@/components/Home/FriendSuggestions.vue";
import Navbar from "@/Layout/Navbar.vue";
import MediumSideBar from "@/Layout/MediumSideBar.vue";
import ProfileDetails from "./ProfileDetails.vue";

export default {
  components: {
    Sidebar,
    ProfileDashboard,
    Trending,
    FriendSuggestions,
    Navbar,
    MobileSidebar,
    MediumSideBar,
    ProfileDetails,
  },
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleToggleTheme() {
      console.log("Theme toggle button clicked. Current theme:", this.theme);
      this.$emit("toggle-theme"); // Emit the event to the parent
    },
  },
};
</script>

<style scoped>
/* Removed scoped CSS as replaced with Tailwind utilities */
</style>
