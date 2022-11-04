<!-- Разметка, структура сайта, шаблон -->
<template>
  <div>
    <h3>Компонент Counter</h3>
  </div>
  <div>
    <button @click="addLike">like</button>
    <button @click="addDislike">dislike</button>
  </div>
  <div>
    <div>
      Кол-во лайков: <strong>{{ likes }}</strong>
    </div>
    <div>
      Кол-во дизлайков: <strong>{{ dislikes }}</strong>
    </div>
  </div>

  <!-- другой пример -->
  <div id="text">
    <h3>{{ text }}</h3>
  </div>
</template>

<!-- логика, данные и переменные, функции -->
<script>
export default {
  // name: 'app',
  data() {
    return {
      likes: 0,
      dislikes: 0,
      text: 'welcome to component',
    }
  },
  methods: {
    addLike() {
      this.likes++
    },

    addDislike() {
      this.dislikes++
    },
  },
}
</script>

<style scoped>
#text {
  color: brown;
}
</style>
