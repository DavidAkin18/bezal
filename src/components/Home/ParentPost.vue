<template>
  <div :class="{ 'dark': darkMode }" class="max-w-3xl mx-auto space-y-4">
    <!-- New Post Form -->
    <NewPostForm @new-post="addPost" />

    <!-- Posts List -->
    <div v-if="posts.length" :class="{'bg-white': !darkMode, 'bg-gray-900': darkMode}">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @toggle-comments="toggleComments"
        @delete-post="handleDeletePost"
        :darkMode="darkMode"
      />
    </div>
    <p v-else class="text-center text-gray-500">No posts yet. Be the first to share something!</p>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { State, Post } from "@/store";
import CommentSection from "./CommentSection.vue";
import NewPostForm from "./NewPostForm.vue";
import PostItem from "./PostItem.vue";
import SharePostModal from "./SharePostModal.vue";

export default {
  components: { PostItem, CommentSection, NewPostForm, SharePostModal },
  setup() {
    const store = useStore<State>();

    const darkMode = computed(() => store.state.darkMode);
    const posts = computed(() => store.state.posts);

    const activePostId = ref<number | null>(null);
    const shareModalVisible = ref(false);
    const shareLink = ref("");

    const addPost = (post: Partial<Post>) => {
      const newPost: Post = {
        ...post,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        images: post.images || [],
        videos: post.videos || [],
        type: post.type || 'default',
        content: post.content || ""
      };
      store.dispatch("addPost", newPost);
    };

    const toggleComments = (postId: number) => {
      activePostId.value = activePostId.value === postId ? null : postId;
    };

    const getPostComments = (postId: number) => {
      const post = posts.value.find((post: Post) => post.id === postId);
      return post?.comments || [];
    };

    const handleDeletePost = (postId: number) => {
      const index = posts.value.findIndex(post => post.id === postId);
      if (index !== -1) {
        posts.value.splice(index, 1); // Remove the post from the local posts array
      }
    };

    return {
      posts,
      activePostId,
      shareModalVisible,
      shareLink,
      addPost,
      toggleComments,
      getPostComments,
      handleDeletePost,
      darkMode, // Expose darkMode to be used in the template
    };
  },
};
</script>

<style scoped>
.text-center {
  margin-top: 2rem;
}

.dark {
  background-color: #1a202c; /* Dark background color for dark mode */
  color: #ffffff; /* Light text color for dark mode */
}

.dark .bg-white {
  background-color: #2d3748; /* Dark background for white elements */
}

.dark .text-gray-500 {
  color: #a0aec0; /* Adjust gray text for dark mode */
}

.dark .space-y-4 {
  space-y: 1rem; /* Adjust space between elements */
}

.dark .text-center {
  color: #e2e8f0; /* Light text for the "No posts yet" message */
}
.dark .border {
  border-color: #ffffff;
}
</style>
