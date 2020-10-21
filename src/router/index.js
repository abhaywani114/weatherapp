import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import City from '../views/City.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: {
      title: "Home Page"
    }
  },
  {
    path: '/city/:key',
    component: City,
    name: "weatherByCity",
    meta: {
      title: 'Weather By city'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const DEFAULT_TITLE = 'Some Default Title';
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router
