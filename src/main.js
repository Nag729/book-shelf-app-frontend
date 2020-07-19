import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
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
