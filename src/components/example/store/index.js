import { createStore } from 'vuex'

export default createStore({
  state: {
    // само состояние, хранит данные, которые будут в приложении
    likes: 2,
    isAuth: false,
  },
  getters: {
    // некоторые computed свойства, т.е. своего рода кэшируемые вычисляемые выражения
    doubleLikes(state) {
      return state.likes * 2
    },
  },
  mutations: {
    // функции, внутри которых мы меняем значения поля состояния
    incrementLikes(state) {
      state.likes++
    },
    decrementLikes(state) {
      state.likes--
    },
  },
  actions: {
    // функции, которые внутри себя используют мутации. Можно делать сайт эфффекты
  },
  modules: {},
})
