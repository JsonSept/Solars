

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
    </div>
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
    methods: {
        ...mapActions(['signup']),
        handleSignup() {
            const userData = {
                username: this.username,
                email: this.email,
                password: this.password,
            };

            // // Clear any previous error messages
            // this.signupError = null;

            // Call the signup action
            this.signup(userData);

            // Clear the form fields upon successful signup
            // if (this.signupStatus === 'success') {
            //     this.username = '';
            //     this.email = '';
            //     this.password = '';
            // }

        },
    },
};
</script>
<style scoped>
.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5%;
    /* text-align: center; */
    /* height: 100vh; */
    /* background-color: #f0f2f5; */
}

.signup-form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    display: flex;
    flex-direction: column;
}

.signup-form h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.signup-form input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.signup-form button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.signup-form button:disabled {
    background-color: #007bff99;
}

.signup-form button:hover:not(:disabled) {
    background-color: #0056b3;
}

.status-message {
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
}

.status-message.error {
    color: #ff4d4f;
}

.status-message.success {
    color: #28a745;
}
</style>