<template>
  <div class="text-decor">
    <div class="form-group">
      <label for="typeAnnouncement">Выберите категорию курса</label>
      <select
        id="typeAnnouncement"
        class="form-select"
        v-model="selectedTypeAnnouncement"
      >
        <option disabled value="">Выберите категорию курса</option>
        <option
          v-for="item in typeAnnouncement"
          :key="item.id"
          :value="item.type"
        >
          {{ item.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="animalType">Выберите вид обучение</label>
      <select id="animalType" class="form-select" v-model="selectedAnimalType">
        <option disabled value="">Выберите вид обучение</option>
        <option v-for="item in animalType" :key="item.id" :value="item.type">
          {{ item.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="animalBreed">Выберите диапазон цены</label>
      <select
        id="animalBreed"
        class="form-select"
        v-model="selectedAnimalBreed"
        :disabled="!animalBreed.length"
      >
        <option disabled value="">Выберите диапазон цены</option>
        <option v-for="item in animalBreed" :key="item.id" :value="item.name">
          {{ item.name }}
        </option>
      </select>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      selectedTypeAnnouncement: null,
      selectedAnimalType: null,
      selectedAnimalBreed: null,
    };
  },
  computed: {
    ...mapState([
      'typeAnnouncement',
      'animalType',
      'animalBreed',
    ]),
  },
  watch: {
    selectedTypeAnnouncement(newVal) {
      this.setSelectedTypeAnnouncement(newVal);
    },
    selectedAnimalType(newVal) {
      this.setSelectedAnimalType(newVal);
      if (newVal) {
        this.fetchAnimalBreed(newVal);
      } else {
        this.setAnimalBreed([]); // Очистить породы животных при сбросе выбора
      }
    },
    selectedAnimalBreed(newVal) {
      this.setSelectedAnimalBreed(newVal);
    },
  },
  mounted() {
    this.fetchTypeAnnouncement();
    this.fetchAnimalType();
  },
  methods: {
    ...mapActions([
      'fetchTypeAnnouncement',
      'fetchAnimalType',
      'fetchAnimalBreed',
    ]),
    ...mapMutations([
      'setSelectedTypeAnnouncement',
      'setSelectedAnimalType',
      'setSelectedAnimalBreed',
      'setAnimalBreed',
    ]),
  },
};
</script>

<style scoped>
.multiselect {
  color: #000;
  display: flex;
  flex-direction: column;
}

.multiselect-filter {
  text-align: left;
  color: #000;
  max-width: 500px;
}

.text-decor {
  color: #5aa8dc;
  text-align: initial;
  font-size: 20px;
  font-family: 'Raleway', sans-serif;
}

select {
  margin-bottom: 10px;
}
</style> 
