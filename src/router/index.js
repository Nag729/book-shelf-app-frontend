import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import GraphQL from '../views/GraphQL.vue';
import BookList from '../views/BookList.vue';
import BookInfo from '../views/BookInfo.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/graphql',
		name: 'GraphQL',
		component: GraphQL,
	},
	{
		path: '/book-list',
		name: 'BookList',
		component: BookList,
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
