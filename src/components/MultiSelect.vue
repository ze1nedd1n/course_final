<template>
  <div class="text-decor">
    <div class="form-group">
      <label for="typeAnnouncement">Вид объявления</label>
      <select
        id="typeAnnouncement"
        class="form-select"
        v-model="selectedTypeAnnouncement"
      >
        <option disabled value="">Выберите тип объявления</option>
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
      <label for="animalType">Вид животного</label>
      <select id="animalType" class="form-select" v-model="selectedAnimalType">
        <option disabled value="">Выберите вид животного</option>
        <option v-for="item in animalType" :key="item.id" :value="item.type">
          {{ item.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="animalBreed">Порода животного</label>
      <select
        id="animalBreed"
        class="form-select"
        v-model="selectedAnimalBreed"
        :disabled="!animalBreed.length"
      >
        <option disabled value="">Выберите породу животного</option>
        <option v-for="item in animalBreed" :key="item.id" :value="item.name">
          {{ item.name }}
        </option>
      </select>
    </div>

    <p>
      Если у вас пропал питомец или же вы нашли его вы можете подать объявление о пропаже или находке собаки на нашем сайте. Постарайтесь дать как можно более полную информацию об обстоятельствах пропажи/находки. Прикрепите одну или несколько фото к объявлению, это существенно повысит шансы на успех.
    </p>

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
  color: #fff;
  text-align: initial;
  font-size: 20px;
  font-family: 'Raleway', sans-serif;
}

select {
  margin-bottom: 10px;
}
</style> 
