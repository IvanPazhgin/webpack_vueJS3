import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    // computed свойства
    sortedPosts(state) {
      // [...this.posts] - не хотим чтобы функция мутировала массив с постами
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      )
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool
    },
    setPage(state, page) {
      state.page = page
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },

    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
  },
  actions: {
    // https://vuex.vuejs.org/api/#getters
    // commit нужен для вызова мутаций
    // dispatch нужен для вызова других экшенов
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true) // this.isPostsLoading = true
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const response = await axios.get(url, {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        })
        // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        )
        commit('setPosts', response.data) // this.posts = response.data
      } catch (e) {
        // alert('Ошибка')
        console.log(e)
      } finally {
        commit('setLoading', false) // this.isPostsLoading = false
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1) // this.page += 1
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const response = await axios.get(url, {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        })
        // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        )

        // this.posts = [...this.posts, ...response.data] // посты не перезаписывем, а добавляем их в конец массива
        commit('setPosts', [...state.posts, ...response.data])
      } catch (e) {
        // alert('Ошибка')
        console.log(e)
      }
    },
  },
  namespaced: true,
}
