<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
    @click="closeModalOnOutsideClick"
  >
    <div class="relative bg-white rounded-lg p-6 w-80">
      <button
        @click="closeModal"
        class="absolute top-4 right-4 p-2 text-gray-600 text-2xl"
      >
        &times;
      </button>

      <h2 class="text-xl font-semibold mb-4">Share this Post</h2>

      <div class="space-y-4">
        <!-- Share Options -->
        <button
          class="w-full p-2 border rounded-lg text-center bg-blue-500 text-white hover:bg-blue-600"
          @click="copyPostLink"
        >
          Copy Link
        </button>

        <button
          class="w-full p-2 border rounded-lg text-center bg-green-500 text-white hover:bg-green-600"
          @click="shareOnSocialMedia('facebook')"
        >
          Share on Facebook
        </button>

        <button
          class="w-full p-2 border rounded-lg text-center bg-blue-700 text-white hover:bg-blue-800"
          @click="shareOnSocialMedia('twitter')"
        >
          Share on Twitter
        </button>

        <button
          class="w-full p-2 border rounded-lg text-center bg-gray-800 text-white hover:bg-gray-900"
          @click="shareOnSocialMedia('whatsapp')"
        >
          Share on WhatsApp
        </button>
      </div>

      <p v-if="shareMessage" class="mt-4 text-center text-sm text-gray-600">{{ shareMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postId: String,
    isVisible: Boolean,
  },
  data() {
    return {
      shareMessage: null,
    };
  },
  watch: {
    isVisible(newVal) {
      if (!newVal) {
        this.shareMessage = null; // Reset share message when modal is closed
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:isVisible", false); // Emit event to parent to close the modal
    },

    closeModalOnOutsideClick(event) {
      if (event.target === event.currentTarget) {
        this.closeModal();
      }
    },

    copyPostLink() {
      const postLink = `https://yourwebsite.com/posts/${this.postId}`;
      navigator.clipboard.writeText(postLink).then(() => {
        this.shareMessage = "Post link copied to clipboard!";
        setTimeout(() => (this.shareMessage = null), 3000);
      });
    },

    shareOnSocialMedia(platform) {
      let url = '';
      const postLink = `https://yourwebsite.com/posts/${this.postId}`;
      const postMessage = encodeURIComponent(`Check out this post: ${postLink}`);

      switch (platform) {
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${postLink}`;
          break;
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${postMessage}`;
          break;
        case 'whatsapp':
          url = `https://api.whatsapp.com/send?text=${postMessage}`;
          break;
        default:
          return;
      }

      window.open(url, '_blank');
      this.closeModal();
    },
  },
};
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
</style>
