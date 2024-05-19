<template>
  <div class="dashboard__wrapper">
    <DashboardContainer>
    </DashboardContainer>

    <LostPetList></LostPetList>
  </div>
</template>

<style>
  .dashboard__wrapper {
    display: flex;
    gap: 28px;
  }
</style>

<script>
import LostPetList from '@/components/LostPetList.vue';
import DashboardContainer from '@/components/DashboardContainer.vue';
export default {
  name: 'LostPetListPage',
  components: {
    LostPetList,
    DashboardContainer,
}
}
</script>
