<template>
    <div class="container-fluid mt-5">
        <div class="row">

            <div class="col-md-4 col-xl-3 col-xxl-3 col-lg-4">
                <img class="card-img-top w-100" :src="this.user.avatar ? this.user.avatar : require('@/assets/profile.png')"
                    alt="User avatar">
                <button type="submit_sec" @click="startEdit">Редактировать</button>

            </div>

            <div class="col-md-4 profile-info" v-if="!editMode">
                <H3>{{ this.user.firstName ? this.user.firstName + " " + this.user.lastName : 'заполните страничку!' }}</H3>
                <p>{{ this.user.age ? this.user.age + ' года' : 'тут должен быть ваш возраст...' }}</p>
                <hr>
                <div class="profile_details">
                    <p><b>Телефон </b>:</p>
                    <p>{{ this.user.username || 'заполните страничку!' }}</p>
                </div>
                <div class="profile_details">
                    <p><b>Почта</b>:</p>
                    <p> {{ this.user.email || 'заполните страничку!' }}</p>
                </div>
                <div class="profile_details">
                    <p><b>Пол</b>:</p>
                    <p>{{ this.user.male || 'заполните страничку!' }}</p>
                </div>
                <div class="profile-details" style="margin-top: 15px;">
                    <p><b>Подробнее</b> </p>
                </div>
                <div class="profile-description">
                    <p>{{ this.user.details || 'заполните страничку!' }}</p>
                </div>
            </div>
            <div class="col-md-4 form_insert " v-if="editMode">
                <form @submit.prevent="updateUser">
                    <label for="firstName" >Имя:</label>
                    <input v-model="editableUser.firstName" class="form-control" id="firstName">

                    <label for="lastName">Фамилия:</label>
                    <input v-model="editableUser.lastName" class="form-control" id="lastName">

                    <label class="form_insert" for="birthDate">Дата рождения:</label>
                    <input v-model="editableUser.birthDate" class="form-control" id="birthDate">

                    <label for="email">email:</label>
                    <input v-model="editableUser.email" class="form-control" id="email">

                    <label for="male">Пол:</label>
                    <select v-model="editableUser.male" class="form-control" id="male">
                        <option value="">Не указано</option>
                        <option value="true">Мужчина</option>
                        <option value="false">Женщина</option>
                    </select>

                    <label for="phone">Телефон:</label>
                    <input type="tel" class="form-control" v-model="editableUser.phone" id="phone" v-mask="'+7 (###) ###-####'"
                        placeholder="+7 (___) ___-____">

                    <label for="details">Подробнее:</label>
                    <input v-model="editableUser.details" class="form-control" id="details">
                    <div class="justify_details">
                        <button type="submit_sec">Сохранить</button>
                        <button type="submit_sec" @click="cancelEdit">Отменить</button>
                    </div>

                </form>
            </div>
        </div>
        <div class="row" style="margin-top: 25px;">
            <div class="col-xl-12">
                <div>
                    <h3>Объявления {{ this.user.firstName ? this.user.firstName + '(а)' : 'заполните страничку!' }}</h3>
                </div>
                <hr>
                <div class="lost-pet-list">
                    <LostPetCard v-for="(pet, index) in lostPets" :key="index" :pet="pet" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.profile-info {
    text-align: left;
}

.profile_details {
    max-width: 380px;
    justify-content: space-between;
    display: flex;
    padding: 0;
    margin: 0;
}

.profile_details p {
    margin-bottom: 0;
    margin-top: 15px;
    padding: 0;
}

.profile-description {
    border: 1px solid;
}

.lost-pet-list {
    margin-left: 65px;
    padding-top: 60px;
    padding-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import LostPetCard from './LostPetCard.vue';
import { mask } from 'vue-the-mask'
export default {
    directives: { mask },
    components: {
        LostPetCard
    },
    data() {
        return {
            lostPets: [],
            user: {},
            editableUser: {},
            editMode: false
        }
    },

    methods: {

        async fetchAllPets(userId) {
            try {
                const response = await axios.post('http://localhost:9090/announcement/getAll', { userId });
                this.lostPets = response.data;
            } catch (error) {
                console.error('Error fetching all pets:', error);
            }
        },

        async getUsers() {
            try {
                const response = await axios.get(`http://localhost:8081/users/getUserByToken`);
                if (response.data) {
                    this.user = response.data
                    let imgPath = response.data.photo.replace(/\\/g, '/');
                    imgPath = imgPath.replace(/^src\//, '');
                    console.log(imgPath)
                    this.user.avatar = require(`@/${imgPath}`);

                    if (response.data.birthDate) {
                        this.user.age = this.calculateAge(response.data.birthDate);
                    }

                    if (response.data.male == true) {
                        this.user.male = 'Мужчина'
                    } else if (response.data.male == false) {
                        this.user.male = 'Женщина'
                    } else {
                        this.user.male = 'Не указан'
                    }
                    this.fetchAllPets(response.data.id); // Fetch all pets after user data is loaded
                }
            } catch (error) {
                console.error(error);
            }
        },
        calculateAge(birthDateString) {
            let parts = birthDateString.split(".");
            let birthDate = new Date(parts[2], parts[1] - 1, parts[0]);  // month is 0-indexed
            let today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age;
        },
        startEdit() {
            this.editableUser = { ...this.user };
            this.editMode = true;
        },


        updateUser() {
            axios.patch(`http://localhost:8081/users/editUser`, this.editableUser)
                .then(response => {
                    this.user = response.data;
                    this.editMode = false;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        cancelEdit() {
            this.editMode = false;
            this.editableUser = { ...this.user };
        }
    },

    mounted() {
        this.getUsers();
    }

}
</script>


