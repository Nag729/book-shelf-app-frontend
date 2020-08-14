import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BookShelf from '../views/BookShelf.vue';
import BookInfo from '../views/BookInfo.vue';

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
		path: '/book-info',
		name: 'BookInfo',
		component: BookInfo,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
