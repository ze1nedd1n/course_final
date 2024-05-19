<template>
  <div>
    <HeaderVue />
  </div>
  <div id="app">
    <router-view></router-view>
  </div>
  <Footer/>
</template>


<script>
import router from './router';
import HeaderVue from './components/Header.vue'
import Footer from './components/Footer.vue';  
export default {
  name: 'App',
  router,
  components: {
    HeaderVue,
    Footer
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #C7D9E5;
}
</style>
