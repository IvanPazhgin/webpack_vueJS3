<!-- Разметка, структура сайта, шаблон -->
<template>
  <div class="fullApp">
    <!-- submit.prevent - чтобы страница не перезагружалась после нажатия кнопки -->
    <form @submit.prevent>
      <h3>Добавить пост</h3>
      <input
        :value="title"
        @input="title = $event.target.value"
        class="input"
        type="text"
        placeholder="Название"
      />
      <input
        :value="body"
        @input="body = $event.target.value"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <button class="btn" @click="addPost">Добавить</button>
    </form>
    <div class="post" v-for="post in posts">
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
  </div>
</template>

<!-- логика, данные и переменные, функции -->
<script>
export default {
  // name: 'app',
  data() {
    return {
      posts: [
        { id: 1, title: 'JS 1', body: 'Описание поста 1' },
        { id: 2, title: 'JS 2', body: 'Описание поста 2' },
        { id: 3, title: 'JS 3', body: 'Описание поста 3' },
      ],
      title: '',
      body: '',
    }
  },
  methods: {
    addPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      }
      this.posts.push(newPost)
      this.title = ''
      this.body = ''
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.fullApp {
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.post {
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
