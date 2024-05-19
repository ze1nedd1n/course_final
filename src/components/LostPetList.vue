<template>
  <div>
    <div class="lost-pet-list">
      <LostPetCard
        v-for="(pet, index) in lostPets"
        :key="index"
        :pet="pet"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import LostPetCard from './LostPetCard.vue';
export default {
  components: {
    LostPetCard
  },
  data() {
    return {
      lostPets: [],
    };
  },
  computed: {
    ...mapState([
      'selectedTypeAnnouncement',
      'selectedAnimalType',
      'selectedAnimalBreed',
    ]),
  },
  watch: {
    selectedTypeAnnouncement() {
      this.sendDataToServer();
    },
    selectedAnimalType() {
      this.sendDataToServer();
    },
    selectedAnimalBreed() {
      this.sendDataToServer();
    },
  },
  mounted() {
    this.fetchAllPets();
  },
  methods: {
    async fetchAllPets() {
      try {
        const response = await axios.post('http://localhost:9090/announcement/getAll',{});
        this.lostPets = response.data;
      } catch (error) {
        console.error('Error fetching all pets:', error);
      }
    },
    async sendDataToServer() {
      if (
        !this.selectedTypeAnnouncement ||
        !this.selectedAnimalType ||
        !this.selectedAnimalBreed
      ) {
        return;
      }

      try {
        const response = await axios.post('http://localhost:9090/announcement/getAll', {
          typeAnnouncement: this.selectedTypeAnnouncement,
          animalType: this.selectedAnimalType,
          animalBreed: this.selectedAnimalBreed,
        });
        this.lostPets = response.data;
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    },
  },
};
</script>

<style>
.lost-pet-list {
  margin-left: 65px;
  padding-top: 60px;
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>