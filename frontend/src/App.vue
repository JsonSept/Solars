<template>
  <Loader v-if="isLoading" />
  <navbar-comp />
  <router-view v-if="!isLoading" />
  <footer-comp />
</template>

<style>

  body {
    background-image: 
    linear-gradient(rgba(39, 36, 35, 0.5),rgba(39, 36, 35, 0.5)),
    url('https://i.ibb.co/YyqG19D/369446558-Clean-energy.jpg');
    background-size: cover;
    background-repeat:no-repeat;
    background-attachment: fixed;
    z-index: -1;
    padding-top: 10%;
  }
 #container{
   height: 350px;
 }
</style>
<script>
import FooterComp from './components/FooterComp.vue'
import NavbarComp from './components/NavbarComp.vue'
import Loader from './components/Loader.vue';



export default {
  components: {
    NavbarComp,
    FooterComp,
    Loader,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false; // Simulate loading completion
    }, 1000);
  },
}

</script>