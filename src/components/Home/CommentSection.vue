<template>
  <div v-if="showComments" class="mt-4 ">
    <button @click="showComments = !showComments" class="text-white dark:text-gray-200">
      <i class="ri-arrow-left-line"></i>
    </button>

    <!-- Add Comment -->
    <div class="mt-4 flex flex-col space-y-1">
      <!-- Textarea for Content -->
      <div class="relative">
        <textarea
          v-model="newCommentText"
          placeholder="What's on your mind?"
          class="w-full p-2 border dark:border-white rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white mb-2 text-sm"
        ></textarea>

        <!-- Emoji Button -->
        <button
          @click="toggleEmojiPicker"
          class="absolute top-2 right-2 p-1 text-lg text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
        >
          <i class="ri-emoji-sticker-line"></i>
        </button>

        <!-- Emoji Picker -->
        <div
          v-if="showEmojiPicker"
          class="absolute z-10 bg-white dark:bg-gray-800 p-2 shadow-lg rounded-md w-72 max-h-60 overflow-y-auto"
        >
          <div v-for="(emojiGroup, groupName) in emojis" :key="groupName" class="mb-4 ">
            <h4 class="text-sm font-semibold text-gray-700 dark:text-white">{{ groupName }}</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="emoji in emojiGroup"
                :key="emoji"
                @click="addEmoji(emoji)"
                class="cursor-pointer text-lg hover:bg-gray-200 p-1 rounded dark:hover:bg-gray-600"
              >
                {{ emoji }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Media Upload Section -->
      <div class="flex space-x-2 justify-between">
        <!-- Upload Image Button -->
        <div class="flex space-x-2 ">
          <button
            @click="triggerFileInput('image')"
            class="text-xl p-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-600"
            :disabled="postImages.length >= 4"
          >
            <i class="ri-image-2-line"></i>
          </button>

          <!-- Upload Video Button -->
          <button
            @click="triggerFileInput('video')"
            class="text-xl p-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-600"
            :disabled="postVideos.length >= 1"
          >
            <i class="ri-video-line"></i>
          </button>

          <!-- GIF Picker Button -->
          <button
            @click="toggleGifPicker"
            class="text-xl p-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-600"
          >
            <i class="ri-file-gif-fill"></i>
          </button>
        </div>

        <button
          @click="submitComment"
          class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Post
        </button>
      </div>

      <!-- Uploaded Images and GIFs Preview -->
      <div v-if="postImages.length || postVideos.length" class="mb-2 flex flex-wrap gap-2">
        <div v-for="(media, index) in postImages" :key="index" class="relative w-20 h-20">
          <img :src="media" alt="Uploaded Image" class="rounded-md w-full h-full object-cover" />
          <button
            @click="removeImage(index)"
            class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
          >
            &times;
          </button>
        </div>
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

      <!-- File Inputs -->
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
    </div>

    <!-- Displaying comments -->
    <div v-for="comment in comments" :key="comment.id" class="py-2 items-start space-x-4 mb-4">
      <div class="flex gap-2 items-start">
        <div class="flex flex-col items-center">
          <!-- Avatar -->
          <img
            :src="comment.user.avatar || 'https://via.placeholder.com/40'"
            alt="User avatar"
            class="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <div class="w-full">
          <div>
            <p class="text-sm font-semibold text-gray-700 dark:text-white">{{ profile?.username || ''}}</p>
            <p class="text-gray-500 text-sm dark:text-gray-300">@{{ profile.lastName + profile.firstName }}</p>

            <!-- Comment Media -->
            <div class="flex justify-between items-center gap-2 mt-2">
              <div>
                <p class="text-gray-700 text-sm dark:text-gray-200">{{ comment.text }}</p>
                <div v-if="comment.images?.length || comment.videos?.length" class="flex flex-wrap gap-2 mt-2">
                  <!-- Display Images -->
                  <div v-for="(image, index) in comment.images" :key="index" class="relative w-20 h-20">
                    <img :src="image" alt="Uploaded Image" class="rounded-md w-full h-full object-cover" />
                  </div>
                  <!-- Display Videos -->
                  <div v-for="(video, index) in comment.videos" :key="index" class="relative w-32 h-20">
                    <video :src="video" controls class="w-full h-full rounded-md"></video>
                  </div>
                </div>
              </div>
              <button @click="likeComment(comment)" class="hover:text-blue-500 flex items-center dark:hover:text-blue-300">
                <i class="ri-heart-fill text-base" :class="{'text-red-500': comment.liked}"></i>
                <span class="ml-1">{{ comment.likeCount || 0 }}</span>
              </button>
              <button @click="deleteComment(comment.id)" class="hover:text-red-500 dark:hover:text-red-400">
                <i class="ri-delete-bin-line text-base"></i>
              </button>
            </div>
          </div>

          <!-- Actions for comment -->
          <div class="flex w-full justify-between space-x-2 text-gray-500 text-xs mt-2 dark:text-gray-300">
            <button v-if="!comment.showReplies" @click="toggleCommentReply(comment)">
              <span class="text-base">reply {{ replyCount }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <!-- Displaying Replies -->
        <div v-if="comment.showReplies" class="ml-6 mt-2">
          <button class="border-b-2 w-full text-left dark:border-white" @click="comment.showReplies = false">
            <i class="ri-arrow-left-line"></i>
          </button>
          <div v-for="(reply, index) in comment.replies" :key="index" class="flex py-2 border-b items-start space-x-4 mb-4">
            <div class="flex flex-col items-center relative">
              <!-- Avatar -->
              <img
                :src="comment.user.avatar || 'https://via.placeholder.com/40'"
                alt="User avatar"
                class="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div class="w-full">
              <div>
                <p class="text-sm font-semibold text-gray-700 dark:text-white">{{ profile?.username || ''}}</p>
                <p class="text-gray-500 text-sm dark:text-gray-300">@{{ profile.lastName + profile.firstName }}</p>
                <p class="text-gray-700 text-sm dark:text-gray-200">{{ reply.text }}</p>
                <div class="flex items-center gap-6 mt-2">
                  <button @click="likeReply(comment, reply)" class="flex items-center dark:hover:text-blue-300">
                    <i class="ri-heart-fill text-base" :class="{'text-red-500': reply.liked}"></i>
                    <span class="ml-1">{{ reply.likeCount || 0 }}</span>
                  </button>
                  <button @click="deleteReply(comment, reply)" class="hover:text-red-500 dark:hover:text-red-400">
                    <i class="ri-delete-bin-line text-base"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Reply -->
        <div v-if="comment.showReplies" class="flex flex-col space-y-2 mt-2">
          <textarea
            v-model="comment.newReplyText"
            placeholder="Add a reply..."
            class="w-full p-2 border dark:border-white rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white text-sm"
          ></textarea>
          <button
            @click="submitReply(comment)"
            class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Post Reply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  props: {
    comments: { type: Array, required: true },
    newComment: { type: String, required: true },
    profile: { type: Object, required: true },
    post: { type: Object, required: true },
    showComments: { type: Boolean, required: true },
  },
  data() {
    return {
      newCommentText: this.newComment,
      postImages: [],
      postVideos: [],
      showEmojiPicker: false,
      showGifPicker: false,
      gifSearchQuery: "",
      commentComment: false,
      emojis: {
        "Frequently Used": [
          "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍",
          "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫",
          "🤔", "🤐", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔",
          "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠",
          "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧",
          "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠",
          "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹",
        ],
        "Animals & Nature": ["🐶", "🐱", "🐭", "🐼", "🦊", "🐸", "🦄", "🐢", "🐍"],
        "Food & Drink": ["🍎", "🍔", "🍟", "🍕", "🍣", "🍦", "☕", "🍩", "🍺"],
        "Travel & Places": ["🚗", "✈️", "🚀", "🏝️", "🏔️", "🌍", "🌃", "🚢", "🚉"],
        "Objects & Symbols": ["📱", "💻", "📷", "🎧", "💡", "📚", "🖊️", "🔒", "🔑"],
      }
    };
  },
  methods: {
    addEmoji(emoji) {
      this.newCommentText += emoji;
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    toggleGifPicker() {
      this.showGifPicker = !this.showGifPicker;
    },
    
    onImageUpload(event) {
      const files = event.target.files;
      Array.from(files).forEach(file => {
        if (this.postImages.length < 4) {
          this.postImages.push(URL.createObjectURL(file));
        }
      });
    },
    onVideoUpload(event) {
      const file = event.target.files[0];
      if (file && this.postVideos.length < 1) {
        this.postVideos.push(URL.createObjectURL(file));
      }
    },
    removeImage(index) {
      this.postImages.splice(index, 1);
    },
    removeVideo(index) {
      this.postVideos.splice(index, 1);
    },
    toggleCommentReply(comment) {
      comment.showReplies = !comment.showReplies;
      if (comment.showReplies) {
        comment.replyCount = (comment.replyCount || 0) + 1;
      } else {
        comment.replyCount = (comment.replyCount || 0) - 1;
      }
    },
    submitReply(comment) {
      const newReply = {
        id: Date.now(),
        user: {
          username: this.profile.username,
          avatar: this.profile.avatar,
        },
        text: comment.newReplyText,
      };
      if (!comment.replies) {
        comment.replies = [];
      }
      comment.replies.push(newReply);
      comment.newReplyText = '';
    },
    submitComment() {
      if (this.newCommentText.trim() || this.postImages.length || this.postVideos.length) {
        const newComment = {
          id: Date.now(),
          user: {
            name: this.profile.username,
            avatar: this.profile.profilePicture || 'https://via.placeholder.com/40',
            username: this.profile.lastName + this.profile.firstName,
          },
          text: this.newCommentText,
          liked: false,
          images: [...this.postImages], // Include uploaded images
          videos: [...this.postVideos], // Include uploaded videos
        };
        this.$emit("addComment", newComment);
        this.newCommentText = ""; // Reset text
        this.postImages = []; // Reset images
        this.postVideos = []; // Reset videos
      }
    },

    triggerFileInput(type) {
      if (type === 'image') {
        this.$refs.fileInput.click();  // Trigger the image file input
      } else if (type === 'video') {
        this.$refs.videoInput.click();  // Trigger the video file input
      }
    },
    likeComment(comment) {
      comment.liked = !comment.liked;
      comment.likeCount = comment.liked 
        ? (comment.likeCount || 0) + 1 
        : (comment.likeCount || 0) - 1;
    },
    likeReply(comment, reply) {
      reply.liked = !reply.liked;
      reply.likeCount = reply.liked ? (reply.likeCount || 0) + 1 : (reply.likeCount || 0) - 1;
    },
    deleteComment(commentId) {
      // Find and remove the comment based on its ID
      const index = this.comments.findIndex(comment => comment.id === commentId);
      if (index !== -1) {
        this.comments.splice(index, 1); // Remove the comment from the array
        this.$emit('update-comments', this.comments); // Emit the updated comments to the parent
      }
    },
    deleteReply(comment, reply) {
      const index = comment.replies.findIndex(r => r.id === reply.id);
      if (index !== -1) {
        comment.replies.splice(index, 1);
      }
    },
    
    
  },
  mounted() {
 
  }
};
</script>

<style scoped>
button:hover {
  opacity: 0.8;
}

.text-base {
  font-size: 1rem;
}

.ri-image-2-line,
.ri-video-line,
.ri-file-gif-fill,
.ri-emoji-sticker-line {
  font-size: 1.5rem;
}

hr.vertical {
  transform: rotate(90deg);
  text-align: right;
  width: 1px;
  min-height: 100px;
  margin: 0;
  padding: 2px;
  border: solid red;
}
</style>