<template>
  <div :class="[theme === 'dark' ? 'bg-[#15202b] text-[#e1e8ed]' : 'bg-[#ffffff] text-[#000000]']" 
    class="flex w-full flex-col min-h-screen ">
    <index :theme="theme" @toggle-theme="handleToggleTheme"/>
  </div>
  
</template>

<script>
import index from '@/components/Notification/index.vue';
export default {
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  components:{
    index
  },
  methods: {
    handleToggleTheme() {
      console.log('Theme toggle button clicked. Current theme:', this.theme);
  
      this.$emit('toggle-theme')
    },
  },
}
</script>

<style>

</style>