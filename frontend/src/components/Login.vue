<template lang="">
    <h2 class="header text-light">Login</h2>
    <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5%;
    /* text-align: center; */
    /* height: 100vh; */
    /* background-color: #f0f2f5; */
}

.login-form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    display: flex;
    flex-direction: column;
}

.login-form h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.login-form input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.login-form button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-form button:disabled {
    background-color: #007bff99;
}

.login-form button:hover:not(:disabled) {
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