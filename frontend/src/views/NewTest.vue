<template>
  <div class="weather-container">
    <h2>Search Weather Data</h2>
    
    <div class="search-bar">
      <input 
        type="text" 
        v-model="location" 
        placeholder="Enter location" 
        @keyup.enter="fetchWeatherData" 
      />
      <button @click="fetchWeatherData">Search</button>
    </div>

    <div v-if="combinedData">
      <h3>Weather Data for {{ location }} - {{ today }}</h3>

      <h4>Today's Forecast Data (Midnight to 9 PM)</h4>
      <table class="weather-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (°C)</th>
            <th>Weather</th>
            <th>Wind Speed (m/s)</th>
            <th>Estimated Solar Irradiance (W/m²)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in combinedData.forecast" :key="item.dt">
            <td>{{ formatTime(item.dt_txt) }}</td>
            <td>{{ item.main.temp }}</td>
            <td>{{ item.weather[0].description }}</td>
            <td>{{ item.wind.speed }}</td>
            <td>{{ calculateSolarIrradiance(item.clouds.all) }}</td>
          </tr>
        </tbody>
      </table>

      <h4>Yesterday's Historical Data</h4>
      <table class="weather-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (°C)</th>
            <th>Weather</th>
            <th>Wind Speed (m/s)</th>
            <th>Estimated Solar Irradiance (W/m²)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in combinedData.historical.hourly" :key="item.dt">
            <td>{{ formatTime(item.dt * 1000) }}</td>
            <td>{{ item.temp }}</td>
            <td>{{ item.weather[0].description }}</td>
            <td>{{ item.wind_speed }}</td>
            <td>{{ calculateSolarIrradiance(item.clouds) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: '', // User's input for location
      apiKey: 'e945d7f71eb0e5e621a7dfcce2cb1a43', // Replace with your actual OpenWeatherMap API key
      combinedData: null,
      today: new Date().toLocaleDateString(),
    };
  },
  methods: {
    fetchWeatherData() {
      if (!this.location) {
        alert("Please enter a location");
        return;
      }

      const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${this.location}&limit=1&appid=${this.apiKey}`;

      fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
          if (data.length === 0) {
            alert("Location not found. Please try again.");
            return;
          }
          
          const { lat, lon } = data[0];
          
          // Fetch Today's Weather Forecast using the coordinates
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;

          fetch(forecastUrl)
            .then(response => response.json())
            .then(forecastData => {
              // Filter forecast data to only include entries from midnight until 9 PM today
              const todayForecast = forecastData.list.filter(item => {
                const date = new Date(item.dt_txt);
                const hours = date.getHours();
                return (
                  date.toLocaleDateString() === this.today && 
                  hours >= 0 && hours <= 21 // Filtering from midnight (00:00) to 9 PM (21:00)
                );
              });

              // Fetch Yesterday's Historical Weather Data using the coordinates
              const unixTimestamp = Math.floor(Date.now() / 1000) - (24 * 60 * 60); // Unix timestamp for 24 hours ago
              const historicalUrl = `https://api.openweathermap.org/data/2.5/timemachine?lat=${lat}&lon=${lon}&dt=${unixTimestamp}&appid=${this.apiKey}&units=metric`;

              fetch(historicalUrl)
                .then(response => response.json())
                .then(historicalData => {
                  // Combine the data as needed
                  this.combinedData = {
                    location: this.location,
                    forecast: todayForecast,
                    historical: historicalData,
                  };
                })
                .catch(error => console.error('Error fetching historical data:', error));
            })
            .catch(error => console.error('Error fetching forecast data:', error));
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
    },
    formatTime(dateString) {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    },
    calculateSolarIrradiance(cloudiness) {
      const maxIrradiance = 1000; // Typical max solar irradiance in W/m² on a clear day
      const irradiance = maxIrradiance * (1 - cloudiness / 100);
      return irradiance.toFixed(2);
    },
  },
};
</script>

<style scoped>
.weather-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 60%;
}

.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.weather-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.weather-table th,
.weather-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.weather-table th {
  background-color: #f4f4f4;
  color: #555;
}

.weather-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.weather-table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
