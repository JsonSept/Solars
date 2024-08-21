<template>
    <div class="signup-container">
        <form @submit.prevent="handleSignup" class="signup-form">
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>

        <p v-if="signupStatus === 'loading'">Signing up...</p>
        <p v-if="signupStatus === 'error'">{{ signupError }}</p>
        <p v-if="signupStatus === 'success'">Signup successful!</p>
        <p v-if="signupStatus === 'user_exists'">User already exists! Redirecting to login...</p>
    </div>
    <button class="go-to-login" @click="goToLogin">Go to Login</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    
    data() {
        return {
            
            username: '',
            email: '',
            password: '',
        };
    },
    computed: {
        ...mapGetters(['signupStatus', 'signupError']),
    },
    watch: {
        signupStatus(newStatus) {
            if (newStatus === 'success') {
                setTimeout(() => {
                    this.$router.push('/login');
                }, 1000); 
            }
        },
    },

    methods: {
        ...mapActions(['signup']),
        handleSignup() {
            const userData = {
                username: this.username,
                email: this.email,
                password: this.password,
            };
            this.signup(userData);

        },
            goToLogin() {
                this.$router.push({ name: 'login' });
            }
    },
    
};
</script>
<style scoped>
/* Container for the signup form */
.signup-container {
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

.signup-form input {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    margin-top: 1rem;
    background: #3a3a3a;
    /* Slightly lighter background for inputs */
    color: #fff;
    font-size: 1rem;
}

.signup-form input::placeholder {
    color: #b0b0b0;
    /* Lighter color for placeholder text */
}

.signup-form button {
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

.signup-form button:hover {
    background: #e64a19;
    /* Darker button color on hover */
}

.signup-form button:active {
    background: #d84315;
    /* Even darker color for active state */
}

.signup-container p {
    color: #f0f0f0;
    /* Light text color */
    margin-top: 1rem;
}

.go-to-login {
    background: #3a3a3a;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1.5rem;
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 2rem auto 0;
    text-align: center;
    transition: background 0.3s ease;
}

.go-to-login:hover {
    background: #2c2c2c;
}

.go-to-login:active {
    background: #1a1a1a;
}


</style>
