<template>
  <div class="dashboard__container contact_info">
    <img src="@/assets/tabu-dashboard.png" alt="tabu logo" width="193" height="40" class="dashboard__logo">
    <h1 style="margin-bottom: 50px;">Контакты</h1>
    <p>{{user.firstName }}</p>
    <p> {{ user.phone }}</p>
    <p>{{ user.email }}</p>
    <button @click="callPhoneNumber" :disabled="!user.phone" class="call-button">
      Позвонить по номеру
    </button>
  </div>
</template>



<style>
  .dashboard__container {
    color: black;
    height: auto;
    width: 100%;
    max-width: 350px;
    padding: 64px 54px;
    background-color: #2A6877;
    display: flex; 
    flex-direction: column;
  }

  .dashboard__container h1 {
    font-weight: bold;
    color: #C7D9E5;
    font-family: 'Lexend', sans-serif;
    font-size: 48px;
  }

  .contact_info p{
    outline: 2px solid #2A6877;
    background-color: white;
    border-radius: 12px;
    padding: 12px;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    color: #2A6877;
    font-weight: 500;
 }

  @media (min-width:1600px) {
    .dashboard__container{
      max-width: 450px;
    }
  }

  .dashboard__logo {
    margin-left: auto;
    margin-bottom: 73px; 
  }

  .call-button {
  background-color: #B7D1D6;
  border: none;
  color: #2A6877;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 100px 0px 5px 0px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  font-weight: bold;
}

.call-button:hover {
  background-color: #91c9d4;
}
</style>

<script>
import axios from 'axios';
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  name: 'DashboardContact',
  data() {
    return {
      user: {},
    };
  },
  async created() {
    const { id } = this.$route.params;
    try {
      const response = await axios.get(`http://localhost:9090/announcement/${id}`);
      const pet = await response.data;
      const users = await axios.get(`http://localhost:8081/users/getById/${pet.userId}`);
      this.user = await users.data;
      this.user.phone = this.formatPhoneNumber(this.user.phone);
    } catch (error) {
      console.error('Ошибка получения информации о питомце:', error);
    }
  },  
  methods: {
    formatPhoneNumber(phoneNumber) {
      if (!phoneNumber) return '';
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
      }
      return phoneNumber;
    },
    callPhoneNumber() {
      if (this.user.phone) {
        window.open(`tel:${this.user.phone}`, '_self')
      }
    }
  },
};

</script>

