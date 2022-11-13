<template>
  <div class="post">
    <div>
      <div><strong>id:</strong> {{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <!-- <button>Удалить</button> -->
      <!-- <my-button>Удалить</my-button> -->
      <!-- <my-button-vue @click="$emit('remove', post)">Удалить</my-button-vue> -->
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
// import MyButtonVue from '../UI/MyButton.vue'
export default {
  // components: { MyButtonVue },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
}
</style>
