import { authGuard } from '@/auth/authGuard';
import Vue from 'vue';
import VueRouter from 'vue-router';
import BookInfo from '../views/BookInfo/BookInfo.vue';
import BookShelf from '../views/BookShelf/BookShelf.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/book-shelf',
    name: 'BookShelf',
    component: BookShelf,
    beforeEnter: authGuard
  },
  {
    path: '/book-info/:id',
    name: 'BookInfo',
    component: BookInfo,
    beforeEnter: authGuard
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  routes
});

export default router;
