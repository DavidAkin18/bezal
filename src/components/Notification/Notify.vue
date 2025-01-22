<template>
  <div :class="theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'" class="p-6 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Notifications</h1>

    <div v-if="notifications.length === 0" :class="theme === 'dark' ? 'text-gray-400' : 'text-gray-500'">
      No notifications yet.
    </div>

    <ul class="space-y-4">
      <li
        v-for="notification in notifications"
        :key="notification.id"
        :class="theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'"
        class="p-4 rounded-lg shadow-md flex items-start space-x-4 cursor-pointer"
        @click="viewPost(notification.postId)"
      >
        <div class="flex-shrink-0">
          <i
            :class="{
              'ri-heart-3-fill text-red-500': notification.type === 'like',
              'ri-message-3-fill text-blue-500': notification.type === 'comment',
              'ri-add-fill text-green-500': notification.type === 'newPost',
            }"
            class="text-xl"
          ></i>
        </div>
        <div>
          <p>
            <span class="font-bold">{{ notification.message }}</span>
            <span v-if="notification.postContent" class="block text-sm italic">
              "{{ notification.postContent }}"
            </span>
            <span :class="theme === 'dark' ? 'text-gray-400' : 'text-gray-500'" class="text-sm block">
              {{ notification.time }}
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Notification",
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // Deriving notifications from posts, comments, and likes
    const notifications = computed(() => {
      const notifications = [];

      // Ensure posts exist and loop over them
      if (Array.isArray(store.state.posts)) {
        store.state.posts.forEach((post) => {
          if (post.type === "newPost") {
            notifications.push({
              id: post.id,
              type: "newPost",
              message: `${post.username || "Someone"} posted a new ${
                post.images.length > 0
                  ? "image"
                  : post.videos && post.videos.length > 0
                  ? "video"
                  : "post"
              }.`,
              postContent: post.content,
              time: new Date(post.createdAt).toLocaleString(),
              postId: post.id,
            });
          }
        });
      }

      // Ensure comments exist and loop over them
      if (Array.isArray(store.state.posts)) {
        store.state.posts.forEach((post) => {
          post.comments?.forEach((comment) => {
            notifications.push({
              id: comment.id,
              type: "comment",
              message: `${comment.username || "Someone"} commented on your post.`,
              postContent: comment.content,
              time: new Date(comment.createdAt).toLocaleString(),
              postId: post.id,
            });
          });
        });
      }

      // Ensure likes exist and loop over them
      if (Array.isArray(store.state.likes)) {
        store.state.likes.forEach((like) => {
          notifications.push({
            id: like.id,
            type: "like",
            message: `${like.username || "Someone"} liked your post.`,
            time: new Date(like.createdAt).toLocaleString(),
            postId: like.id, // Corrected postId to like.postId
          });
        });
      }

      return notifications;
    });

    const viewPost = (postId) => {
      router.push(`/posts/${postId}`); // Navigate to the post's detailed page
    };

    return {
      notifications,
      viewPost,
    };
  },
};
</script>

<style scoped>
/* No custom CSS - using Tailwind utilities */
</style>

