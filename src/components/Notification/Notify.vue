<template>
  <div :class="{ dark: darkMode }" class="p-6 min-h-screen bg-gray-100 dark:bg-gray-800">
    <h1 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">Notifications</h1>

    <div v-if="notifications.length === 0" class="text-gray-500 dark:text-gray-400">
      No notifications yet.
    </div>

    <ul class="space-y-4">
      <li
        v-for="notification in notifications"
        :key="notification.id"
        class="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-md flex items-start space-x-4 cursor-pointer"
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
          <p class="text-gray-700 dark:text-gray-300">
            <span class="font-bold">{{ notification.message }}</span>
            <span v-if="notification.postContent" class="block text-sm italic">
              "{{ notification.postContent }}"
            </span>
            <span class="text-gray-500 dark:text-gray-400 text-sm block">{{ notification.time }}</span>
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
  setup() {
    const store = useStore();
    const router = useRouter();

    const darkMode = computed(() => store.state.darkMode);

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
            postId: like.postId,
          });
        });
      }

      return notifications;
    });

    const viewPost = (postId) => {
      router.push(`/posts/${postId}`); // Navigate to the post's detailed page
    };

    return {
      darkMode,
      notifications,
      viewPost,
    };
  },
};
</script>

<style scoped>
/* General Styles */
.dark {
  background-color: #2d3748;
  color: #ffffff;
}

.dark .bg-white {
  background-color: #4a5568;
}

.dark .text-gray-700 {
  color: #edf2f7;
}

.dark .text-gray-500 {
  color: #a0aec0;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cursor-pointer:hover {
  background-color: #f7fafc;
}

.dark .cursor-pointer:hover {
  background-color: #2c5282;
}
</style>
