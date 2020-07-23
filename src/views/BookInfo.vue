<template>
	<div>
		<section>
			<div class="columns">
				<div class="column is-one-third">
					<!-- picture -->
					<!-- TODO: ネットワーク越しの画像取得でCORBエラー -->
					<BookCard :image-url="bookInfo.pic" :title="bookInfo.title"></BookCard>
				</div>
				<div class="column">
					<!-- line chart -->
					<LineChart></LineChart>

					<!-- Forms -->
					<RegisterForm></RegisterForm>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import gql from 'graphql-tag';
import BookCard from '@/components/BookCard';
import LineChart from '@/components/LineChart';
import RegisterForm from '@/components/RegisterForm';

const BOOK_INFO_QUERY = gql`
	query {
		bookInfo {
			id
			title
			pic
			allPage
		}
	}
`;

export default {
	name: 'BookInfo',

	components: {
		BookCard,
		LineChart,
		RegisterForm,
	},

	data() {
		return {
			bookInfo: {},
		};
	},

	apollo: {
		bookInfo: {
			query: BOOK_INFO_QUERY,
		},
	},
};
</script>
