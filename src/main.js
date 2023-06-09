import App from './App.vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'

const router = createRouter({
      history: createWebHistory(),
      routes,
})

createApp(App)
      .use(router)
      .mount('#app')