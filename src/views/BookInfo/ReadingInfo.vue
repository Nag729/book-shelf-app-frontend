<template>
  <div>
    <!-- TODO: STATUSによって出力内容を変える -->
    <p
      class="is-size-4 has-text-centered has-text-weight-bold"
    >I read {{ latestPage }} / {{ book.allPages }} pages now ! 😆</p>
  </div>
</template>

<script>
import { PROGRESS_INFO_QUERY } from "@/graphql/query/progressInfo";

export default {
  name: "ReadingInfo",

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
    latestPage() {
      const progress = this.book.progress;
      if (!progress || progress.length === 0) return 0;

      const idx = progress.length - 1;
      return progress[idx].currentPage;
    }
  }
};
</script>
