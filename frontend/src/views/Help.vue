<!-- <template lang="">
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
    
</style> -->


<template>
  <div class="solar-calculator bg-dark text-light">
    <h1>Simple Solar Power Calculator</h1>

    <!-- Input for Location -->
    <div class="form-group">
      <label for="location">Your Location</label>
      <input type="text" id="location" v-model="location" placeholder="Enter your city or town">
    </div>

    <!-- Simplified Panel Area Input -->
    <div class="form-group">
      <label for="panelArea">Solar Array Surface Area (m²)</label>
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

    <!-- Display the Results -->
    <div v-if="powerGenerated !== null">
      <h2 class="out text-light">Estimated Power Output: {{ powerGenerated.toFixed(2) }} kWh/day</h2>
      <p class="out text-light">This is equivalent to {{ powerInWatts.toFixed(2) }} W/day</p>
      <p class="out text-light">(This is an estimate based on average sunlight hours for your location)</p>
    </div>

    <!-- Input for Daily Consumption -->
    <div class="form-group" v-if="powerGenerated !== null">
      <label for="consumption">Your Daily Consumption (kWh/day)</label>
      <input type="number" id="consumption" v-model="dailyConsumption" placeholder="e.g., 5">
    </div>

    <!-- Button to Compare with Consumption -->
    <button class="btn" v-if="powerGenerated !== null && dailyConsumption !== null" @click="compareConsumption">Compare
      Consumption</button>

    <!-- Display the Consumption Comparison and Currency Calculation -->
    <div v-if="consumptionResult !== null">
      <h3 class="out text-light">{{ consumptionResult }}</h3>
      <h4 v-if="savingsInRand !== null" class="out text-light">
        Potential Savings: R{{ savingsInRand.toFixed(2) }}
      </h4>
    </div>
  </div>
</template>

<script>


export default {
 
  data() {
    return {
      isLoading: true,
      location: '',
      panelArea: 10, // Default value
      efficiency: 18, // Default value (in percentage)
      sunlightHours: 5, // Estimated average sunlight hours
      powerGenerated: null,
      powerInWatts: null,
      dailyConsumption: null,
      consumptionResult: null,
      savingsInRand: null,
      conversionRate: 1.33, // Conversion rate
      randPerKWh: 1.5, // Example Rand rate per kWh
    };
  },
  methods: {
    async calculatePower() {
      // Assume a fixed average solar irradiance (1000 W/m²)
      const irradiance = 1000;
      const panelEfficiencyDecimal = this.efficiency / 100;

      // Simple calculation assuming 5 hours of sunlight
      this.powerGenerated = (this.panelArea * irradiance * panelEfficiencyDecimal * this.sunlightHours) / 1000;

      // Convert kWh to watts
      this.powerInWatts = this.powerGenerated * 1000;
    },
    compareConsumption() {
      if (this.dailyConsumption > this.powerGenerated) {
        this.consumptionResult = `Your daily consumption of ${this.dailyConsumption} kWh exceeds the generated power of ${this.powerGenerated.toFixed(2)} kWh/day.`;
      } else {
        this.consumptionResult = `Your generated power of ${this.powerGenerated.toFixed(2)} kWh/day is sufficient for your daily consumption of ${this.dailyConsumption} kWh.`;

        // Calculate savings in Rand
        const differenceInKWh = this.powerGenerated - this.dailyConsumption;
        const savings = differenceInKWh * this.conversionRate;
        this.savingsInRand = savings * this.randPerKWh;
      }
    }
  },

}
</script>

<style>
/* Styles remain the same */
.solar-calculator {
  max-width: 700px;
  margin: auto;
  padding: 20px;
  /* background: #f7f7f7; */
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  /* display: grid; */
  gap: 10px;
  justify-content: space-between;
  padding-top: 50px;
  padding-bottom: 100px;
}

.form-group {
  margin-bottom: 15px;
  flex: 1 1 calc(50% - 20px);
  min-width: 250px;
}

label {
  font-weight: bold;
  display: block;
}

input,
select,
.btn {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
}

.btn {
  background: #ff5722;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #ff5725;
}

h2,
h3,
h4 {
  color: #333;
  margin: 0;
  padding: 10px 0;
}

.out {
  flex: 1 1 calc(100% - 20px);
}

@media (min-width: 768px) {
  .out {
    flex: 1 1 calc(50% - 20px);
  }
}
</style>
