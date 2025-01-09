<template>
    <div :class="{ 'dark': darkMode }" class="flex w-full flex-col min-h-screen
     bg-white dark:bg-[#2d3748] lg:bg-[#E5E5E5] dark:lg:bg-[#181818]">
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
                <Notify />
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
import Notify from './Notify.vue';
import Sidebar from "@/Layout/Sidebar.vue";

import MobileSidebar from "@/Layout/MobileSidebar.vue";
import Trending from "@/components/Home/Trending.vue";
import FriendSuggestions from "@/components/Home/FriendSuggestions.vue";
import Navbar from "@/Layout/Navbar.vue";
import MediumSideBar from "@/Layout/MediumSideBar.vue";

export default {
    components:{
        Notify,
        Sidebar,
        Trending,
        FriendSuggestions,
        Navbar,
        MobileSidebar,
        MediumSideBar,
    }
}
</script>

<style>

</style>