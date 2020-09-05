import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BookShelf from '../views/BookShelf/BookShelf.vue';
import BookInfo from '../views/BookInfo/BookInfo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/book-shelf',
    name: 'BookShelf',
    component: BookShelf,
  },
  {
    path: '/book-info/:id',
    name: 'BookInfo',
    component: BookInfo,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
