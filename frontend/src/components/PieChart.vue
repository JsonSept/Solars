<template>
    <div>
        <!-- Input fields for user data -->
        <label for="data">Values (comma-separated):</label>
        <input id="data" type="text" v-model="data" placeholder="" />
        <br><br>

        <label for="data">Values (comma-separated):</label>
        <input id="data" type="text" v-model="data1" placeholder="" />
        <br><br>

        <button @click="updateChart">Update Chart</button>
        <br><br>

        <!-- Canvas element for Chart.js -->
        <canvas id="myChart" style="width:50%;max-width:300px; height:60px"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'BarChart',
    data() {
        return {
            labels: 'Italy, Spain',
            data: '',
            data1: '',
            colors: 'green',
            colors1: 'blue',
            chart: null
        };
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        parseInput(input) {
            return input.split(',').map(item => item.trim());
        },
        renderChart() {
            const labels = this.parseInput(this.labels);
            const data = this.parseInput(this.data).map(Number);
            const data1 = this.parseInput(this.data1).map(Number);
            const difference = data.map((value, index) => value - data1[index] || 0);
            const colors = this.parseInput(this.colors);
            const colors1 = this.parseInput(this.colors1);
            const differenceColor = 'orange'; // Color for the difference dataset

            if (this.chart) {
                this.chart.destroy(); // Destroy the previous chart instance
            }

            this.chart = new Chart(document.getElementById('myChart'), {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Num 1',
                            backgroundColor: colors,
                            data
                        },
                        {
                            label: 'Num 2',
                            backgroundColor: colors1,
                            data: data1
                        },
                        {
                            label: 'Difference',
                            backgroundColor: differenceColor,
                            data: difference,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white',
                                display: true,
                            }
                        },
                        title: {
                            display: true,
                            text: 'Dynamic Bar Chart with Difference',
                            color: 'white'
                        }
                    }
                }
            });
        },
        updateChart() {
            this.renderChart(); // Re-render the chart with new data
        }
    }
};
</script>

<style scoped>
/* Optional styles for the component */
div {
    color:aliceblue;
}
.myChart {
    color:aliceblue;

}
</style>
