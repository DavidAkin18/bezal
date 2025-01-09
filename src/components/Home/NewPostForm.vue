<template>
  <div :class="{ 'dark': darkMode }" class="bg-white">
    <div
      @click="showTextarea = !showTextarea"
      class="text-4xl fixed md:hidden z-50 bottom-20 right-0 m-6 px-3 py-1 text-white bg-blue-700 rounded-full"
    >
      +
    </div>

    <!-- Form Section -->
    <div
      v-if="showTextarea || isLargeScreen"
      class="p-4 rounded-lg mx-auto"
      :class="darkMode ? 'bg-[#1a202c] text-gray-100' : 'bg-gray-100 text-gray-800'"
    >
      <!-- Textarea for Content -->
      <textarea
        v-model="postContent"
        placeholder="What's on your mind?"
        class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-2 text-sm"
        :class="darkMode ? 'bg-[#121212] text-white placeholder-gray-400' : ''"
        ref="textarea"
      ></textarea>

      <!-- Uploaded Images and GIFs Preview -->
      <div v-if="postImages.length" class="mb-2 flex flex-wrap gap-2">
        <div v-for="(image, index) in postImages" :key="index" class="relative w-20 h-20">
          <img :src="image" alt="Uploaded" class="rounded-md w-full h-full object-cover" />
          <button
            @click="removeImage(index)"
            class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
          >
            &times;
          </button>
        </div>
      </div>

      <!-- Uploaded Video Preview -->
      <div v-if="postVideos.length" class="mb-2 flex flex-wrap gap-2">
        <div v-for="(video, index) in postVideos" :key="index" class="relative w-32 h-20">
          <video :src="video" controls class="w-full h-full rounded-md"></video>
          <button
            @click="removeVideo(index)"
            class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
          >
            &times;
          </button>
        </div>
      </div>

      <!-- Image and Video Upload -->
      <input
        type="file"
        ref="fileInput"
        @change="onImageUpload"
        class="hidden"
        accept="image/*"
        multiple
      />
      <input
        type="file"
        ref="videoInput"
        @change="onVideoUpload"
        class="hidden"
        accept="video/*"
      />

      <div class="flex space-x-2 mb-2">
        <!-- Upload Image Button -->
        <button
          @click="triggerFileInput('image')"
          class="text-xl p-1 rounded-full"
          :class="darkMode ? 'hover:bg-blue-600 text-gray-300' : 'hover:bg-blue-200 text-gray-800'"
          :disabled="postImages.length >= 4"
        >
          <i class="ri-image-2-line"></i>
        </button>

        <!-- Upload Video Button -->
        <button
          @click="triggerFileInput('video')"
          class="text-xl p-1 rounded-full"
          :class="darkMode ? 'hover:bg-blue-600 text-gray-300' : 'hover:bg-blue-200 text-gray-800'"
          :disabled="postVideos.length >= 1"
        >
          <i class="ri-video-line"></i>
        </button>

        <!-- GIF Picker Button -->
        <button
          @click="toggleGifPicker"
          class="text-xl p-1 rounded-full"
          :class="darkMode ? 'hover:bg-blue-600 text-gray-300' : 'hover:bg-blue-200 text-gray-800'"
        >
          <i class="ri-file-gif-fill"></i>
        </button>

        <!-- Emoji Picker Button -->
        <button
          @click="toggleEmojiPicker"
          class="text-xl p-1 rounded-full"
          :class="darkMode ? 'hover:bg-blue-600 text-gray-300' : 'hover:bg-blue-200 text-gray-800'"
        >
          <i class="ri-emoji-sticker-line"></i>
        </button>

        <!-- Dark Mode Toggle Button -->
        <!-- <button
          @click="toggleDarkMode"
          class="text-xl p-1 rounded-full"
          :class="darkMode ? 'hover:bg-blue-600 text-yellow-400' : 'hover:bg-blue-200 text-gray-800'"
        >
          <i :class="darkMode ? 'ri-moon-fill' : 'ri-sun-fill'"></i>
        </button> -->
      </div>

      <!-- GIF Picker Modal -->
      <div
        v-if="showGifPicker"
        ref="gifPicker"
        @click="preventCloseGifPicker"
        class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      >
        <div
          :class="darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'"
          class="p-4 rounded-md w-11/12 md:w-1/2 min-h-80 overflow-y-auto"
        >
          <div class="flex items-center mb-4">
            <input
              v-model="gifSearchQuery"
              @input="searchGifs"
              placeholder="Search for GIFs"
              :class="darkMode ? 'bg-gray-900 text-gray-100 placeholder-gray-400' : ''"
              class="flex-grow p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button @click="closeGifPicker" class="ml-2 text-red-500">
              X
            </button>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <img
              v-for="(gif, index) in gifResults"
              :key="index"
              :src="gif.url"
              alt="GIF"
              @click="selectGif(gif.url)"
              class="cursor-pointer rounded-md hover:opacity-75"
            />
          </div>
        </div>
      </div>

      <!-- Emoji Picker -->
      <div
        v-if="showEmojiPicker"
        class="absolute mt-2 z-10 p-2 shadow-lg rounded-md w-72 max-h-60 overflow-y-auto"
        :class="darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'"
      >
        <div v-for="(emojiGroup, groupName) in emojis" :key="groupName" class="mb-4">
          <h4 class="text-sm font-semibold">{{ groupName }}</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="emoji in emojiGroup"
              :key="emoji"
              @click="addEmoji(emoji)"
              class="cursor-pointer text-lg p-1 rounded"
              :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'"
            >
              {{ emoji }}
            </span>
          </div>
        </div>
        <button
          @click="closeEmojiPicker"
          class="mt-2 px-4 py-1 bg-red-500 text-white rounded text-sm w-full hover:bg-red-600"
        >
          Done
        </button>
      </div>

      <!-- Submit Button -->
      <button
        @click="submitPost"
        :class="darkMode ? 'bg-blue-600 hover:bg-blue-700 text-gray-100' : 'bg-blue-500 hover:bg-blue-600 text-white'"
        class="px-3 py-1 rounded text-sm w-full"
      >
        Post
      </button>
    </div>
  </div>
</template>


<script>
import { ref, nextTick, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios"; // Import axios for making API requests

export default {
  name: "NewPostItem",
  setup() {
    const store = useStore();
    const darkMode = computed(()=> store.state.darkMode);
    
    const postContent = ref("");
    const postImages = ref([]);
    const postVideos = ref([]);
    const showEmojiPicker = ref(false);
    const showGifPicker = ref(false);
    const textarea = ref(null);
    const showTextarea = ref(false);

    const gifSearchQuery = ref("");
    const gifResults = ref([]);

    const emojis = ref({
      "Frequently Used": [
        "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", 
        "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", 
        "🤐","🤨", "😐", "😑", "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", 
        "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", 
        "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", 
        "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", 
        "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", 
        "😹", "😻", "😼", "😽", "🙀", "😿", "😾"
        ],
      "Animals & Nature": ["🐶", "🐱", "🐭", "🐼", "🦊", "🐸", "🦄", "🐢", "🐍"],
      "Food & Drink": ["🍎", "🍔", "🍟", "🍕", "🍣", "🍦", "☕", "🍩", "🍺"],
      "Travel & Places": ["🚗", "✈️", "🚀", "🏝️", "🏔️", "🌍", "🌃", "🚢", "🚉"],
      "Objects & Symbols": ["📱", "💻", "📷", "🎧", "💡", "📚", "🖊️", "🔒", "🔑"],
    });

    const isLargeScreen = computed(() => window.innerWidth >= 640);

    const triggerFileInput = (type) => {
      if (type === "image") document.querySelector('input[type="file"]').click();
      else if (type === "video") document.querySelector('input[accept="video/*"]').click();
    };

    const onImageUpload = (e) => {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        if (postImages.value.length < 4) {
          postImages.value.push(URL.createObjectURL(file));
        }
      });
    };

    const onVideoUpload = (e) => {
      const file = e.target.files[0];
      if (file && postVideos.value.length < 1) {
        postVideos.value.push(URL.createObjectURL(file));
      }
    };

    const removeImage = (index) => postImages.value.splice(index, 1);
    const removeVideo = (index) => postVideos.value.splice(index, 1);

    const toggleEmojiPicker = () => (showEmojiPicker.value = !showEmojiPicker.value);
    const closeEmojiPicker = () => (showEmojiPicker.value = false);

    const addEmoji = (emoji) => {
      const textareaElement = textarea.value; // Reference to the textarea element
      const cursorStart = textareaElement.selectionStart;
      const cursorEnd = textareaElement.selectionEnd;

      // Update the content at the cursor position
      postContent.value =
        postContent.value.slice(0, cursorStart) +
        emoji +
        postContent.value.slice(cursorEnd);

      nextTick(() => {
        // Set the cursor position after the emoji
        textareaElement.setSelectionRange(
          cursorStart + emoji.length,
          cursorStart + emoji.length
        );
        textareaElement.focus(); // Refocus the textarea
      });
    };


    const toggleGifPicker = () => {
      showGifPicker.value = !showGifPicker.value;
      gifSearchQuery.value = "";
      gifResults.value = [];
    };

    const closeGifPicker = () => (showGifPicker.value = false);

    const preventCloseGifPicker = (e) => {
      e.stopPropagation(); // Prevent the click from closing the GIF picker
    };

    // Updated searchGifs to use Giphy API
    const searchGifs = async () => {
      if (gifSearchQuery.value.trim()) {
        try {
          const response = await axios.get(
            `https://api.giphy.com/v1/gifs/search`, {
              params: {
                api_key: "aeC2lcieGyEGj519AmlOI0uR8FIzRq7Q", // Your Giphy API key
                q: gifSearchQuery.value,
                limit: 10, // Limit to 10 results for now
                offset: 0,
                rating: "g", // Suitable for all audiences
                lang: "en",
              }
            }
          );
          gifResults.value = response.data.data.map(gif => ({
            url: gif.images.fixed_height.url
          }));
        } catch (error) {
          // console.error("Error fetching GIFs:", error);
        }
      }
    };

    const selectGif = (gifUrl) => {
      if (postImages.value.length < 4) {
        postImages.value.push(gifUrl);
        closeGifPicker();
      }
    };

    const submitPost = () => {
      if (!postContent.value.trim() && !postImages.value.length && !postVideos.value.length) return;

      store.dispatch("addPost", {
        content: postContent.value,
        images: postImages.value,
        videos: postVideos.value,
      });

      postContent.value = "";
      postImages.value = [];
      postVideos.value = [];
      showTextarea.value = false;
    };

    return {
      postContent,
      postImages,
      postVideos,
      showEmojiPicker,
      toggleEmojiPicker,
      closeEmojiPicker,
      addEmoji,
      showGifPicker,
      toggleGifPicker,
      closeGifPicker,
      preventCloseGifPicker,
      searchGifs,
      emojis,
      gifResults,
      gifSearchQuery,
      selectGif,
      triggerFileInput,
      onImageUpload,
      onVideoUpload,
      removeImage,
      removeVideo,
      textarea,
      showTextarea,
      isLargeScreen,
      submitPost,
      darkMode, 
    };
  },
};
</script>



<style scoped>
/* Dark Mode Customizations */
.dark .bg-white {
  background-color: #2d3748; /* Dark background for white elements */
}

.dark .bg-gray-900 {
  background-color: #2d3748; /* Dark background for sections */
}

.dark .bg-gray-800 {
  background-color: #2d3748; /* Dark background for gray elements */
}

.dark .text-gray-100 {
  color: #f7fafc; /* Light text for dark mode */
}

.dark .text-gray-300 {
  color: #e2e8f0; /* Lighter text */
}

.dark .text-gray-800 {
  color: #2d3748; /* Default text color for light mode */
}

.dark .bg-blue-600 {
  background-color: #3182ce; /* Blue background for buttons */
}

.dark .bg-blue-500 {
  background-color: #4299e1; /* Lighter blue for light mode */
}

.dark .bg-gray-900 {
  background-color: #1a202c; /* Dark background for elements */
}

.dark .bg-gray-800 {
  background-color: #2d3748; /* Dark background for input boxes */
}

.dark .text-gray-100 {
  color: #f7fafc; /* White text for dark mode */
}

.bg-gray-800 {
  background-color: #2d3748;
}
</style>
