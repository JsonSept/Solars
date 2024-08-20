<template lang="">
<Loader v-if="isLoading" />
    <h2 class="header text-light">Login</h2>
    <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button @click="goToHome">Login</button>
    </form>
    <!-- <p v-if="LoginError">{{ loginError }}</p> -->
    <p v-if="loginStatus === 'loading'">Logging in...</p>
    <p v-if="loginStatus === 'error'">{{ loginError }}</p>
    <p v-if="loginStatus === 'success'">Login successful! Redirecting to home...</p>
    <p v-if="loginStatus === 'invalid'">Invalid credentials. Please try again.</p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Loader from './Loader.vue';
export default {
    components: {
    Loader,
  },
    data() {
        return {
            email: '',
            password: '',
            isLoading: true,
        };
    },
mounted() {
    setTimeout(() => {
      this.isLoading = false; // Simulate loading completion
    }, 1000);
  },
    computed: {
        ...mapGetters(['loginError', 'isLoggedIn']),
    },
    watch: {
        isLoggedIn(newStatus) {
            if (newStatus === 'success') {
                this.$router.push('/home');
            }
        },
    },
    methods: {
        ...mapActions(['login']),
        handleLogin() {
            const credentials = {
                email: this.email,
                password: this.password,
            };
            this.login(credentials);
        },
        goToHome() {
            this.$router.push({ name: 'home' });
        }
    },
};
</script>
<style scoped>
/* Container for the login form */
.login-container {
    background: #2c2c2c;
    /* Dark background for 3D effect */
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /* Subtle shadow */
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}

.login-form div {
    margin-bottom: 1.5rem;
}

.login-form label {
    color: #f0f0f0;
    /* Light text color */
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.login-form input {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background: #3a3a3a;
    /* Slightly lighter background for inputs */
    color: #fff;
    font-size: 1rem;
}

.login-form input::placeholder {
    color: #b0b0b0;
    /* Lighter color for placeholder text */
}

.login-form button {
    background: #ff5722;
    /* Eye-catching button color */
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1.5rem;
    transition: background 0.3s ease;
    width: 100%;
}

.login-form button:hover {
    background: #e64a19;
    /* Darker button color on hover */
}

.login-form button:active {
    background: #d84315;
    /* Even darker color for active state */
}

.login-container p {
    color: #f0f0f0;
    /* Light text color */
    margin-top: 1rem;
}
</style>
