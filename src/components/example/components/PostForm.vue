<template>
  <!-- submit.prevent - чтобы страница не перезагружалась после нажатия кнопки -->
  <form @submit.prevent>
    <h3>Добавить пост</h3>
    <my-input v-model="post.title" placeholder="Название" />
    <my-input v-model="post.body" placeholder="Описание" />
    <!-- <button class="btn">Добавить</button> -->
    <!-- <button class="btn" @click="addPost">Добавить</button> -->

    <!-- <MyButton
      class="btn"
      style="align-self: flex-end; margin-top: 15px"
      @click="addPost"
      >Добавить</MyButton
    > -->
    <my-button
      class="btn"
      style="align-self: flex-end; margin-top: 15px"
      @click="addPost"
      >Добавить (2)</my-button
    >
  </form>
</template>

<script>
// import MyButton from '../UI/MyButton.vue'
// import MyInput from '../UI/MyInput.vue'

// в дочернем компоненте пропсы изменять нельзя. Данные должны меняться в родителе, а дочерний компонент должен получать их уже в измененном виде
export default {
  // components: { MyButton, MyInput },
  data() {
    return {
      post: {
        id: '',
        title: '',
        body: '',
      },
    }
  },
  methods: {
    addPost() {
      this.post.id = Date.now()
      // генерируем событие внутри ребенка, на который может подписаться родитель с помощью слушателя
      this.$emit('create', this.post, 'second param', '3 param')
      this.post = {
        id: '',
        title: '',
        body: '',
      }
    },
  },
  // watch: {
  //   // глубокое отслеживание объекта
  //   post: {
  //     handler(newValue) {
  //       console.log(newValue)
  //     },
  //     deep: true,
  //   },
  // },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
