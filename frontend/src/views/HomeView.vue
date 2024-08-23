<template>
  <div class="cont">
    <!-- <Loader v-if="isLoading" /> -->
    <h1 class="header text-light">SolarTrack</h1>
  </div>

  <div class="about">
    <h1>About</h1>
    <p>The Solar Track Calculator is a comprehensive tool designed to help users estimate the output produced by their
      solar panels, monitor energy consumption, and calculate the amount of power sent back to the grid. By inputting
      key details such as solar irradiance, panel efficiency, and the surface area of the solar array, the calculator
      determines the total electricity generated in kWh. It then factors in daily energy consumption to assess how much
      surplus energy is available to be fed back into the grid. The calculator also estimates the monetary value of this
      excess energy based on current feed-in tariffs, allowing users to understand how much money they can earn from the
      electricity they contribute to the grid. This tool empowers users to maximize their solar energy investment and
      make informed decisions about their energy usage.</p>
  </div>
</template>

<style>
.cont {
  text-align: start;
  padding-top: 50%;
  background: black;
  height: 85vh;
}
.about {
  padding-top: 50%;
  color:white;
}
</style>

<script>
// import Loader from '../components/Loader.vue';
export default {
  components: {
    // Loader,
  },

}
</script>
