<template>
	<div>
		<!-- TODO: STATUSによって出力内容を変える -->
		<p class="is-size-4 has-text-centered has-text-weight-bold">
			I read {{ latestPage }} / {{ book.allPages }} pages now ! 😆
		</p>
	</div>
</template>

<script>
import gql from 'graphql-tag';

const READING_INFO_QUERY = gql`
	query {
		book(id: 1) {
			id
			allPages
			progress {
				currentPage
			}
		}
	}
`;

export default {
	name: 'ReadingInfo',

	data() {
		return {
			book: {},
		};
	},

	apollo: {
		book: {
			query: READING_INFO_QUERY,
		},
	},

	computed: {
		latestPage() {
			const progress = this.book.progress;
			if (!progress || progress.length === 0) return 0;

			const idx = progress.length - 1;
			return progress[idx].currentPage;
		},
	},
};
</script>
