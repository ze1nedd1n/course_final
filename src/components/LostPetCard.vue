<template>
<div class="card" style="width: 300px;">
  <div class="card-image">
  <img :src=pet.img class="card-img-top" alt="...">
</div>
  <div class="card-body">
    <h5 class="card-title"><b>{{ pet.title }}</b></h5>
    <p class="card-title"><b>Дата начала</b>:{{ formattedDate }}</p>
    <p class="card-title"><b>Стоимость</b>:{{ pet.price }}</p>
    <router-link :to="{ name: 'PetDetails', params: { id: pet.id } }" class="btn btn-success">Подробнее</router-link>
    <hr>  
    <p class="card-title">{{ pet.description }}</p>
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
  },
computed:{
  formattedDate() {
      const date = new Date(this.pet.timeSpending);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
},
  methods:{
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
