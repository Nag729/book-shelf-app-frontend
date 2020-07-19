<template>
	<div>
		<h1>GraphQL</h1>
		<ul v-for="post in allPosts" :key="post.id">
			<li>TITLE: {{ post.title }}</li>
			<li>CONTENT: {{ post.content }}</li>
		</ul>
	</div>
</template>

<script>
import gql from 'graphql-tag';

const POSTS_QUERY = gql`
	query {
		allPosts {
			id
			title
			content
		}
	}
`;

export default {
	name: 'index',
	data() {
		return {
			allPosts: [],
		};
	},
	apollo: {
		allPosts: {
			query: POSTS_QUERY,
		},
	},
};
</script>
