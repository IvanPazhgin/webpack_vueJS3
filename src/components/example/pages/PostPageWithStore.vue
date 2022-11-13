<!-- Разметка, структура сайта, шаблон -->
<template>
  <!-- <h1>limit = {{ $store.state.post.limit }}</h1>
  {{ $store.commit('user/setLoading') }} -->

  <!-- <h1>
    {{
      $store.state.isAuth
        ? 'Пользователь авторизован'
        : 'Авторизируйтесь, чтобы использователь сервис'
    }}
  </h1>
  <h1>Лайки: {{ $store.state.likes }}</h1>
  <h1>Дизлайки: {{ $store.getters.doubleLikes }}</h1>
  <div>
    <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
    <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>
  </div> -->

  <!-- <h2>Разбор на большое количество компонентов</h2> -->
  <div>
    <h2>Страница с постами</h2>
    <!-- <my-input v-focus v-model="searchQuery" placeholder="Поиск..." /> -->
    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
      v-focus
    />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <!-- <my-select v-model="selectedSort" :options="sortOptions" /> -->
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <!-- <my-button @click="fetchPosts">Получить посты</my-button> -->
    <!-- <input type="text" v-model="modificatorValue" /> -->

    <my-dialog v-model:show="dialogVisible">
      <PostFormVue @create="addPost" />
    </my-dialog>
    <!-- <PostListVue :posts="posts" @remove="removePost" v-if="!isPostsLoading" /> -->
    <PostListVue
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>

    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div ref="observer" class="observer"></div> -->

    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<!-- логика, данные и переменные, функции -->
<script>
import PostFormVue from '../components/PostForm.vue'
import PostListVue from '../components/PostList.vue'
import axios from 'axios'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  // name: 'app',
  components: { PostFormVue, PostListVue },
  data() {
    return {
      // posts: [],
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    addPost(post, second, third) {
      this.posts.push(post)
      // console.log(second)
      // console.log(third)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
  },
  mounted() {
    this.fetchPosts()
  },

  // вычисляемые свойства. Возвращает отсортированный массив. Запоминает результат вычислений. Перерасчет происходит в том случае, если изменится зависимость, которая используется внутри этой функции
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
  },

  // наблюдаемые свойства. Отрабатывет в тот момент, когда одна из моделей была изменена
  watch: {
    // функция должна иметь такое же название как и модель
    // page() {
    //   this.fetchPosts()
    // },
    /*
    // ее усовершенствованная версия sortedPosts() лежит в computed
    selectedSort(newValue) {
      // console.log(newValue)
      this.posts.sort((post1, post2) => {
        // для сравнение названия или описания между постами
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        // return post1[newValue]?.localeCompare(post2[newValue]) // тоже будет работать
      })
    },
    */
    // dialogVisible(newValue) {
    //   console.log(newValue)
    // },
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
