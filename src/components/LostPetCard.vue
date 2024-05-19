<template>
<div class="card" style="width: 300px;">
  <div class="card-image">
  <img :src=pet.fileInfos[0].url class="card-img-top" alt="...">
</div>
  <div class="card-body">
    <h5 class="card-title"><b>{{ pet.title }}</b></h5>
    <p class="card-title"><b>Порода</b>:{{ pet.animal.breed }}</p>
    <p class="card-title"><b>Цвет</b>:{{ pet.animal.color }}</p>
    <p class="card-title"><b>Место</b>:{{ pet.district }}</p>
    <router-link :to="{ name: 'PetDetails', params: { id: pet.id } }" class="btn btn-success">Подробнее</router-link>
    <hr>  
    <p class="card-title">{{ pet.creationDate }}</p>
  </div>
</div>
</template>

<script>
export default {
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },methods:{
    goToItem(id) {
      this.$router.push({ name: "item-details", params: { itemId: id } });
    },
  }
};
</script>

<style scoped>
  .card{
    margin: 0 10px;
    text-align: left;
    border-radius: 12px;
  }
  .card-image {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    overflow: hidden;
  }

  .card-img-top {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
</style>
