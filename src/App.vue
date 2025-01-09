<template>
  <div :class="{'dark': darkMode}">
    <!-- Your main layout -->
    <div>
      <header>
        <!-- Pass darkMode and toggleDarkMode as props -->
        <Navbar :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />
      </header>
      <main>
        <router-view :darkMode="darkMode" :toggleDarkMode="toggleDarkMode" />
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/Layout/Navbar.vue'
export default {
  component:{
    Navbar
  },
  data() {
    return {
      darkMode: false, // Initial state
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('dark', this.darkMode); // Apply/remove dark class on body
    },
  },
};
</script>

<style>
/* Global light mode styles */
/* body {
  background-color: white;
  color: black;
}


body.dark {
  background-color: #15202b;
  color: #e1e8ed;
} */
</style>
