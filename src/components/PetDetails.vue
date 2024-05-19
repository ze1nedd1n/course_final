<template>
  <div class="container" v-if="!loading">
    <div class="row" style="margin-top: 36px;">
      <div class="col-xl-8 pet__slider-wrapper">
        <div class="swiper-container">
          <swiper :slides-per-view="1" :space-between="10" :navigation="false" @swiper="onSwiper">
            <swiper-slide v-for="fileInfo in pet.fileInfos" :key="fileInfo.id">
              <img :src="fileInfo.url" :alt="fileInfo.name" class="w-100" />
            </swiper-slide>
          </swiper>
          <div class="swiper-button-next" @click="nextSlide"></div>
          <div class="swiper-button-prev" @click="prevSlide"></div>

          <div class="gallery">
            <div v-for="(fileInfo, index) in pet.fileInfos" :key="fileInfo.id" @click="goToSlide(index)">
              <img :src="fileInfo.url" :alt="fileInfo.name" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 pet_details-text">
        <h4>{{ pet.title }} {{ pet.shortAddress }}</h4>
        <p class="pet_details_title">Описание</p>
        <div class="pet_details">
          <p><b>Порода</b>:</p>
          <p>{{ pet.animal.breed }}</p>
        </div>

        <div class="pet_details">
          <p><b>Цвет</b>:</p>
          <p>{{ pet.animal.color }}</p>
        </div>

        <div class="pet_details">
          <p><b>Место</b>:</p>
          <p>{{ pet.district }}</p>
        </div>

        <p class="pet_details_title" style="margin-top: 25px;">Подробнее</p>
        <p class="pet_details_details">{{ pet.details }}</p>
        <p class="pet_details_title" style="margin-top: 25px;">Место пропажи</p>
        <div style="width: 500px; height: 380px;">
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


<style scoped> .pet_details-text {
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

 .gallery {
   align-items: center;
   display: flex;
   justify-content: center;
   /* gap: 10px;
  margin-top: 20px; */
 }

 .gallery img {
   width: 100px;
   height: auto;
   cursor: pointer;
   height: 100% !important;
   object-fit: cover;
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
import 'bootstrap/dist/css/bootstrap.css'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';




export default {
  components: {
    Swiper,
    SwiperSlide,
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      pet: null,
      loading: true,
      zoom: 11,
      center: [43.2220, 76.8512], // Координаты по умолчанию (например, центр Парижа)
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      markerLatLng: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    try {
      const response = await axios.get(`http://localhost:9090/announcement/${id}`);
      this.pet = await response.data;
      // other initialization code...
      this.loading = false; // set loading to false once data has been fetched
      this.markerLatLng = { lat: this.pet.coordinates.lat, lng: this.pet.coordinates.lng };
    } catch (error) {
      console.error('Ошибка получения информации о питомце:', error);
      this.loading = false; // also set loading to false if an error occurred
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
    },
    nextSlide() {
      if (this.swiper) {
        this.swiper.slideNext();
      }
    },
    prevSlide() {
      if (this.swiper) {
        this.swiper.slidePrev();
      }
    },
    goToSlide(index) {
      if (this.swiper) {
        this.swiper.slideTo(index);
      }
    },
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
