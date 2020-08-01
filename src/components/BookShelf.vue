<template>
	<div class="card">
		<b-table :data="tableData" striped hoverable>
			<template slot-scope="props">
				<b-table-column field="id" label="ID" width="40" numeric>
					{{ props.row.id }}
				</b-table-column>
				<b-table-column field="title" label="TITLE" width="100" numeric>
					{{ props.row.title }}
				</b-table-column>
				<b-table-column field="image" label="IMAGE" width="100" numeric>
					<!-- 画像を動的にバインド -->
					<figure class="image is-128x128">
						<img class="" src="@/assets/graphql.jpg" alt="Placeholder image" />
					</figure>
				</b-table-column>
				<b-table-column field="progress" label="PROGRESS" width="200" numeric>
					<b-progress type="is-success" :value="props.row.progress"></b-progress>
				</b-table-column>
			</template>
		</b-table>
	</div>
</template>

<script>
export default {
	name: 'BookShelf',

	props: {},

	data() {
		return {
			tableData: [
				{
					id: 123,
					title: '初めてのGraphQL',
					image_url: '@/assets/graphql.jpg',
					progress: 80,
				},
				{
					id: 456,
					title: 'HBR',
					image_url: '@/assets/graphql.jpg',
					progress: 20,
				},
			],
		};
	},

	methods: {},
};
</script>

<style lang="scss" scoped></style>
