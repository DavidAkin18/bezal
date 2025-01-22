<template>
  <div :class="{ 'dark': theme === 'dark' }">
    <!-- Your main layout -->
    <div>
      <header>
        <!-- Navbar component -->
        
      </header>
      <main>
        <router-view :theme="theme" @toggle-theme="toggleTheme" @toggle-search="toggleSearch" :search="search"  />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.getSavedTheme() || 'light', // Default theme is 'light'
      search:false,
    }
  },
  methods: {
    toggleTheme() {
      console.log("Toggling theme in App.vue. Previous theme:", this.theme);
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.saveTheme(this.theme);
      console.log("New theme:", this.theme);
    },
    toggleSearch(){
      this.search =!this.search
    },
    saveTheme(theme) {
      console.log("Saving theme to localStorage:", theme);
      localStorage.setItem('theme', theme);
    },
    getSavedTheme() {
      const savedTheme = localStorage.getItem('theme');
      console.log("Retrieved theme from localStorage:", savedTheme);
      return savedTheme;
    },
  },
  
};
</script>

<style>
/* Add any dark mode styles here */
.dark {
  background-color: #15202b;
  color: #e1e8ed;
}
</style>
