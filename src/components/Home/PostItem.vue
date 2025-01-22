<template>
  <div 
    :class="theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'"
    class="w-full p-4">
    <!-- Post Header (User Info) -->
    <div v-if="post" class="flex items-center space-x-4">
      <img 
        class="w-12 h-12 rounded-full object-cover" 
        :src="profile?.profilePicture || 'https://via.placeholder.com/40'" 
        alt="User avatar" 
      />
      <div class="flex gap-2 items-start">
        <div>
          <h3 
            :class="theme === 'dark' ? ' text-white' : ' text-gray-700'"
            class="font-bold text-lg">
            {{ profile?.username || '' }}
          </h3>
          <p 
            :class="theme === 'dark' ? ' text-white' : ' text-gray-700'"
            class="text-sm">
            @{{ profile.lastName + profile.firstName }}
          </p>
        </div>
        <p 
          :class="theme === 'dark' ? ' text-white' : ' text-gray-700'"
          class="text-sm">
          {{ formattedTime }}
        </p>
      </div>
    </div>

    <!-- Post Content -->
    <div class="pl-16">
      <p 
        :class="theme === 'dark' ? ' text-white' : ' text-gray-700'"
        class="mt-4 text-sm">
        {{ post.content }}
      </p>

      <!-- Post Images -->
      <div v-if="post.images && post.images.length" class="mt-4 grid grid-cols-2 gap-2">
        <img
          v-for="(image, index) in post.images"
          :key="index"
          :src="image"
          alt="Post image"
          class="w-full rounded-lg object-cover cursor-pointer"
          @click="openImageModal(index)"
        />
      </div>

      <!-- Post Videos -->
      <div v-if="post.videos && post.videos.length" class="mt-4">
        <video 
          v-for="(video, index) in post.videos"
          :key="index"
          :src="video"
          controls
          class="w-full rounded-lg object-cover cursor-pointer mt-2"
          @click="openVideoModal(index)"
        ></video>
      </div>

      <!-- Post Actions -->
      <div 
        class="flex justify-between items-center mt-4"
        :class="{'text-gray-600': !theme, 'text-gray-400': theme}">
        <button 
          @click="likePost" 
          class="flex items-center space-x-2 hover:text-blue-500">
          <i :class="{'text-red-500': liked}" class="ri-heart-fill text-xl"></i>
          <span>{{ likes }}</span>
        </button>

        <button 
          v-if="!showComments.value"  
          @click="toggleComments" 
          class="flex items-center space-x-2 hover:text-blue-500">
          <i class="ri-chat-3-line text-xl" :class="theme === 'dark' ? ' text-white' : ' text-gray-700'"></i>
          <span>{{ comments?.length || 0 }}</span>
        </button>

        <button 
          @click="visible = !visible" 
          class="flex items-center space-x-2 hover:text-blue-500">
          <i class="ri-share-forward-line text-xl" :class="theme === 'dark' ? ' text-white' : ' text-gray-700'"></i>
        </button>

        <button 
          @click="deletePost" 
          class="flex items-center space-x-2 text-red-500 hover:text-red-600">
          <i class="ri-delete-bin-line text-xl" ></i>
        </button>
      </div>

      <!-- Comments Section -->
      <comment-section
        :comments="comments"
        :newComment="newComment"
        :profile="profile"
        :post="post"
        @addComment="addComment"
        @deleteComment="deleteComment"
        @likeComment="likeComment"
        :showComments="showComments"
        @toggleComments="toggleComments"
      />

      <!-- Image/Video Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div class="relative max-w-4xl w-full">
          <button @click="closeModal" class="absolute top-4 right-4 p-2 text-gray-100 text-2xl">&times;</button>

          <!-- Displaying Image or Video -->
          <div v-if="currentMedia.type === 'image'">
            <img 
              :src="currentMedia.src"
              alt="Full view"
              class="w-full h-auto rounded-lg object-contain"
            />
          </div>
          <div v-if="currentMedia.type === 'video'">
            <video 
              :src="currentMedia.src"
              controls
              class="w-full h-auto rounded-lg"
            ></video>
          </div>

          <!-- Previous and Next Buttons -->
          <button 
            v-if="currentIndex > 0"
            @click="prevMedia"
            class="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-100 text-3xl bg-black bg-opacity-50 rounded-full p-2">
            ←
          </button>
          
          <button 
            v-if="currentIndex < totalMedia - 1"
            @click="nextMedia"
            class="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-100 text-3xl bg-black bg-opacity-50 rounded-full p-2">
            →
          </button>

          <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-gray-100 py-2 text-center">
            <span>{{ currentIndex + 1 }} / {{ totalMedia }}</span>
          </div>
        </div>
        <div @click="closeModal" class="absolute bottom-0 left-0 w-full text-center text-gray-100 bg-black bg-opacity-50 py-3 cursor-pointer">
          Swipe up to close
        </div>
      </div>

      <SharePostModal 
        :postId="post.id" 
        :isVisible="visible" 
        @update:isVisible="visible = $event"
        :theme="theme"
      />
    </div>
  </div>
</template>


<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import SharePostModal from "./SharePostModal.vue";
import CommentSection from "./CommentSection.vue";

export default {
  components: { SharePostModal, CommentSection },
  props: {
    post: { 
      type: Object, 
      required: true 
    },
    theme: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const store = useStore();
    const likes = ref(0);
    const liked = ref(false);
    const showComments = ref(false);
    const newComment = ref("");
    const comments = ref([]);

    const showModal = ref(false);
    const currentIndex = ref(0);

    const profile = computed(() => store.state.profile);

    const formattedTime = computed(() => {
      // Use `timestamp` if `createdAt` is missing or invalid
      const postTime = new Date(props.post.createdAt || props.post.timestamp);

      if (isNaN(postTime.getTime())) {
        return "Unknown time"; // Fallback for invalid date
      }

      const now = new Date();
      const diffInSeconds = Math.floor((now - postTime) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds}s ago`;
      } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}m ago`;
      } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
      } else {
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
      }
    });

    const localStorageKey = `post-${props.post.id}`;

    const loadFromLocalStorage = () => {
      const storedData = JSON.parse(localStorage.getItem(localStorageKey));
      if (storedData) {
        likes.value = storedData.likes || props.post.likes || 0;
        liked.value = storedData.liked || false;
        comments.value = storedData.comments || [...(props.post.comments || [])];
      } else {
        likes.value = props.post.likes || 0;
        comments.value = [...(props.post.comments || [])];
      }
    };

    const saveToLocalStorage = () => {
      try {
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            likes: likes.value,
            liked: liked.value,
            comments: comments.value,
          })
        );
      } catch (e) {
        // console.error('Error saving to localStorage', e);
      }
    };

    const likePost = () => {
      liked.value = !liked.value;
      likes.value += liked.value ? 1 : -1;
      saveToLocalStorage();
    };

    const toggleComments = () => {
      showComments.value = !showComments.value;
    };

    const addComment = (comment) => {
      comments.value.push(comment);
      saveToLocalStorage();
    };

    const deletePost = () => {
      emit("delete-post", props.post.id); 
      localStorage.removeItem(localStorageKey);
    };
    
    onMounted(() => {
      loadFromLocalStorage();
    });

    const currentMedia = ref({ type: "image", src: "" });

    const totalMedia = computed(() => props.post.images.length + props.post.videos.length);

    const nextMedia = () => {
      currentIndex.value = (currentIndex.value + 1) % totalMedia.value;
      updateCurrentMedia();
    };

    const prevMedia = () => {
      currentIndex.value = (currentIndex.value - 1 + totalMedia.value) % totalMedia.value;
      updateCurrentMedia();
    };

    const updateCurrentMedia = () => {
      if (currentIndex.value < props.post.images.length) {
        currentMedia.value = { type: "image", src: props.post.images[currentIndex.value] };
      } else {
        currentMedia.value = { type: "video", src: props.post.videos[currentIndex.value - props.post.images.length] };
      }
    };

    return {
      likes,
      liked,
      showComments,
      newComment,
      comments,
      profile,
      formattedTime,
      likePost,
      toggleComments,
      addComment,
      deletePost,
      showModal,
      currentIndex,
      currentMedia,
      visible,
    };
  },
};
</script>


<style scoped>
button:hover {
  opacity: 0.8;
}

.fixed {
  z-index: 9999;
}

img,
video {
  object-fit: cover;
}

@media (min-width: 1024px) {
  .fixed {
    max-width: 80%;
  }

  .w-full {
    max-width: 100%;
    width: 100%;
  }

  .object-contain {
    object-fit: contain;
    max-height: 80vh;
  }

  .fixed .text-3xl {
    font-size: 2rem;
  }
 
}
</style>
