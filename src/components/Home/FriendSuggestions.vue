<template>
  <div :class="{'dark': theme === 'dark'}" class="space-y-4">
    <div
      :class="theme === 'dark' ? 'bg-[#2d3748] text-[#e2e8f0]' : 'bg-[#f7fafc] text-[#1a202c]'"
      class="p-4 rounded-lg shadow"
    >
      <h3
        :class="theme === 'dark' ? 'text-[#ffffff]' : 'text-[#2d3748]'"
        class="font-bold text-lg"
      >
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
            <span
              :class="theme === 'dark' ? 'text-[#cbd5e0]' : 'text-[#2d3748]'"
              class="font-medium"
            >
              {{ friend.name }}
            </span>
          </div>
          <button
            :class="theme === 'dark' ? 'text-[#63b3ed]' : 'text-[#4299e1]'"
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
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      friends: [
        { id: 1, name: "Michael Great", avatar: "path/to/avatar1.jpg" },
        { id: 2, name: "Md Rahim", avatar: "path/to/avatar2.jpg" },
      ],
    };
  },
};
</script>

<style scoped>
/* Tailwind handles the styles. Scoped style is not necessary unless additional customizations are required. */
</style>
