<template>
  <div id="app">
    <router-view></router-view>
    <BackTop></BackTop>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
