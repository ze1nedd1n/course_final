import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    typeAnnouncement: [],
    animalType: [],
    animalBreed: [],
    selectedTypeAnnouncement: null,
    selectedAnimalType: null,
    selectedAnimalBreed: null,
  },
  mutations: {
    setTypeAnnouncement(state, data) {
      state.typeAnnouncement = data;
    },
    setAnimalType(state, data) {
      state.animalType = data;
    },
    setAnimalBreed(state, data) {
      state.animalBreed = data;
    },
    setSelectedTypeAnnouncement(state, value) {
      state.selectedTypeAnnouncement = value;
    },
    setSelectedAnimalType(state, value) {
      state.selectedAnimalType = value;
    },
    setSelectedAnimalBreed(state, value) {
      state.selectedAnimalBreed = value;
    },
  },
  actions: {
    async fetchTypeAnnouncement(context) {
      try {
        const response = await axios.get('http://localhost:8087/dict/getTypeAnnouncement');
        context.commit('setTypeAnnouncement', response.data);
      } catch (error) {
        console.error('Error fetching type announcement:', error);
      }
    },
    async fetchAnimalType(context) {
      try {
        const response = await axios.get('http://localhost:8087/dict/getType');
        context.commit('setAnimalType', response.data);
      } catch (error) {
        console.error('Error fetching animal type:', error);
      }
    },
    async fetchAnimalBreed(context, type) {
      console.log('Fetching breeds for type:', type);
      try {
        const response = await axios.get(`http://localhost:8087/dict/getBreed/${type}`);
        context.commit('setAnimalBreed', response.data);
      } catch (error) {
        console.error('Error fetching animal breed:', error);
      }
    },
  },
});
