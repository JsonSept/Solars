import { createStore } from 'vuex'
import axios from 'axios'
const baseUrl = "http://localhost:9000";

export default createStore({
  state: {
    user: null,
    signupStatus: '',
    signupError: null,
    isLoggedIn: false,
    loginError: null,
  },
  getters: {
    signupStatus: (state) => state.signupStatus,
    signupError: (state) => state.signupError,
    user: (state) => state.user,
    isLoggedIn: state => state.isLoggedIn,
    loginError: state => state.loginError,
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
    SET_LOGIN(state, status) {
            state.isLoggedIn = status;
        },
    SET_LOGIN_ERROR(state, error) {
        state.loginError = error;
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

    async login({ commit }, credentials) {
       commit('SET_LOGIN', 'loading')
            try {
                const response = await axios.post(baseUrl + '/login', credentials); // Replace with your actual API endpoint
                if (response.data.success) {
                    commit('SET_LOGIN', true);
                  commit('SET_LOGIN_ERROR', null);
                  localStorage.setItem('token', response.data.token);
                } else {
                    commit('SET_LOGIN', false);
                    commit('SET_LOGIN_ERROR', 'Invalid email or password');
                }
            } catch (error) {
                commit('SET_LOGIN', false);
                commit('SET_LOGIN_ERROR', 'An error occurred during login');
            }
        },
  },
  modules: {
  }
})
