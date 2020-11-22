<template>
  <article class="message is-info">
    <div class="message-body">
      <p class="message-title">
        Velocity
      </p>
      <p>
        Monthly: <strong>{{ monthlyVelocity }}</strong
        >pages
      </p>
      <p>
        Weekly: <strong>{{ weeklyVelocity }}</strong
        >pages
      </p>
    </div>
  </article>
</template>

<script>
import dayjs from 'dayjs';
import { ALL_BOOKS_QUERY } from '@/graphql/query/allBooks';

export default {
  name: 'Velocity',
  data() {
    return {
      allBooks: [],
      weeklyVelocity: 0,
      monthlyVelocity: 0
    };
  },

  apollo: {
    allBooks: {
      query: ALL_BOOKS_QUERY
    }
  },

  async mounted() {
    // TODO：もっときれいな取得の仕方がありそう
    const data = await this.$apollo.queries.allBooks.refetch();
    const books = data['data']['allBooks'];

    this.weeklyVelocity =
      Math.round(this.calculateVelocity(books, 'day') * 10) / 10;
    this.monthlyVelocity =
      Math.round(this.calculateVelocity(books, 'month') * 10) / 10;
  },

  methods: {
    calculateVelocity(books, period) {
      const range = period === 'day' ? 7 : 30;
      const limitDate = dayjs().subtract(range, 'day');
      let allReadPages = 0;

      for (const book of books) {
        if (book['progress'].length === 0) continue;
        allReadPages += this.readPage(book.progress, limitDate);
      }

      return allReadPages / range;
    },

    readPage(allProgress, limitDate) {
      allProgress.reverse();
      const latestReadPage = allProgress[0]['currentPage'];

      if (dayjs(allProgress[0]['readAt']) < limitDate) {
        return 0;
      }
      if (limitDate < dayjs(allProgress[allProgress.length - 1]['readAt'])) {
        return latestReadPage;
      }

      oldestReadPage = allProgress.find(
        progress => limitDate < progress['readAt']
      )['currentPage'];

      return latestReadPage - oldestReadPage;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.message {
  opacity: 60%;
}

.message-title {
  border-bottom: solid 2px #3298dc;
}

.message-body {
  border-color: #3298dc;
  color: #0379ff;
  display: flex;
  flex-direction: row;
  padding: 1em 1em;
  font-weight: 600;
}

.message-body > p {
  margin-right: 12px;
}
</style>
