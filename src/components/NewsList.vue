<template>
  <div class="container" style="text-align: left; margin-top: 30px;">
    <div class="row">
      <div class="col-md-4" style="margin-bottom: 3%;">
        <label for="category" class="text-panel">Категория:</label>
        <select v-model="selectedCategory" @change="filterNewsByCategory" class="form-select" id="category">
          <option value="">Все</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="search" class="text-panel">Поиск по заголовку:</label>
        <input v-model="searchText" @input="filterNewsByTitle" type="text" class="form-control" id="search"
          placeholder="Введите заголовок...">
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col-md-8 col-sm-12 col-xl-8" v-for="news in newsData" :key="news.id">
        <div class="card">
          <img class="card-img-top " :src="news.cover_photo" alt="Cover photo">
          <div class="card-body">
            <h4 class="card-title"> <b>{{ news.title }}</b></h4>
            <p class="card-text">{{ news.description }}</p>


            <p class="card-date">{{ news.created_date }}</p>
          </div>
          <div class="card-footer justify_details ">
            <p class="card-author">Автор статьи: {{ news.author }}</p>
            <p class="card-category">{{ news.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newsData: [],
      allNews: [], // we keep a copy of all news to apply filters on
      selectedCategory: '',
      searchText: '',
      categories: [],
    }
  },
  created() {
    axios.get('http://localhost:8084/news/getNews')
      .then(response => {
        this.newsData = response.data;
        this.allNews = response.data;
        // get all unique categories
        this.categories = [...new Set(this.newsData.map(news => news.category))];
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    filterNewsByCategory() {
      if (this.selectedCategory) {
        this.newsData = this.allNews.filter(news => news.category === this.selectedCategory);
      } else {
        this.newsData = [...this.allNews]; // show all news when the selected category is "All"
      }
    },
    filterNewsByTitle() {
      this.newsData = this.allNews.filter(news => news.title.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }
}
</script>

<style scoped>
.text-panel {
  color: #000000;
  text-align: initial;
  font-size: 20px;
  font-family: 'Raleway', sans-serif;
}
</style>