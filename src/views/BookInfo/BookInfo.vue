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
import BookCard from './BookCard';
import ReadingInfo from './ReadingInfo';
import LineChartContainer from './LineChartContainer';
import RegisterForm from './RegisterForm';

export default {
  name: 'BookInfo',

  components: {
    BookCard,
    ReadingInfo,
    LineChartContainer,
    RegisterForm
  }
};
</script>
