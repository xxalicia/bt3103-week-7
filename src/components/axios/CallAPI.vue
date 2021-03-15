<template>
  <div class="chart">
    <h1 id='linechart'>Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./CallAPI.js";
export default {
  components: {
    'chart': Chart
  }
}
</script>

<style>
#linechart {
  text-align: center;
  background-color: #ffe6b3;
  padding: 20px;
  font-size: 50px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>