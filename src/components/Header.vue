<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a href="/"><img class="logo" src="@/assets/tabu.png" alt="Logo"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><a class="nav-link" href="/announcementCreate" @click.prevent="checkAndRedirect">Подать объявление</a></li>
            <li class="nav-item"><a class="nav-link" href="/list">Объявления</a></li>
            <li class="nav-item"><a class="nav-link" href="/maps">Карта</a></li>
            <li class="nav-item"><a class="nav-link" href="/news">Новости</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Зооуслуги</a></li>
          </ul>
          <div class="profile">
            <div class="dropdown">
              <a href="#" id="profileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <span v-if="!isAuthenticated || !avatarUrl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#7C7C7D"
                    class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                </span>
                <img v-if="isAuthenticated && avatarUrl" :src="avatarUrl" class="rounded-circle" height="32" width="32"
                  style="margin-left: 15px;">
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                <a class="dropdown-item" href="#" @click="goToProfile">Личный кабинет</a>
                <a class="dropdown-item" href="#">Настройки</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="logout">Выход</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
.navbar {
  background-color: #C7D9E5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 20px;
}

.logo-profile {
  height: 50px;
  margin-left: 15px;
}

.nav-link {
  color: #2A6877;
  font-weight: bold;
}

.nav-link:hover {
  color: #ffffff;
}

.dropdown-menu {
  border-radius: 0;
}

.dropdown-item {
  font-weight: bold;
  color: #2A6877;
}

.dropdown-item:hover {
  color: #ffffff;
  background-color: #2A6877;
}
</style>

<script>
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';

export default {
  name: 'HeaderVue',
  data() {
    return {
      isAuthenticated: false,
      avatarUrl: null,
    };
  },
  mounted() {
    this.checkAuthentication();
  },
  watch: {
    '$route': function () {
      this.checkAuthentication();
    },
  },
  methods: {
    authenticate() {
      this.isAuthenticated = !this.isAuthenticated;
    },
    goToProfile() {
      if (this.isAuthenticated) {
        this.$router.push('/profile');
      } else {
        this.$router.push('/authenticate');
      }
    },
    logout() {
      localStorage.removeItem('jwtToken');
      this.isAuthenticated = false;
      this.$router.push('/'); // Перенаправляем на главную страницу после выхода
    },
    checkAuthentication() {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        this.isAuthenticated = true;
        this.avatarUrl = require('@/assets/avatar.jpg'); // Замените на путь к изображению аватара пользователя
      } else {
        this.isAuthenticated = false;
        this.avatarUrl = null;
      }
    },
    checkAndRedirect() {
      if (!this.isAuthenticated) {
        this.$router.push('/authenticate');
      } else {
        this.$router.push('/announcementCreate');
      }
    },
  },
};
</script>
