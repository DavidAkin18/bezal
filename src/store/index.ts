import { createStore } from 'vuex';

// Get stored data or fallback to default values
const storedProfile = JSON.parse(localStorage.getItem('profile') || '{}');
const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
const storedFilter = localStorage.getItem('filter') || 'all';

// Set default dateOfBirth if not present
if (!storedProfile.dateOfBirth) {
  storedProfile.dateOfBirth = { year: 'year', month: 'month', day: 'day' };
}

export type Post = {
  type: string;
  id: number;
  content: string;
  images: string[];
  videos?: string[];
  tags?: string[];
  createdAt: string;
  comments?: Comment[];
};
export type Comment = {
  id: number;
  content: string;
  createdAt: string;
};

export interface State {
  darkMode: boolean;
  profile: {
    firstName: string;
    lastName: string;
    username: string;
    nickname: string;
    location: string;
    bio: string;
    dateOfBirth: { year: string; month: string; day: string };
    profilePicture: string | null;
  };
  posts: Post[];
  filter: 'all' | 'image' | 'video' | 'text' | 'interest' | 'tagged';
  
};


export default createStore<State>({
  state: {
    darkMode: localStorage.getItem('darkMode') === 'true',
    profile: storedProfile || {
      firstName: '',
      lastName: '',
      username: '',
      nickname: '',
      location: '',
      bio: '',
      dateOfBirth: { year: 'year', month: 'month', day: 'day' },
      profilePicture: null,
    },
    posts: storedPosts || [],
   
    filter: storedFilter as 'all' | 'image' | 'video' | 'text',
  },
  getters: {
    getProfile: (state) => state.profile,
    filteredPosts: (state) => {
      switch (state.filter) {
        case 'image':
          return state.posts.filter((post) => post.images.length > 0);
        case 'video':
          return state.posts.filter((post) => post.videos && post.videos.length > 0);
        case 'text':
          return state.posts.filter(
            (post) => post.content.trim() !== '' && post.images.length === 0 && (!post.videos || post.videos.length === 0)
          );
        case 'interest':
          return state.posts.filter(
            (post) => post.content.trim() !== '' && post.images.length === 0 && (!post.videos || post.videos.length === 0)
          );
        case 'tagged':
          return state.posts.filter((post) => post.tags && post.tags.length > 0);  // Filters by tags
        default:
          return state.posts;
      }
    },
    darkMode(state) {
      return state.darkMode;
    },
  },
  mutations: {
    SET_PROFILE(state, profile) {
      state.profile = profile;
      localStorage.setItem('profile', JSON.stringify(state.profile));
    },
    SET_POSTS(state, posts: Post[]) {
      state.posts = posts;
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    ADD_POST(state, newPost: Post) {
      state.posts.unshift(newPost);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    SET_FILTER(state, filter: 'all' | 'image' | 'video' | 'text' | 'interest' | 'tagged') {
      state.filter = filter;
      localStorage.setItem('filter', state.filter); // Persist filter state to localStorage
    },
    REMOVE_POST(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    toggleDarkMode(state: State) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString()); // Store it in localStorage
    },
  },
  actions: {
    updateProfile({ commit }, payload) {
      if (!payload.dateOfBirth) {
        payload.dateOfBirth = { year: null, month: null, day: null };
      }
      commit('SET_PROFILE', payload);
    },
    addPost({ commit }, post: Post) {
      commit('ADD_POST', post);
    },
    setFilter({ commit }, filter: 'all' | 'image' | 'video' | 'text' | 'interest' | 'tagged') {
      commit('SET_FILTER', filter); // Commit the selected filter
    },
    deletePost({ commit }, postId) {
      commit("REMOVE_POST", postId); 
    },
    toggleDarkMode({ commit }) {
      commit('toggleDarkMode');
    },
  },
});
