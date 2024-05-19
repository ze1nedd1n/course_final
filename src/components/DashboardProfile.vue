<template>
    <div class="dashboard__container">
      <img src="@/assets/tabu-dashboard.png" alt="tabu logo" width="193" height="40" class="dashboard__logo">
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

    @media (width < 750px) {
      .dashboard__container{
        display: none;
      }
    }
  
    .dashboard__logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 70%;
      height: 70%;
      margin: 5%
    }
  </style>
  
  
  <script>
  import { VueElement } from 'vue';
  export default {
    name: 'DashboardContainer',
    props: {
      children: VueElement
    },
  }
  </script>
  