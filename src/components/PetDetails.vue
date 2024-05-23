<template>
  <div class="container" v-if="!loading">
    <div class="row" style="margin-top: 36px;">
      <div class="col-xl-6">
        <img :src="pet.img" class="card-img-top" alt="...">
      </div>
      <div class="col-xl-6 pet_details-text">
        <h4>{{ pet.title }}</h4>
        <p class="pet_details_title">Описание</p>
        <div class="pet_details">
          <p><b>Цена</b>:</p>
          <p>{{ pet.price }}</p>
        </div>

        <div class="pet_details">
          <p><b>Дата начало</b>:</p>
          <p>{{ pet.timeSpending }}</p>
        </div>
        <p class="pet_details_title" style="margin-top: 25px;">Подробнее</p>
        <p class="pet_details_details">{{ pet.description }}</p>
      </div>
      
      <div class="col-xl-12">
        <p class="pet_details_title" style="margin-top: 25px;">Место</p>
        <div style="width: 1000px; height: 380px;">
          <l-map v-if="pet" :zoom="zoom" :center="center" :id="`map-${pet.id}`" style="height: 100%; width: 100%;">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="markerLatLng"></l-marker>
          </l-map>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
.pet_details-text {
  text-align: left;
  font-family: 'Raleway', sans-serif;
}

.pet_details_details {
  max-width: 450px;
}

.pet_details {
  max-width: 380px;
  justify-content: space-between;
  border-bottom: 2px dotted;
  display: flex;
  padding: 0;
  margin: 0;
}

.pet_details p {
  margin-bottom: 0;
  margin-top: 15px;
  padding: 0;
}

.pet_details-text h4 {
  margin-bottom: 25px;
  font-weight: bold;
  text-align: left;
  font-family: 'Raleway', sans-serif;
}

.pet_details_title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0;
}

.pet__slider-wrapper {
  max-width: 500px;
}

.swiper-container {
  position: relative;
}

.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  font-size: 18px;
  line-height: 1;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 14px;
}

.swiper-button-next {
  right: 10px;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-navigation {
  display: none;
}
</style>

<script>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      pet: null,
      loading: true,
      zoom: 11,
      center: [43.2220, 76.8512], // Example coordinates
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      markerLatLng: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    try {
      const response = await axios.get(`http://localhost:9090/course/${id}`);
      this.pet = response.data;
      this.loading = false;
      this.markerLatLng = { lat: this.pet.lat, lng: this.pet.lng };
    } catch (error) {
      console.error('Ошибка получения информации о питомце:', error);
      this.loading = false;
    }
  },
  methods: {
    fetchCoordinates() {
      try {
        this.markerLatLng = { lat: this.pet.coordinates.lat, lng: this.pet.coordinates.lng };
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.fetchCoordinates();
  },
};
</script>
