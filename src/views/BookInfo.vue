<template>
	<div>
		<section>
			<div class="columns">
				<div class="column is-one-third">
					<!-- picture -->
					<BookCard></BookCard>
				</div>
				<div class="column">
					<!-- Reading info -->
					<ReadingInfo></ReadingInfo>

					<!-- line chart -->
					<LineChartContainer></LineChartContainer>

					<!-- Forms -->
					<RegisterForm></RegisterForm>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import BookCard from '@/components/BookCard';
import ReadingInfo from '@/components/ReadingInfo';
import LineChartContainer from '@/components/LineChartContainer';
import RegisterForm from '@/components/RegisterForm';

export default {
	name: 'BookInfo',

	components: {
		BookCard,
		ReadingInfo,
		LineChartContainer,
		RegisterForm,
	},
};
</script>
