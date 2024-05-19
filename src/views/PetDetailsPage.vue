<template>
  <div class="dashboard__wrapper">
    <DashboardContact>
    </DashboardContact>
    <PetDetails></PetDetails>
  </div>
</template>

<style>
  .dashboard__wrapper {
    display: flex;
    gap: 28px;
  }
</style>

<script>
import PetDetails from '@/components/PetDetails.vue';
import DashboardContact from '@/components/DashboardContact.vue';
export default {
  name: 'PetDetailsPage',
  components: {
    PetDetails,
    DashboardContact,
}
}
</script>
