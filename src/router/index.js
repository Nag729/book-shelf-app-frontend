import Vue from "vue";
import VueRouter from "vue-router";
import { authGuard } from "@/auth/authGuard";

import Home from "../views/Home.vue";
import BookShelf from "../views/BookShelf/BookShelf.vue";
import BookInfo from "../views/BookInfo/BookInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/book-shelf",
    name: "BookShelf",
    component: BookShelf,
    beforeEnter: authGuard
  },
  {
    path: "/book-info/:id",
    name: "BookInfo",
    component: BookInfo,
    beforeEnter: authGuard
  }
];

const router = new VueRouter({
  routes
});

export default router;
