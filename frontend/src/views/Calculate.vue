<template>
  <div class="solar-calculator">

    <h1>Solar Panel Calculator</h1>
    
    <div class="form-group">
      <label for="location">Location</label>
      <input type="text" id="location" v-model="location" placeholder="Enter your location">
    </div>
    
    <div class="form-group">
      <label for="energy">Daily Energy Consumption (kWh)</label>
      <input type="number" id="energy" v-model="dailyEnergy" placeholder="e.g., 30">
    </div>
    
    <div class="form-group">
      <label for="efficiency">Panel Efficiency (%)</label>
      <input type="number" id="efficiency" v-model="efficiency" placeholder="e.g., 18">
    </div>

    <div class="form-group">
      <label for="losses">System Losses (%)</label>
      <input type="number" id="losses" v-model="losses" placeholder="e.g., 15">
    </div>

    <button @click="calculateSystemSize">Calculate</button>

    <div v-if="systemSize !== null">
      <h2>Estimated System Size: {{ systemSize.toFixed(2) }} kW</h2>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue';
export default {
   
  data() {
    return {
      location: '',
      dailyEnergy: 30,
      efficiency: 18,
      losses: 15,
      sunlightHours: 5, // Default value; you may want to make this dynamic based on location.
      systemSize: null
    };
  },
   
  methods: {
    calculateSystemSize() {
      const panelEfficiencyDecimal = this.efficiency / 100;
      const systemLossesDecimal = this.losses / 100;
      
      this.systemSize = this.dailyEnergy / (this.sunlightHours * panelEfficiencyDecimal * (1 - systemLossesDecimal));
    }
  }
}
</script>

<style>
.solar-calculator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"], input[type="number"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
