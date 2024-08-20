<template>
  <div class="solar-calculator bg-dark text-light">
<Loader v-if="isLoading"/>
    <h1>Simple Solar Power Calculator</h1>

    <!-- Input for Location -->
    <div class="form-group">
      <label for="location">Your Location</label>
      <input type="text" id="location" v-model="location" placeholder="Enter your city or town">
    </div>

    <!-- Simplified Panel Area Input -->
    <div class="form-group">
      <label for="panelArea">Solar Panel Size (m²)</label>
      <input type="number" id="panelArea" v-model="panelArea" placeholder="e.g., 10">
    </div>

    <!-- Simplified Panel Efficiency with Default -->
    <div class="form-group">
      <label for="efficiency">Panel Efficiency</label>
      <select id="efficiency" v-model="efficiency">
        <option value="15">Standard (15%)</option>
        <option value="18">High Efficiency (18%)</option>
        <option value="20">Premium (20%)</option>
      </select>
    </div>

    <!-- Button to Calculate -->
    <button class="btn" @click="calculatePower">Calculate Power Output</button>

    <!-- Display the Result -->
    <div v-if="powerGenerated !== null">
      <h2 class="out text-light">Estimated Power Output: {{ powerGenerated.toFixed(2) }} kWh/day</h2>
      <p class="out text-light">(This is an estimate based on average sunlight hours for your location)</p>
    </div>
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
      location: '',
      panelArea: 10, // Default value
      efficiency: 18, // Default value (in percentage)
      sunlightHours: 5, // Estimated average sunlight hours
      powerGenerated: null,
    };
  },
  methods: {
    async calculatePower() {
      // Assume a fixed average solar irradiance (1000 W/m²)
      const irradiance = 1000;
      const panelEfficiencyDecimal = this.efficiency / 100;

      // Simple calculation assuming 5 hours of sunlight
      this.powerGenerated = (this.panelArea * irradiance * panelEfficiencyDecimal * this.sunlightHours) / 1000;
    }
  },
   mounted() {
    setTimeout(() => {
      this.isLoading = false; // Simulate loading completion
    }, 3000);
  },
}
</script>

<style>
/* Add simple styles for better UX */
.solar-calculator {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
}

input, select, .btn {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  /* border: 1px solid #ccc; */
}

button {
  background: #ff5722;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #ff5735;
}

h2 {
  color: #333;
  text-align: center;
}
</style>
