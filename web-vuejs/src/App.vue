<template>
  <div id="app">
    <Map lat="48.852" long="2.346"/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Map from './components/Map.vue'

export default {
  name: 'app',
  components: {
  //  HelloWorld,
    Map
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
