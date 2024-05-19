<script>
import 'bootstrap/dist/js/bootstrap.min.js';

export default {
  name: 'HeaderVue',
};

</script>

<template>
  <div class="container-fluid container-bg-home">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="text-heading">
            <h1>ORTA</h1>
            <h4>Разместите свой курс обучение.</h4>
            <p>Вы образовательное учереждение? Но у вас нет сайта для размещение своих курсов? Не проблема! Вы можете разместить свои курсы в нашем сайте для набора студентов со всей страны! </p>
            <button class="tablinks" @click.prevent="openTab('auth')" id="defaultOpen">Подать заявку</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="image-container-home">
          <img src="@/assets/calling_man.png" class="w-100 img-fluid"  alt="Your image description" />
          </div>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="image-container-home">
          <img src="@/assets/search_course.png" class="w-100 img-fluid"  alt="Your image description" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="text-heading">
            <h1>ORTA</h1>
            <h4>Хотите обучится курсу?</h4>
            <p> Если вы ищете качественный и информативный курс, который поможет вам достичь новых высот в вашей карьере, вы на правильном пути! Не упустите эту возможность – переходите по ссылке и начните обучение уже сегодня! Вы получите знания и навыки, которые откроют перед вами множество новых возможностей. </p>
            <a href="/list"  class="nav-link">Тогда переходи по этой ссылке!</a>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

