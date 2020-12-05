<template>
  <div>
    <div v-if="progressList" class="timeline">
      <div v-for="p in progressList" :key="p.date" class="timeline-item">
        <TimelineIcon></TimelineIcon>
        <div class="timeline-content">
          <p class="heading">{{ p.date + ' | ' + p.page + ' PAGE' }}</p>
          <TimelineCard v-if="p.note" :note="p.note"></TimelineCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { PROGRESS_INFO_QUERY } from '@/graphql/query/progressInfo';
import TimelineCard from './TimelineCard';
import TimelineIcon from './TimelineIcon';

export default {
  name: 'Timeline',

  components: {
    TimelineCard,
    TimelineIcon
  },

  data() {
    return {
      book: {}
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
      result() {}
    }
  },

  computed: {
    /**
     * arrange data for progress timeline.
     */
    progressList() {
      const book = this.book;
      if (!(book && book.progress && book.progress.length)) return null;

      const list = book.progress.map(p => {
        return {
          page: p.currentPage,
          date: moment(p.readAt).format('MM/DD'),
          // note: p.note || null
          note:
            'DIPについて学んだ。色々と理解できた。あああああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいうううううううううううううううううううううううううええええええええええええええええええええええええおおおおおおおおおおおおおおおお御おおおおおおおおおおおお'
        };
      });
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
$--timeline-color: #8c67ef;

.is-colored {
  color: white;
  background: $--timeline-color;
}

// bulma-extension の scss variables が変更反映されなかったのでStyleを上書き
.heading {
  font-size: 12px;
  letter-spacing: 0.5px;
}

.timeline .timeline-item::before {
  background-color: $--timeline-color;
  width: 6px;
  left: -3px;
}

.timeline .timeline-item .timeline-marker {
  background: $--timeline-color;
}

.timeline .timeline-item .timeline-marker.is-icon {
  height: 36px;
  width: 36px;
}
</style>
