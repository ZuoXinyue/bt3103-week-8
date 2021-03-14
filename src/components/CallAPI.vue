<template>
  <div class="chart">
    <h1>Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./CallAPI.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
h1 {
  font-size: 70px;
  text-align: center;
  color:whitesmoke;
  background-color:rgb(131, 153, 185);
}
</style>