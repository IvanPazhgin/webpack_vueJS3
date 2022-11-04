<!-- Разметка, структура сайта, шаблон -->
<template>
  <h2>Разбор на большое количество компонентов</h2>
  <div class="fullApp">
    <h2>Страница с постами</h2>
    <my-input v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
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
    <div ref="observer" class="observer"></div>
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
import PostFormVue from './components/PostForm.vue'
import PostListVue from './components/PostList.vue'
import axios from 'axios'
export default {
  // name: 'app',
  components: { PostFormVue, PostListVue },
  data() {
    return {
      posts: [
        // { id: 1, title: 'JS 1', body: 'Описание поста 1' },
        // { id: 2, title: 'JS 2', body: 'Описание поста 2' },
        // { id: 3, title: 'JS 3', body: 'Описание поста 3' },
      ],
      dialogVisible: false,
      // modificatorValue: '',
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержанию' },
      ],
    }
  },
  methods: {
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
    // changePage(pageNumber) {
    //   this.page = pageNumber
    //   // this.fetchPosts()
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        // setTimeout(async () => {
        // const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10'
        // const response = await axios.get(url)
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const response = await axios.get(url, {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        })
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        )
        this.posts = response.data
        // this.isPostsLoading = false
        // }, 1000)
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isPostsLoading = false // если убрать setTimeout
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const response = await axios.get(url, {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        })
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        )
        this.posts = [...this.posts, ...response.data] // посты не перезаписывем, а добавляем их в конец массива
      } catch (e) {
        alert('Ошибка')
      }
    },
  },
  mounted() {
    this.fetchPosts()

    // https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80_%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    }
    const callback = (entries, observer) => {
      /* Content excerpted, show below */
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },

  // вычисляемые свойства. Возвращает отсортированный массив. Запоминает результат вычислений. Перерасчет происходит в том случае, если изменится зависимость, которая используется внутри этой функции
  computed: {
    sortedPosts() {
      // [...this.posts] - не хотим чтобы функция мутировала массив с постами
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.fullApp {
  padding: 20px;
}

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
