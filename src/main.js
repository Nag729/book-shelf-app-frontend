import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Buefy from 'buefy';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

Vue.config.productionTip = false;

// UI Component
Vue.use(Buefy, {
	defaultIconPack: 'mdi',
});

// Apollo
const apolloClient = new ApolloClient({
	// uri: 'http://localhost:8888/graphql',
	uri: 'http://localhost:3000/graphql',
	// uri: 'https://book-shelf-backend.herokuapp.com/graphql',
});

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

Vue.use(VueApollo);

new Vue({
	router,
	store,
	apolloProvider,
	render: (h) => h(App),
}).$mount('#app');
