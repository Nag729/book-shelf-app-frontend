<template>
  <div class="container">
    <LineChart v-if="loaded" :chart-data="chartData" :options="options" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment";
import LineChart from "@/components/LineChart";

const PROGRESS_INFO_QUERY = gql`
  query {
    book(id: 1) {
      id
      allPages
      status
      progress {
        id
        currentPage
        readAt
      }
    }
  }
`;

export default {
  name: "LineChartContainer",

  components: {
    LineChart
  },

  data() {
    return {
      book: {},
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Reading Progress",
            data: [],
            backgroundColor: "#BA55D3",
            borderColor: "#CC99FF",
            fill: false,
            type: "line",
            lineTension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Page"
              },
              // TODO: maxをbook.allPagesにする
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },

  apollo: {
    book: {
      query: PROGRESS_INFO_QUERY,
      result() {
        this.loaded = false;
        this.updateChartData();
        this.$nextTick(() => {
          // re-render chart
          this.loaded = true;
        });
      }
    }
  },

  methods: {
    updateChartData() {
      const book = this.book;
      const progress = book.progress;

      if (!progress || progress.length === 0) {
        this.chartData.labels = [];
        this.chartData.datasets.data = [];
        return;
      }

      // label
      const labels = progress.map(row => {
        return moment(row["readAt"]).format("MM/DD");
      });
      this.chartData.labels = labels;

      // data
      const pages = progress.map(row => {
        return row["currentPage"];
      });
      this.chartData.datasets[0].data = pages;
    }
  }
};
</script>
