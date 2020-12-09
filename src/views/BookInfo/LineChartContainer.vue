<!-- *** UNUSED COMPONENT *** -->
<template>
  <div class="container">
    <LineChart v-if="loaded" :chart-data="chartData" :options="options" />
  </div>
</template>

<script>
// TODO: replace moment to dayjs
import moment from 'moment';
import LineChart from '@/components/LineChart';
import { PROGRESS_INFO_QUERY } from '@/graphql/query/progressInfo';

export default {
  name: 'LineChartContainer',

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
            label: 'Reading Progress',
            data: [],
            backgroundColor: '#BA55D3',
            borderColor: '#CC99FF',
            fill: false,
            type: 'line',
            lineTension: 0,
            steppedLine: 'before'
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
                labelString: 'Date'
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Page'
              },
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
      variables() {
        return {
          id: this.$route.params.id
        };
      },
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
      const progress = this.book.progress;

      if (!progress || progress.length === 0) {
        // initialize chart data.
        this.chartData.labels = [];
        this.chartData.datasets[0].data = [];
        return;
      }

      this.shapeDataForChart();
    },

    /**
     * shape progress data for displaying on chart.
     */
    shapeDataForChart() {
      const progress = this.book.progress;
      const labels = progress.map(row => {
        return moment(row.readAt);
      });

      this.addUnreadDaysToChart(progress, labels);
      this.addAllPagesToChart(progress);
    },

    // add unread days to chart.
    addUnreadDaysToChart(progress, labels) {
      /**
       * shape label data.
       */
      // FIXME: 'x/x' で判断するよりも明示的なフラグを持たせた方が良さそう
      const latestIdx = labels[labels.length - 1] !== 'x/x' ? 1 : 2;
      const oldestDate = labels[0];
      const latestDate = labels[labels.length - latestIdx];

      const dates = this.createAllDaysLabelData(oldestDate, latestDate);
      const displayDates = dates.map(d => {
        return moment(d)
          .add(1, 'days')
          .format('MM/DD');
      });
      this.chartData.labels = displayDates;

      /**
       * shape reading page data.
       */
      const pages = this.createAllDaysPageData(progress, dates);
      this.chartData.datasets[0].data = pages;
    },

    // create label data.
    // ※ args expect Moment date object.
    createAllDaysLabelData(oldestDate, latestDate) {
      const dates = [];
      const now = oldestDate.clone();
      while (now.isSameOrBefore(latestDate)) {
        dates.push(
          now
            .clone()
            .subtract(1, 'days')
            .format('YYYY/MM/DD')
        );
        now.add(1, 'days');
      }
      return dates;
    },

    // create page data.
    createAllDaysPageData(progress, dates) {
      const pageList = {};

      // initialize
      dates.forEach(d => {
        pageList[d] = 0;
      });

      const readingList = progress.map(row => {
        return {
          date: moment(row.readAt)
            .subtract(1, 'days')
            .format('YYYY/MM/DD'),
          page: row.currentPage
        };
      });

      readingList.forEach(row => {
        // update page data from progress.
        pageList[row.date] = row.page;
      });

      const pages = Object.values(pageList);
      let now = pages[0];
      pages.forEach((val, idx) => {
        // considering unread days.
        if (val === 0) {
          pages[idx] = now;
        } else {
          now = val;
        }
      });

      return pages;
    },

    // add all pages to chart
    addAllPagesToChart(progress) {
      const allPages = this.book.allPages;
      const isDone = progress[progress.length - 1]['currentPage'] === allPages;

      if (!isDone) {
        this.chartData.labels.push('x/x');
        this.chartData.datasets[0].data.push(allPages);
      }
    }
  }
};
</script>
