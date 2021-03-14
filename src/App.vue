<template>
  <div>
    <h1>Xinyue's Outlet</h1>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 50px;
  text-align: center;
  color:lightpink;
  background-color:mintcream;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width: 70%;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>
