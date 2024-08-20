<template lang="">
     <Loader v-if="isLoading" />
    <div>
        <h1 class="header text-light">Help Page</h1>
    </div>
</template>
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
    }, 3000);
  },
}
</script>
<style lang="">
    
</style>