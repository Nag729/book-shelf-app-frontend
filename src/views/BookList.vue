<template>
	<div>
		<section>
			<!-- BookShelf -->
			<BookShelf></BookShelf>
		</section>
	</div>
</template>

<script>
// import gql from 'graphql-tag';
import BookShelf from '@/components/BookShelf';

export default {
	name: 'BookList',

	components: {
		BookShelf,
	},

	data() {
		return {};
	},
};
</script>
