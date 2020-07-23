<template>
	<div class="card">
		<div class="card-image">
			<figure class="image">
				<!-- TODO: image-urlをバインドする -->
				<img src="@/assets/graphql.jpg" alt="Placeholder image" />
			</figure>
		</div>
		<div class="card-content">
			<div class="content">{{ title }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BookCard',

	props: {
		imageUrl: {
			type: String,
		},
		title: {
			type: String,
		},
	},
};
</script>
