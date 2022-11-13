import { createStore } from 'vuex'
import { postModule } from './postModule'

export default createStore({
  state: {
    // само состояние, хранит данные, которые будут в приложении
  },
  getters: {
    // некоторые computed свойства, т.е. своего рода кэшируемые вычисляемые выражения
  },
  mutations: {
    // функции, внутри которых мы меняем значения поля состояния
  },
  actions: {
    // функции, которые внутри себя используют мутации. Можно делать сайт эфффекты
  },
  modules: {
    // декомпозиция по модулям
    post: postModule,
  },
})
