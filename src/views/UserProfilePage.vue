<template>
  <div class="dashboard__wrapper">
    <DashboardProfile></DashboardProfile>
    <UserProfile></UserProfile>
  </div>
</template>
  
  <style>
    .dashboard__wrapper {
      display: flex;
      gap: 28px;
    }
  </style>
  
  <script>
  import UserProfile from '@/components/UserProfile.vue';
  import DashboardProfile from '@/components/DashboardProfile.vue';
  export default {
    name: 'userProfilePage',
    components: {
        UserProfile,
        DashboardProfile,
  }
  }
  </script>
  