<template>
  <div class="loader-container" v-if="loading">
    <div class="solar-panel">
      <div class="sun"></div>
      <div class="solar-cells">
        <div v-for="n in 8" :key="n" class="cell"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true, // Set this to false when loading is complete
    };
  },
};
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height:70vh;
  /* background-color: #1a1a1a;  */
}

.solar-panel {
  width: 100px;
  height: 100px;
  background-color: #333;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.solar-cells {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 10px;
}

.cell {
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  animation: cellAnimation 1s infinite;
}

@keyframes cellAnimation {
  0%, 100% {
    background-color: #4caf50;
  }
  50% {
    background-color: #2e7d32;
  }
}

.sun {
  position: absolute;
  top: -30px;
  left: 50%;
  width: 40px;
  height: 40px;
  background-color: #ffeb3b;
  border-radius: 50%;
  box-shadow: 0 0 10px #ffeb3b;
  transform: translateX(-50%);
  animation: sunAnimation 2s infinite;
}

@keyframes sunAnimation {
  0%, 100% {
    top: -30px;
  }
  50% {
    top: -10px;
  }
}
</style>