<!-- https://v3.ru.vuejs.org/ru/guide/composition-api-introduction.html#%D0%BF%D0%BE%D1%87%D0%B5%D0%BC%D1%83-%D0%BF%D0%BE%D1%8F%D0%B2%D0%B8%D0%BB%D1%81%D1%8F-composition-api -->

<!-- Разметка, структура сайта, шаблон -->
<template>
  <div>
    <h2>Страница с постами</h2>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <!-- <my-button @click="fetchPosts">Получить посты</my-button> -->
    <!-- <input type="text" v-model="modificatorValue" /> -->

    <my-dialog v-model:show="dialogVisible">
      <!-- <PostFormVue @create="addPost" /> -->
      <PostFormVue />
    </my-dialog>

    <!-- <PostListVue :posts="posts" @remove="removePost" v-if="!isPostsLoading" /> -->

    <PostListVue :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<!-- логика, данные и переменные, функции -->
<script>
import PostFormVue from '../components/PostForm.vue'
import PostListVue from '../components/PostList.vue'
import usePosts from '../hooks/usePosts'
import useSortedPosts from '../hooks/useSortedPosts'
import useSortedAndSearchedPosts from '../hooks/useSortedAndSearchedPosts'
export default {
  components: { PostFormVue, PostListVue },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержанию' },
      ],
    }
  },
  setup(props) {
    const { posts, isPostsLoading, totalPages } = usePosts(10)
    const { selectedSort, sortedPosts } = useSortedPosts(posts)
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      isPostsLoading,
      totalPages,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchedPosts,
    }
  },
}
</script>

<style scoped>
.app__btns {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between; /* чтобы кнопка и выдаюающий список были напротив друг друга */
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px, solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>
