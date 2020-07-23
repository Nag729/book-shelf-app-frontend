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
		<footer class="card-footer">
			<b-button type="is-info" icon-left="share-variant" @click="shareBook" class="card-footer-item">Share</b-button>
		</footer>
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

	methods: {
		shareBook() {
			console.log('share');
		},
	},
};
</script>

<style lang="scss" scoped></style>
