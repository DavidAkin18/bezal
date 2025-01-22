<template>
    <div :class="{ 'dark': theme === 'dark' }" 
    >
      <!-- Navbar -->
      <Navbar :search="search" :theme="theme" @toggle-theme="handleToggleTheme"  />
  
      <div class="flex pb-2  flex-col md:flex-row gap-2">
        <!-- Mobile Sidebar -->
        <div class="md:hidden">
          <MobileSidebar :search="search" :theme="theme" @toggle-search="handleSearch" />
        </div>
  
        <!-- Medium Sidebar -->
        <div class="hidden md:block lg:hidden">
          <MediumSideBar :search="search" :theme="theme" @toggle-search="handleSearch" />
        </div>
  
        <!-- Sidebar for Large Screens -->
        <div class="hidden w-3/6 lg:block">
          <Sidebar :search="search" :theme="theme" @toggle-search="handleSearch" class="w-1/4" />
        </div>
  
        <!-- Main Content -->
        <div :class="{'bg-white': theme === 'light', 'bg-gray-900': theme === 'dark'}" 
            class="w-full mt-16 md:m-24 lg:m-0  lg:mt-20">
          <Notify :theme="theme" />
        </div>
  
        <!-- Trending and Friend Suggestions -->
        <div
          :class="{
            'bg-[#ffffff] text-[#000000]': theme === 'light',
            'bg-[#15202b] text-[#e1e8ed]': theme === 'dark'
          }"
          class="w-full lg:w-2/4 mt-24 space-y-4 hidden pr-4 lg:block"
        >
          <Trending :theme="theme" />
          <FriendSuggestions :theme="theme" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Notify from './Notify.vue';
  import Sidebar from "@/Layout/Sidebar.vue";
  import MobileSidebar from "@/Layout/MobileSidebar.vue";
  import Trending from "@/components/Home/Trending.vue";
  import FriendSuggestions from "@/components/Home/FriendSuggestions.vue";
  import Navbar from "@/Layout/Navbar.vue";
  import MediumSideBar from "@/Layout/MediumSideBar.vue";
  
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
    components: {
      Notify,
      Sidebar,
      Trending,
      FriendSuggestions,
      Navbar,
      MobileSidebar,
      MediumSideBar,
    },
    methods: {
      handleToggleTheme() {
        console.log('Theme toggle button clicked. Current theme:', this.theme);
        this.$emit('toggle-theme')
      },
      handleSearch(){
        this.$emit('toggle-search')
      }
    },
  };
  </script>
  
  <style>
  /* Add any custom styles if required */
  </style>
  