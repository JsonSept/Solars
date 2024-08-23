<template>
  <Loader v-if="isLoading" />
  <navbar-comp />
  <!-- <SolarData /> -->
  <router-view v-if="!isLoading" />
  <footer-comp />
</template>

<style>

  body {
    background-image: 
    linear-gradient(rgba(39, 36, 35, 0.5),rgba(39, 36, 35, 0.5)),
    /* url('https: //drive.google.com/file/d/1P2k9qSOdDql3m1U-G3vBkY6eM7ColTqM/view?usp=sharing'); */
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
// import SolarData from './views/NewTest.vue';
import FooterComp from './components/FooterComp.vue'
import NavbarComp from './components/NavbarComp.vue'
import Loader from './components/Loader.vue';



export default {
  components: {
    // SolarData,
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