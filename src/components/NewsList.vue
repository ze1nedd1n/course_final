<template>
  <div class="container" style="text-align: left; margin-top: 30px;">
    <div class="row">
      <div class="col-md-4" style="margin-bottom: 3%;">
        <label for="category" class="text-panel">Категория:</label>
        <select v-model="selectedCategory" @change="filterFAQsByCategory" class="form-select" id="category">
          <option value="">Все</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="search" class="text-panel">Поиск по вопросу:</label>
        <input v-model="searchText" @input="filterFAQsByQuestion" type="text" class="form-control" id="search"
          placeholder="Введите вопрос...">
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col-md-8 col-sm-12 col-xl-8" v-for="faq in faqData" :key="faq.id">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title" @click="toggleAnswer(faq)"><b>{{ faq.question }}</b></h4>
            <transition name="fade">
              <p class="card-text" v-show="faq.showAnswer">{{ faq.answer }}</p>
            </transition>
            <p class="card-category">{{ faq.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      faqData: [],
      allFAQs: [],
      selectedCategory: '',
      searchText: '',
      categories: [],
    }
  },
  created() {
    // Здесь добавлены фейковые данные для демонстрации
    this.faqData = [
      { id: 1, question: 'Как купить курс?', answer: 'Vue.js — это прогрессивный JavaScript-фреймворк для создания пользовательских интерфейсов.', category: 'Общие', showAnswer: false },
      { id: 2, question: 'Как вернуть деньги за курс?', answer: 'Вы можете установить Vue.js через npm с помощью команды `npm install vue`.', category: 'Установка', showAnswer: false },
      { id: 3, question: 'Почему стоит использовать ваш сайт?', answer: 'Vue.js прост в освоении, имеет хорошую документацию и позволяет легко создавать интерактивные веб-приложения.', category: 'Общие', showAnswer: false },
      { id: 4, question: 'Где можно найти работу после ваших курсов?', answer: 'Документацию можно найти на официальном сайте Vue.js: https://vuejs.org.', category: 'Документация', showAnswer: false }
    ];
    this.allFAQs = [...this.faqData];
    this.categories = [...new Set(this.faqData.map(faq => faq.category))];
  },
  methods: {
    toggleAnswer(faq) {
      faq.showAnswer = !faq.showAnswer;
    },
    filterFAQsByCategory() {
      if (this.selectedCategory) {
        this.faqData = this.allFAQs.filter(faq => faq.category === this.selectedCategory);
      } else {
        this.faqData = [...this.allFAQs];
      }
    },
    filterFAQsByQuestion() {
      this.faqData = this.allFAQs.filter(faq => faq.question.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.text-panel {
  color: #000000;
  text-align: initial;
  font-size: 20px;
  font-family: 'Raleway', sans-serif;
}
</style>
