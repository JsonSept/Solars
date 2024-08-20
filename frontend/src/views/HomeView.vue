<template>
  <div>
    <Loader v-if="isLoading" />
    <h1 class="header text-light">Home Page</h1>
  </div>
</template>

<style>

</style>

<script>
import Loader from '../components/Loader.vue';
export default {
  components: {
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
