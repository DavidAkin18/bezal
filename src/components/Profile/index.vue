<template>
  <div :class="{ 'dark': darkMode }" class="flex w-full flex-col min-h-screen bg-white dark:bg-[#2d3748] lg:bg-[#E5E5E5] dark:lg:bg-[#181818]">
    <!-- Navbar -->
    <Navbar />

    <div  class="flex pb-2 flex-col md:flex-row gap-2">
      <!-- Mobile Sidebar -->
      <div class="md:hidden">
        <MobileSidebar />
      </div>

      <!-- Medium Sidebar -->
      <div class="hidden md:block lg:hidden">
        <MediumSideBar />
      </div>

      <!-- Sidebar for Large Screens -->
      <div class="hidden w-3/6 border border-red-300 lg:block">
        <Sidebar class="w-1/4"/>
      </div>

      <!-- Main Content -->
      <div :class="{'bg-white': !darkMode, 'bg-gray-900': darkMode}" 
        class="w-full  mt-16 md:m-24 lg:m-0 lg:mt-24 ">
        <ProfileDetails />
        <ProfileDashboard />
      </div>

      <!-- Trending and Friend Suggestions -->
      <div :class="{'bg-white': !darkMode, 'bg-gray-900': darkMode}" 
        class="w-full lg:w-2/4 mt-24 space-y-4 hidden pr-4 lg:block">
        <Trending />
        <FriendSuggestions />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
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
  setup() {
    const store = useStore();

    // Computed property for dark mode
    const darkMode = computed(() => store.state.darkMode);

    return {
      darkMode,
    };
  },
};
</script>

<style scoped>
/* Transitions for smooth mode switching */
html {
  transition: background-color 0.5s ease, color 0.5s ease;
}

body {
  background-color: #ffffff;
  color: #2d3748;
}

/* Dark Mode Adjustments */
.dark {
  background-color: #2d3748;
  color: #ffffff;
}

.dark .text-white {
  color: #ffffff;
}

.dark .text-gray-500 {
  color: #e2e8f0;
}

.dark .bg-white {
  background-color: #2d3748;
}

.dark .bg-[#E5E5E5] {
  background-color: #181818;
}

.dark .border {
  border-color: #ffffff;
}

.dark .hover\\:bg-gray-100:hover {
  background-color: #4a5568;
}

/* Navbar Adjustments */
.dark .navbar {
  background-color: #181818;
  color: #ffffff;
}

/* Sidebars */
.dark .sidebar {
  background-color: #181818;
  color: #ffffff;
}

.dark .sidebar .menu-item:hover {
  background-color: #2a2a2a;
}

.dark .sidebar .menu-item {
  border-bottom: 1px solid #ffffff;
}

/* Profile Section */
.dark .profile-details {
  background-color: #2f2f2f;
  color: #ffffff;
}

.dark .profile-dashboard {
  background-color: #1f1f1f;
  border-color: #ffffff;
}

/* Post Button Adjustments */
.dark .bg-gray-800 {
  background-color: #2d3748;
}

.dark .hover\\:bg-gray-700:hover {
  background-color: #3a3a3a;
}

/* Cards and Content */
.dark .card {
  background-color: #1f1f1f;
  border-color: #ffffff;
}

.dark .shadow-lg {
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
}

/* Text Fields */
.dark .bg-gray-700 {
  background-color: #2f2f2f;
  color: white;
  border-color: #fff;
}

.dark .focus\\:outline-none:focus {
  outline-color: #ffffff;
}

.dark .focus\\:ring:focus {
  ring-color: #ffffff;
}
</style>
