<!-- Разметка, структура сайта, шаблон -->
<template>
  <!-- шапка -->
  <div>
    <h2>Основное приложение</h2>
  </div>
  <div>
    Кол-во лайков: <strong>{{ likes }}</strong>
  </div>
  <!-- другой пример -->
  <div id="text">
    <h3>{{ text }}</h3>
  </div>
  <hr />
  <!-- слайдер -->
  <div>
    <Counter />
  </div>
  <hr />
  <!-- футтер -->
  <div>
    <socialVue />
  </div>
  <hr />
</template>

<!-- логика, данные и переменные, функции -->
<script>
import Counter from '../../counter.vue'
import socialVue from './PostPage.vue'
export default {
  // name: 'app',
  components: { Counter, socialVue },
  // components: { Counter },
  data() {
    return {
      likes: 0,
      text: 'welcome to disclaimer',
    }
  },
}
</script>

<style scoped>
#text {
  color: blue;
}
</style>
