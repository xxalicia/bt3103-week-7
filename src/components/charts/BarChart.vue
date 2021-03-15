<template>
  <div class="chart">
    <h1 id='barchart'>Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    'chart': Chart
  }
}
</script>

<style>

#barchart {
  text-align: center;
  background-color: #ffe6b3;
  padding: 20px;
  font-size: 50px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>