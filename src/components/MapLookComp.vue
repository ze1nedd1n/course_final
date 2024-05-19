<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4" style="margin: 2% 0%;" >
        <select v-model="selectedType" @change="filterMapDataByType" class="form-control" id="type">
          <option value="">Тип Объявления</option>
          <option v-for="typ in types" :key="typ"> {{ typ }} </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div style="height: 600px; width: 100%">
          <l-map v-if="filteredMapData.length > 0" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker v-for="item in filteredMapData" :key="item.announcementId"
              :lat-lng="[Number(item.coordinates.lat), Number(item.coordinates.lng)]"
              @click="goToAnnouncement(item.announcementId)"></l-marker>
          </l-map>
          <div v-else>Loading map...</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import axios from 'axios';
import { useRouter } from 'vue-router';
import 'leaflet/dist/leaflet.css';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  setup() {
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const zoom = ref(13);
    const center = ref([43.23798106012807, 76.88850402832033]); 
    const mapData = ref([]);
    const selectedType = ref('');
    const types = ref([]);
    const typeNames = {
      'FOUND': 'Найденные животные',
      'MISSING': 'Пропавшие животные',
      'GIVE': 'В добрые руки',
      'FROM_SHELTER': 'Животные в приютах'
    };

    const router = useRouter();
    const filteredMapData = computed(() => {
      if (!selectedType.value) {
        return mapData.value;
      }
      return mapData.value.filter(item => item.type === selectedType.value);
    });


    const fetchMapData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/map/');
        mapData.value = response.data;
        // Convert type codes to their names
        mapData.value.forEach(item => item.type = typeNames[item.type]);
        // Update types after fetching data
        types.value = [...new Set(mapData.value.map(item => item.type))];
      } catch (error) {
        console.error(error);
      }
    };

    const goToAnnouncement = (announcementId) => {
      router.push(`/pet/${announcementId}`);
    };

    const filterMapDataByType = () => {
      // Map will automatically be updated based on the reactive `filteredMapData` property
    };

    onMounted(fetchMapData);

    return { url, zoom, center, filteredMapData, goToAnnouncement, selectedType, types, filterMapDataByType };
  },
};
</script>
