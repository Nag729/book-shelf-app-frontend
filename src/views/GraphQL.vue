<template>
	<div>
		<h1 class="title">GraphQL Sample</h1>
		<section>
			<b-table :data="allPosts" :columns="columns" striped hoverable></b-table>
		</section>
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
			columns: [
				{
					field: 'id',
					label: 'ID',
				},
				{
					field: 'title',
					label: 'TITLE',
				},
				{
					field: 'content',
					label: 'CONTENT',
				},
			],
		};
	},
	apollo: {
		allPosts: {
			query: POSTS_QUERY,
		},
	},
};
</script>
