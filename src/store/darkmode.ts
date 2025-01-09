import { createStore } from 'vuex';

// Define types for the state
interface State {
  darkMode: boolean;
}

export default  createStore<State>({
  state: {
    // Initialize darkMode state from localStorage (default to false if not found)
    darkMode: localStorage.getItem('darkMode') === 'true',
  },
  mutations: {
    toggleDarkMode(state: State) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString()); // Store it in localStorage
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit('toggleDarkMode');
    },
  },
  getters: {
    darkMode: (state: State): boolean => state.darkMode,
  },
});
