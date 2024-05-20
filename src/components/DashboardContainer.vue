<template>
  <div class="dashboard__container">
    <img src="@/assets/ORTA_logo.png" alt="orta logo" class="dashboard__logo">
    <MultiSelect />
  </div>
</template>



<style>
  .dashboard__container {
    color: black;
    height: auto;
    width: 100%;
    max-width: 350px;
    padding: 64px 54px;
    background-color: #f8f9fa;
    display: flex; 
    flex-direction: column;
  }

  @media (min-width:1600px) {
    .dashboard__container{
      max-width: 450px;
    }
  }

  .dashboard__logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5%;
  }
</style>


<script>
import { VueElement } from 'vue';
import MultiSelect from '@/components/MultiSelect.vue';
export default {
  name: 'DashboardContainer',
  props: {
    children: VueElement
  },
  components: {
    MultiSelect
  }
}
</script>
