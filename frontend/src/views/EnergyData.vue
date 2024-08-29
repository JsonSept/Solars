<template>
  <div class="data text-light">
    <h1>Solar Irradiance Estimation</h1>
    <div>
      <input v-model="location" placeholder="Enter location (e.g., city name)">
      <button @click="fetchWeatherData">Search</button>
    </div>

    <!-- Input fields for solar array surface area, panel efficiency, and daily consumption -->
    <div class="form-group">
      <label for="panelArea">Solar Array Surface Area (m²)</label>
      <input type="number" id="panelArea" v-model="panelArea" placeholder="e.g., 10" min="0">
    </div>

    <div class="form-group">
      <label for="efficiency">Panel Efficiency</label>
      <select id="efficiency" v-model="efficiency">
        <option value="15">Standard (15%)</option>
        <option value="18">High Efficiency (18%)</option>
        <option value="20">Premium (20%)</option>
      </select>
    </div>

    <div class="form-group">
      <label for="dailyConsumption">Daily Consumption (kWh)</label>
      <input type="number" id="dailyConsumption" v-model="dailyConsumption" placeholder="e.g., 5" min="0">
    </div>

    <!-- Display weather data and the bar chart -->
    <div v-if="weatherData.length">
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Cloud Cover (%)</th>
            <th>Estimated Solar Irradiance (W/m²)</th>
            <th>Temperature (°C)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(weather, index) in weatherData" :key="index">
            <td>{{ formatDateTime(weather.dateTime) }}</td>
            <td>{{ weather.clouds }}</td>
            <td>{{ estimateIrradiance(weather.clouds) }}</td>
            <td>{{ weather.temp }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="totalPowerOutput !== null">
        <h2>Total Power Output: {{ totalPowerOutput }} kWh</h2>
        <h2>Net Power After Consumption: {{ netPowerOutput }} kWh</h2>
      </div>
      <div>
        <canvas id="bar" width="400" height="200"></canvas>
      </div>
    </div>
    <div v-else>
      <p>No data available. Please enter a valid location.</p>
    </div>
  </div>
</template>

<script>
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale);

export default {
  data() {
    return {
      location: '',
      weatherData: [],
      apiKey: 'e945d7f71eb0e5e621a7dfcce2cb1a43',
      panelArea: 10,
      efficiency: 15,
      dailyConsumption: 5,
      totalPowerOutput: null,
      netPowerOutput: null,
    };
  },
  methods: {
    estimateIrradiance(cloudCover) {
      const clearSkyIrradiance = 1000; // Example clear-sky value in W/m²
      return clearSkyIrradiance * (1 - cloudCover / 100);
    },
    formatDateTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    },
    async fetchWeatherData() {
      if (!this.location) {
        alert('Please enter a location.');
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&appid=${this.apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== "200") {
          alert('Location not found.');
          this.weatherData = [];
          this.totalPowerOutput = null;
          this.netPowerOutput = null;
          return;
        }

        const today = new Date().toISOString().split('T')[0];
        this.weatherData = data.list
          .filter(item => {
            const itemDate = new Date(item.dt * 1000).toISOString().split('T')[0];
            return itemDate === today;
          })
          .map(item => ({
            dateTime: item.dt,
            clouds: item.clouds.all,
            temp: item.main.temp,
          }));

        this.calculatePowerOutputs();
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    calculatePowerOutputs() {
      if (this.weatherData.length === 0 || !this.panelArea || !this.efficiency) {
        this.totalPowerOutput = null;
        this.netPowerOutput = null;
        return;
      }

      const totalIrradiance = this.weatherData.reduce((sum, weather) => {
        return sum + this.estimateIrradiance(weather.clouds);
      }, 0);

      const panelAreaInM2 = parseFloat(this.panelArea);
      const efficiencyInDecimal = parseFloat(this.efficiency) / 100;
      const hoursInForecast = this.weatherData.length * 3; // assuming 3-hour intervals
      this.totalPowerOutput = (totalIrradiance * panelAreaInM2 * efficiencyInDecimal * hoursInForecast) / 1000; // kWh

      const dailyConsumptionInKWh = parseFloat(this.dailyConsumption);
      this.netPowerOutput = this.totalPowerOutput - dailyConsumptionInKWh;

      this.drawChart();
    },
    drawChart() {
      const ctx = document.getElementById('bar').getContext('2d');

      if (!ctx) {
        console.error('Canvas context not found.');
        return;
      }

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Power Output', 'Daily Consumption', 'Net Power'],
          datasets: [{
            label: 'Energy (kWh)',
            data: [
              this.totalPowerOutput || 0,
              this.dailyConsumption || 0,
              this.netPowerOutput || 0
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  },
  watch: {
    panelArea: 'calculatePowerOutputs',
    efficiency: 'calculatePowerOutputs',
    dailyConsumption: 'calculatePowerOutputs'
  }
};
</script>

<style scoped>
body {
  padding-bottom: 30%;
}

input,
select {
  padding: 8px;
  margin: 8px 0;
}

button {
  padding: 8px;
}

table {
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border: 1px solid #050505;
}

th {
  background-color: #000000;
}

canvas {
  margin-top: 16px;
  background-color: #564646;
}
</style>
