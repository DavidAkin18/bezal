<template>
  <div :class="{ 'dark': theme === 'dark' }" class="space-y-4 relative background-img mb-2 border-b w-full lg:border-b-0 bg-white lg:bg-gray-100 dark:bg-[#15202b] rounded-lg  dark:text-white">
    <!-- Background Image -->
    <div class="relative">
      <img
        :src="profile.backgroundImage || defaultBackgroundPicture"
        alt="Background"
        class="w-full h-40 md:h-60 object-cover lg:rounded-b-lg object-top"
      />
    </div>

    <!-- Profile Information Section -->
    <div class="bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg lg:shadow-lg py-4 px-4">
      <div class="flex items-start justify-between">
        <!-- Profile Picture -->
        <div
          class="relative -mt-16 flex-shrink-0 cursor-pointer"
          @click="showProfilePicModal = true"
        >
          <img
            :src="profile.profilePicture || defaultProfilePicture"
            alt="Profile Picture"
            class="w-20 h-20 md:w-24 md:h-24 border-4 border-white rounded-full bg-white dark:bg-gray-700"
          />
        </div>

        <!-- Edit Profile Button -->
        <button
          @click="showEditModal = true"
          class="bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded-xl dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          Edit profile
        </button>
      </div>

      <!-- User Details -->
      <div class="mt-2">
        <h2 
        class="text-xl font-bold">{{ profile.firstName }} {{ profile.lastName }}</h2>
        <p :class="{'text-gray-800': !theme, 'text-gray-100': theme}"
          class="text-gray-600 text-sm dark:text-gray-400">@{{ profile.username }}</p>
        <p class="text-gray-700 mt-2 dark:text-gray-300">{{ profile.bio }}</p>
      </div>

      <!-- Additional Info -->
      <div class="text-black text-sm mt-4 space-y-1 dark:text-gray-400">
        <div class="flex items-center gap-1">
          <i class="ri-briefcase-line"></i>
          <span>{{ profile.job }}</span>
        </div>
        <div class="flex items-center gap-1">
          <i class="ri-map-pin-line"></i>
          <span>{{ profile.location }}</span>
        </div>
        <div class="flex items-center gap-1">
          <i class="ri-link"></i>
          <a :href="profile.website" target="_blank" class="text-blue-400 underline dark:text-blue-300">
            {{ profile.website }}
          </a>
        </div>
        <div class="flex items-center gap-1">
          <i class="ri-calendar-line"></i>
          <span>
            Born {{ getFormattedDate(profile.dateOfBirth) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @close-modal="closeEditModal"
      @click.self="closeEditModal"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full lg:w-1/2 lg:h-auto relative overflow-y-auto max-h-[90vh] modal-container dark:bg-gray-800"
      >
        <!-- Close Button for Mobile -->
        <button
          class="absolute top-6 lg:top-12 right-8 text-gray-600 text-xl dark:text-white"
          @click="closeEditModal"
        >
          <i
            class="ri-close-circle-line bg-gray-200 rounded-full text-md p-0.5 cursor-pointer dark:bg-gray-600"
          ></i> 
        </button>
        <EditBio />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EditBio from '../Auth/EditBio.vue';
import vector from '../../assets/images/Vector.png';
import cover from '../../assets/images/coverpPhoto.png';

export default {
  components: {
    EditBio,
  },
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showEditModal: false,
      showProfilePicModal: false,
      defaultProfilePicture: vector,
      defaultBackgroundPicture: cover,
    };
  },
  computed: {
    ...mapState({
      profile: (state) => state.profile,
    }),
  },
  methods: {
    // Trigger the background image input file
    triggerBackgroundInput() {
      document.getElementById('background-input').click();
    },
    // Handle background image change
    handleBackgroundChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.backgroundImage = e.target.result;
          this.saveProfileToLocalStorage(); // Save the updated profile
        };
        reader.readAsDataURL(file);
      }
    },
    // Get the formatted date of birth
    getFormattedDate(dateOfBirth) {
      if (!dateOfBirth || !dateOfBirth.month || !dateOfBirth.day || !dateOfBirth.year) {
        return 'Unknown'; // Handle missing or invalid date
      }
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const monthName = monthNames[dateOfBirth.month - 1];
      return `${monthName} ${dateOfBirth.day}, ${dateOfBirth.year}`;
    },
    // Close edit modal
    closeEditModal() {
      this.showEditModal = false; // Close the modal
    },
    // Save profile data to localStorage
    saveProfileToLocalStorage() {
      localStorage.setItem('profile', JSON.stringify(this.profile));
    },
  },
  mounted() {
    // Check if profile exists in localStorage and load it if available
    window.addEventListener('close-modal', this.closeEditModal);
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.$store.commit('SET_PROFILE', JSON.parse(storedProfile));
    }
  },
  beforeUnmount() {
    window.removeEventListener('close-modal', this.closeEditModal);
  },
};
</script>

<style scoped>
/* No custom CSS, using Tailwind for everything */
</style>
