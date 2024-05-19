<template>
  <div class="dashboard__wrapper">
    <!-- <DashboardProfile></DashboardProfile> -->
    <MapLookComp></MapLookComp>
  </div>
</template>

<style>
.dashboard__wrapper {
  display: flex;
  gap: 28px;
}
</style>

<script>
import MapLookComp from '@/components/MapLookComp.vue';
// import DashboardProfile from '@/components/DashboardProfile.vue';
export default {
  name: 'MapLookCompPage',
  components: {
    MapLookComp,
    // DashboardProfile,
}
}
</script>
