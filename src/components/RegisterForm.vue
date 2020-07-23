<template>
	<div>
		<section>
			<div class="columns">
				<div class="column">
					<b-field label="DATE">
						<b-datepicker placeholder="Click to select..." icon="calendar-today" trap-focus v-model="date">
						</b-datepicker>
					</b-field>
				</div>
				<div class="column">
					<b-field label="PAGE">
						<b-numberinput v-model="number"></b-numberinput>
					</b-field>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'RegisterForm',

	props: {},

	data() {
		return {
			date: '',
			number: 0,
		};
	},
};
</script>
