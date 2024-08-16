import { createStore } from 'vuex'
import axios from 'axios'
const baseUrl = "http://localhost:9000";
export default createStore({
  state: {
    user: null,
    signupStatus: '',
    signupError: null,
  },
  
  getters: {
     signupStatus: (state) => state.signupStatus,
     signupError: (state) => state.signupError,
     user: (state) => state.user,
  },
  mutations: {
     SET_SIGNUP_STATUS(state, status) {
    state.signupStatus = status;
    },
    SET_SIGNUP_ERROR(state, error) {
      state.signupError = error;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
     async signup({ commit }, userData) {
    commit('SET_SIGNUP_STATUS', 'loading');
    commit('SET_SIGNUP_ERROR', null); // Clear any previous errors

    try {
      const response = await axios.post(baseUrl + '/signup', userData);

      // Handle success
      commit('SET_USER', response.data.user || null);
      commit('SET_SIGNUP_STATUS', 'success');
    } catch (error) {
      // Handle errors
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'Signup failed.';
      commit('SET_SIGNUP_STATUS', 'error');
      commit('SET_SIGNUP_ERROR', errorMessage);
    }
    },
  },
  modules: {
  }
})
