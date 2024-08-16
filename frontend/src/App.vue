<template>
  <navbar-comp/>
  <router-view/>
  <footer-comp/>
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

</style>
<script>
import FooterComp from './components/FooterComp.vue'
import NavbarComp from './components/NavbarComp.vue'
export default {
  components: {
    NavbarComp,
    FooterComp
  }
}
</script>