<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-6">
        <div class="create-lost-pet">
          <h2 style="margin-top: 25px; font-weight: bold; margin-bottom: 25px;" >Основная информация</h2>
          <div class="create_details">
            <!-- Что произошло с питомцем? -->
            <div class="form-group">
              <label for="typeAnnouncement">Что произошло с питомцем?</label>
              <select id="typeAnnouncement" class="form-select" v-model="formData.type">
                <option disabled value="">Выберите тип объявления</option>
                <option v-for="item in typeAnnouncement" :key="item.id" :value="item.type">
                  {{ item.name }}
                </option>
              </select>
            </div>

            <!-- Имя питомца? -->
            <div class="form-group">
              <label for="animalName">Имя питомца?</label>
              <textarea id="animalName" class="form-control" style="height: 17px;"
                v-model="formData.animal.animalName"></textarea>
            </div>
          </div>


          <div class="create_details">
            <!-- Вид питомца? -->
            <div class="form-group">
              <label for="animalType">Вид питомца?</label>
              <select id="animalType" class="form-select" v-model="formData.animal.type" @change="onAnimalTypeChange">
                <option disabled value="">Выберите вид животного</option>
                <option v-for="item in animalType" :key="item.id" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <!-- Цвет животного? -->
            <div class="form-group">
              <label for="animalColor">Цвет животного?</label>
              <select id="animalColor" class="form-select" v-model="formData.animal.color">
                <option disabled value="">Выберите цвет животного</option>
                <option v-for="item in animalColors" :key="item.id" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>




          <!-- Порода питомца? -->
          <div class="form-group" v-if="formData.animal.type !== ''">
            <label for="animalBreed">Порода питомца?</label>
            <select id="animalBreed" class="form-select" v-model="formData.animal.breed">
              <option disabled value="">Выберите породу животного</option>
              <option v-for="item in animalBreeds" :key="item.id" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>

          <!-- Пол питомца? -->
          <!-- <div class="form-group">
            <label for="animalGender">Пол питомца?</label>
            <select id="animalGender" class="form-select" v-model="formData.animalGender">
              <option disabled value="">Выберите пол животного</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div> -->

          <!-- Подробности -->
          <div class="form-group">
            <label for="details">Подробности</label>
            <textarea id="details" class="form-control" v-model="formData.details"></textarea>
          </div>

          <h2 style="margin-top: 25px; font-weight: bold; margin-bottom: 10px;" >Место пропажи\Находки</h2>
          <!-- Район? -->
          <div class="form-group">
            <label for="district">Район?</label>
            <select id="district" class="form-select" v-model="formData.district">
              <option disabled value="">Выберите район</option>
              <option v-for="item in districts" :key="item.id" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
          <!-- Координаты -->
          <div class="form-group" style="height: 300px;">
            <label>Координаты</label>
            <l-map style="width: 100%;" :zoom="zoom" :center="center" @load="onMapLoad"
              @click="onMapClick">
              <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              <l-marker v-if="markerLatLng" :lat-lng="markerLatLng" @update:lat-lng="updateCoordinates"></l-marker>
            </l-map>
          </div>

          <!-- Загрузить фотографии животного -->
          <div class="form-group" style="margin-top: 45px;">
            <h2 style="margin-top: 25px; font-weight: bold; margin-bottom: 10px;" >Добавить фотографию питомца</h2>
            <input id="animalPhotos" type="file" class="form-control" @change="onFileChange" multiple />
          </div>

          <!-- Кнопка Создать -->
          <button class="btn btn-primary" @click="submitForm" style="margin-bottom: 25px;">Создать</button>
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <img src="@/assets/cat2.png" class="w-100 img-fluid" alt="Your image description" />
        </div>
      </div>




    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'AnnouncementCreate',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      typeAnnouncement: [],
      animalType: [],
      animalBreeds: [],
      animalColors: [
        { id: 1, name: 'Белый' },
        { id: 2, name: 'Чёрный' },
        { id: 3, name: 'Коричневый' },
        { id: 4, name: 'Серый' },
        { id: 5, name: 'Оранжевый' },
        { id: 6, name: 'Тигровый' },
        { id: 7, name: 'Табби' },
        { id: 8, name: 'Трехцветный' },
        { id: 9, name: 'Другой' },
      ],
      districts: [
        { id: 1, name: 'Алатауский район' },
        { id: 2, name: 'Алмалинский район' },
        { id: 3, name: 'Ауэзовский район' },
        { id: 4, name: 'Бостандыкский район' },
        { id: 5, name: 'Жетысуский район' },
        { id: 6, name: 'Медеуский район' },
        { id: 7, name: 'Наурызбайский район' },
        { id: 8, name: 'Турксибский район' },
      ],
      formData: {
        animal: {
          animalName: '',
          type: '',
          breed: '',
          color: '',
          description: '',
        },
        coordinates: null,
        type: '',
        status: 'ACTIVE',
        phoneNumber: '',
        userId: '',
        details: '',
        district: '',
      },
      files: [],
      zoom: 13,
      center: { lat: 43.2220, lng: 76.8512 }, // Координаты по умолчанию (например, центр Алматы)
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      markerLatLng: { lat: 43.2220, lng: 76.8512 },
    };
  },
  async mounted() {
    try {
      const userResponse = await axios.get('http://localhost:8081/users/getUserByToken')
      this.formData.userId = userResponse.data.id;
      this.formData.phoneNumber = userResponse.data.username;

      // Здесь продолжаются остальные запросы fetch...
      this.fetchTypeAnnouncement();
      this.fetchAnimalType();
      this.fetchAnimalColors();
      this.fetchDistricts();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  methods: {
    async fetchTypeAnnouncement() {
      try {
        const response = await axios.get('http://localhost:8087/dict/getTypeAnnouncement');
        this.typeAnnouncement = [...response.data];
      } catch (error) {
        console.error('Error fetching type announcement:', error);
      }
    },
    async fetchAnimalType() {
      try {
        const response = await axios.get('http://localhost:8087/dict/getType');
        this.animalType = [...response.data];
      } catch (error) {
        console.error('Error fetching animal type:', error);
      }
    },
    async fetchAnimalColors() {
      try {
        const response = await axios.get('http://localhost:8087/dict/getTypeAnnouncement');
        this.animalColor = [...response.data];
      } catch (error) {
        console.error('Error fetching type announcement:', error);
      }
    },
    async fetchDistricts() {
      try {
        const response = await axios.get('http://localhost:8087/dict/getTypeAnnouncement');
        this.district = [...response.data];
      } catch (error) {
        console.error('Error fetching type announcement:', error);
      }
    },
    onFileChange(event) {
      this.files = Array.from(event.target.files);
    },
    async onAnimalTypeChange() {
      try {
        const breedObj = this.animalType.find(item => item.name === this.formData.animal.type);

        console.log(breedObj)
        const response = await axios.get(`http://localhost:8087/dict/getBreed/${breedObj.type}`);
        this.animalBreeds = response.data;
      } catch (error) {
        console.error('Error fetching animal breed:', error);
      }
    },
    async submitForm() {
      try {
        // Проверка на наличие загруженных файлов
        if (this.files.length === 0) {
          alert("Пожалуйста, загрузите хотя бы одну фотографию животного перед созданием объявления.");
          return;
        }
        const originalAnimalType = this.formData.animal.type;
        const animalTypeObj = this.animalType.find(item => item.name === this.formData.animal.type);
        console.log( "originalAnimalType: " + originalAnimalType)
        console.log( "animalTypeObj: " + animalTypeObj.type)
        console.log( "animalTypeObj: " + animalTypeObj.name)
        this.formData.animal.type = animalTypeObj.type;
        const response = await axios.post('http://localhost:9090/announcement/save', this.formData);
        const announcementId = response.data.id;
        const formData = new FormData();
        this.files.forEach(file => {
          formData.append('file', file);
        });
        formData.append('announcementId', announcementId);
        await axios.post('http://localhost:9090/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.formData.animal.type = originalAnimalType;
        // Перенаправление на новую страницу после успешной отправки формы
        this.$router.push('/list');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },

    onMapLoad() {
      this.$nextTick(() => {
        this.markerLatLng = this.center;
        this.formData.coordinates = this.markerLatLng;
      });
    },
    updateCoordinates(newVal) {
      this.formData.coordinates = newVal;
    },
    onMapClick(event) {
      this.markerLatLng = event.latlng;
      this.formData.coordinates = event.latlng;
    },
  },
};
</script>
<style scoped>

.create-lost-pet{
  text-align: left;
  font-weight: bold;
}
.create-lost-pet .form-group {
  margin-bottom: 1rem;
}

.img-create-ann img { 
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}


.create_details {
  justify-content: space-between;
  display: flex;
  padding: 0;
  margin: 0;
}
</style>