<script>
import axios from 'axios';
import UserDto from '@/model/UserDto';
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  name: 'AuthenticateForm',
  data() {
    return {
      user: new UserDto(),
      phoneNumber: ''
    };
  },
  methods: {
    authenticate() {
      axios.post('http://localhost:8081/authenticate', {
        username: this.phone,
        password: this.password
      }
      ).then(response => {
        localStorage.setItem('jwtToken', response.data.token);
        this.$router.push('/');
      }).catch(
      );
    },
    register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      axios.post('http://localhost:8081/users/create', {
        phone: this.phone,
        password: this.password,
        firstName: this.firstName,
        shelter: this.shelter
      })
        .then(response => {
          alert(response.data.message);
          this.$router.push('/');
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    },
    openTab(cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      tablinks = document.querySelectorAll(".tablinks");
      if (cityName === 'auth') {
        tablinks[0].classList.add('active')
        tablinks[1].classList.remove('active')
      } else {
        tablinks[1].classList.add('active')
        tablinks[0].classList.remove('active')
      }

      document.getElementById(cityName).style.display = "block";
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById("defaultOpen").click();
    }); ``
  },
};
</script>

<template>
  <div class="container-fluid  container-bg">
    
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-4 col-sm-0">
        <div class="image-container">
          <img src="@/assets/fox.png" class="w-100 img-fluid" alt="Your image description" />
        </div>
      </div>
      <div class="col-md-8 col-sm-12">
        <div class="login-container">
          <h2 class="auth-text">Авторизация</h2>
          <div class="tab">
            <button class="tablinks" @click.prevent="openTab('auth')" id="defaultOpen">Вход</button>
            <button class="tablinks" @click.prevent="openTab('register')">Регистрация</button>
          </div>
          <div id="auth" class="tabcontent">
            <form>
              <div class="form-group">
                <input type="tel" v-model="phone" id="phone" v-mask="'+7 (###) ###-####'" placeholder="+7 (___) ___-____">
              </div>
              <div class="form-group">
                <input type="password" v-model="password" id="password" placeholder="Введите пароль">
              </div>
              <button type="submit" @click.prevent="authenticate()">Войти</button>
            </form>
            <div class="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
          <div id="register" class="tabcontent">
            <form @submit.prevent="register">
              <div class="form-group-checkbox">
                <input type="checkbox" v-model="shelter">
                <label for="shelter" id="shelter">Приют:</label>
              </div>
              <div class="form-group">
                <label for="firstName"></label>
                <input type="text" id="firstName" v-model="firstName" required placeholder="Имя/Название:">
              </div>
              <div class="form-group">
                <input type="tel" v-model="phone" id="phone" v-mask="'+7 (###) ###-####'" placeholder="Номер телефона">
              </div>
              <div class="form-group">
                <input type="password" id="password" v-model="password" required placeholder="Пароль">
              </div>
              <div class="form-group">
                <input type="password" id="password" v-model="confirmPassword" required placeholder="Подтвердите пароль:">
              </div>
              <button type="submit" @click.prevent="register()">Регистрация</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>