<template>
  <div>
    <section>
      <div class="info-container">
        <div class="columns">
          <div class="column is-one-third">
            <!-- picture -->
            <BookCard></BookCard>
          </div>
          <div class="column">
            <!-- Reading info -->
            <ReadingInfo></ReadingInfo>

            <!-- line chart -->
            <!-- <div class="line-chart">
              <LineChartContainer></LineChartContainer>
            </div> -->

            <!-- Timeline -->
            <div class="timeline">
              <Timeline></Timeline>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BookCard from './BookCard';
import ReadingInfo from './ReadingInfo';
// import LineChartContainer from './LineChartContainer';
import Timeline from './Timeline';

export default {
  name: 'BookInfo',

  components: {
    BookCard,
    ReadingInfo,
    // LineChartContainer,
    Timeline
  }
};
</script>

<style lang="scss" scoped>
.info-container {
  width: 80%;
  margin: 0 auto;
}

// .line-chart {
//   margin: 2% 0;
// }

.timeline {
  overflow: auto;
  margin: 3% 0;
}
</style>
