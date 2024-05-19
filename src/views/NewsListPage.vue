<template>
  <div class="dashboard__wrapper">
    <DashboardProfile></DashboardProfile>

    <NewsList></NewsList>
  </div>
</template>

<style>
  .dashboard__wrapper {
    display: flex;
    gap: 28px;
  }
</style>

<script>
import NewsList from '@/components/NewsList.vue';
import DashboardProfile from '@/components/DashboardProfile.vue';
export default {
  name: 'NewsListPage',
  components: {
    NewsList,
    DashboardProfile,
}
}
</script>
