import { createApp } from 'vue'
import App from './App.vue'
import router from './components/example/router/router'
import components from './components/example/UI'
// import components from '@/components/example/UI'
// import VInrersection from './components/example/directives/VInrersection'
import directives from './components/example/directives'
import store from './components/example/store'

function component1() {
  const element = document.createElement('div') // создаем новый элемент
  element.id = 'app' // присваиваем id элементу
  return element
}

const app = createApp(App)

// регистрация компонентов, чтобы не импортировать их в каждом файле https://youtu.be/XzLuMtDelGk?t=3325
components.forEach((component) => {
  app.component(component.name, component)
})

document.body.appendChild(component1())

// createApp(App).mount('#app')
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router).use(store).mount('#app')
// app.mount('#app')
// use позволяет использовать сторонние модули: плагины, библиотеки, bootstrap, VueX

// ----- другие эксперименты -----
// import Vue from 'vue'

// Vue.createApp(App).mount('#app')

// const App = require('./App')

// const App = {
//   data,
//   methods,
// }
// ctrl + space => see all fields
