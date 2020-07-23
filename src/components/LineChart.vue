<script>
import { Line } from 'vue-chartjs';
// import { Bar } from 'vue-chartjs';

export default {
	name: 'LineChart',

	extends: Line,

	// props: {
	// 	data: {
	// 		type: [Array, Object],
	// 		required: true,
	// 	},
	// },

	data() {
		return {
			// TODO: propsを見るようにする
			data: {
				labels: ['7/1', '7/3', '7/12', '7/28', '8/1', '8/10', '8/11'],
				datasets: [
					{
						label: 'Reading Progress',
						data: [20, 55, 80, 120, 180, 200, 220],
						backgroundColor: '#BA55D3',
						borderColor: '#CC99FF',
						fill: false,
						type: 'line',
						lineTension: 0,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 20,
						right: 20,
						top: 20,
						bottom: 20,
					},
				},
				scales: {
					xAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: 'Date',
							},
						},
					],
					yAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: 'Page',
							},
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		};
	},

	mounted() {
		this.renderChart(this.data, this.options);
	},
};
</script>
