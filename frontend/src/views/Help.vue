<template>
  <div class="help">
    <h1>Solar Track Calculator Help Guide</h1>
    <h2>Welcome to the Solar Track Calculator!</h2>
    This guide will walk you through the steps to use the app effectively, helping you understand how to calculate solar
    panel output, track energy consumption, and determine how much energy is sent back to the grid and its corresponding
    monetary value.

    <h2>Step 1: Input Solar Panel Details</h2>
    Solar Irradiance: Enter the average solar irradiance (in kWh/m²/day) for your location. You can find this
    information
    from reliable weather or solar radiation databases.
    Panel Efficiency: Input the efficiency of your solar panels. This is typically a percentage that indicates how well
    your panels convert sunlight into electricity.
    Solar Panel Array Surface Area (m²): Enter the total surface area of your solar panel array in square meters.
    <h2>Step 2: Calculate Solar Energy Output</h2>
    Once you’ve inputted the necessary data, the calculator will compute the total electricity output (in kWh) produced
    by
    your solar panels. This is the amount of energy your panels can generate under optimal conditions.

    <h2>Step 3: Enter Your Energy Consumption</h2>
    Daily Energy Consumption (kWh): Input your average daily energy usage. This information can usually be found on your
    electricity bill.
    <h2>Step 4: View Surplus Energy</h2>
    The app will compare your solar energy output with your daily energy consumption to calculate the surplus energy.
    This
    is the excess electricity that your panels generate, which you can send back to the grid.

    <h2>Step 5: Calculate Monetary Value</h2>
    Feed-In Tariff: Enter the current feed-in tariff, which is the rate paid by the grid for the electricity you send
    back. This is usually provided by your utility company.
    The calculator will then estimate how much money you can earn from the surplus energy fed into the grid.
    <h2>Step 6: Review Results</h2>
    After entering all the details, the app will display:

    Total Solar Energy Output (kWh)
    Energy Consumed (kWh)
    Energy Sent Back to the Grid (kWh)
    Estimated Earnings: The potential income from selling your surplus energy to the grid.

    <h2>Tips for Accurate Results</h2>
    Update Regularly: Keep your solar irradiance data up to date by regularly checking reliable sources.
    Review Tariff Rates: Tariff rates can change, so make sure you’re using the most current rate.
    Monitor Consumption: Your energy consumption may vary, so periodically adjust the input to reflect your actual
    usage.
    <h2>Troubleshooting</h2>
    If you encounter any issues:<br>

    Check Data Accuracy: Ensure all input data is correct and up-to-date.<br>
    Recalculate: If you receive unexpected results, double-check your entries and try recalculating.<br>
    Contact Support: If the issue persists, please contact our support team for assistance.
  </div>
</template>

<script>


export default {

}
</script>

<style>
.help {
  padding-top: 10%;
  padding-bottom: 12%;
  color:beige;
  height:100%;
}
</style>
