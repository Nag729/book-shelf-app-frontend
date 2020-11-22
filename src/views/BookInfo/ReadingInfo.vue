<template>
  <div>
    <b-taglist attached>
      <b-tag type="is-dark">STATUS</b-tag>
      <b-tag :type="tagType">{{ book.status }}</b-tag>
    </b-taglist>
  </div>
</template>

<script>
import { PROGRESS_INFO_QUERY } from '@/graphql/query/progressInfo';

export default {
  name: 'ReadingInfo',

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
    }
  }
};
</script>
