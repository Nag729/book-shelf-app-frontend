<template>
  <div class="container">
    <!-- Status Tag -->
    <div class="status-tag">
      <b-taglist attached>
        <b-tag type="is-dark">STATUS</b-tag>
        <b-tag :type="tagType">{{ book.status }}</b-tag>
      </b-taglist>
    </div>

    <!-- Reading Progress Message -->
    <div class="progress-message is-size-4">
      <i class="mdi mdi-book-open mdi-18px"></i>
      Reading {{ latestPage }} / {{ book.allPages }} Pages Now
      <i class="mdi mdi-book-open mdi-18px"></i>
    </div>

    <!-- button that open modal to regist progress  -->
    <b-button type="is-primary" icon-left="plus" @click="openAddDialog">
      Record !
    </b-button>

    <ProgressAddModal :is-active.sync="isModalActive"></ProgressAddModal>
  </div>
</template>

<script>
// TODO: replace moment to dayjs
import moment from 'moment';
import ProgressAddModal from '@/views/ProgressAddModal/ProgressAddModal';
import { PROGRESS_INFO_QUERY } from '@/graphql/query/progressInfo';

export default {
  name: 'ReadingInfo',

  components: {
    ProgressAddModal
  },

  data() {
    return {
      book: {},
      isModalActive: false
    };
  },

  apollo: {
    book: {
      query: PROGRESS_INFO_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },

  computed: {
    tagType() {
      const typeMap = {
        WISH: 'is-warning',
        HAVE: 'is-info',
        DOING: 'is-primary',
        DONE: 'is-success'
      };
      return typeMap[this.book.status];
    },

    latestPage() {
      const progress = this.book.progress;
      if (!progress || !progress.length) return 0;

      const dates = progress.map(row => {
        return moment(row.readAt);
      });

      const latestIdx = dates[dates.length - 1] !== 'x/x' ? 1 : 2;
      const latestPage = progress[progress.length - latestIdx].currentPage;

      return latestPage;
    }
  },

  methods: {
    // open modal
    openAddDialog() {
      this.isModalActive = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.status-tag {
  margin: auto 0;
}

.progress-message {
  font-weight: bold;
  margin: auto 0;
}
</style>
