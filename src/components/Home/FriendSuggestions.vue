<template>
    <div :class="{'dark ': darkMode, }"  class="bg-white rounded-lg shadow">
      <div  :class="{'bg-white': !darkMode, 'bg-gray-800': darkMode}" class="p-4 rounded-lg shadow" >
        <h3 :class="{'text-gray-700': !darkMode, 'text-gray-100': darkMode}">
          Friend Suggestions
        </h3>
        <ul class="mt-4 space-y-2">
          <li
            v-for="friend in friends"
            :key="friend.id"
            class="flex justify-between items-center"
          >
            <div class="flex items-center space-x-2">
              <img
                class="w-8 h-8 rounded-full"
                :src="friend.avatar"
                alt="Friend avatar"
              />
              <span :class="{'text-gray-300': darkMode, 'text-gray-700': !darkMode}">
                {{ friend.name }}
              </span>
            </div>
            <button
              :class="{'text-blue-400': darkMode, 'text-blue-500': !darkMode}"
              class="text-sm font-bold"
            >
              Add
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        friends: [
          { id: 1, name: "Michael Great", avatar: "path/to/avatar1.jpg" },
          { id: 2, name: "Md Rahim", avatar: "path/to/avatar2.jpg" },
        ],
      };
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
    background-color: #202020; 
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

  .dark .shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adjust shadow for dark mode */
  }
  </style>
  