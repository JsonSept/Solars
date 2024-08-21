<template>
   <h1 class="header text-light">Contact Form</h1>
   <form action="https://formspree.io/f/xblraoel"method="POST" class="formspree">
  <label>
    Your email:
    <input type="email" name="email">
  </label>
  <label>
    Your message:
    <textarea name="message"></textarea>
  </label>
  <!-- your other form fields go here -->
  <button type="submit">Send</button>
</form>
</template>
<script>
  

export default {
 
  data() {
    
  },
  
}
</script>
<style scoped>


/* Basic form styling */
 .formspree {
  background: #2c2c2c;
  /* Dark background for 3D effect */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
   /* Subtle shadow */
  max-width: 600px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 1rem;
  color: #f0f0f0;
  /* Light text color; */
  font-size: 1rem;
} 

input[type="email"],
textarea {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  margin-top: 0.5rem;
  background: #3a3a3a;
  /* Slightly lighter background for inputs */
  color: #fff;
}

textarea {
  resize: vertical;
  height: 150px;
}

button {
  background: #ff5722;
   /* Eye-catching button color */
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

button:hover {
  background: #e64a19;
}

button:active {
  background: #d84315;

}
</style>
