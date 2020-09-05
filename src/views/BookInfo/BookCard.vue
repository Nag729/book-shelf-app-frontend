<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <img :src="book.imageUrl" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">{{ book.title }}</div>
    </div>
    <footer class="card-footer">
      <b-button
        type="is-info"
        icon-left="share-variant"
        @click="shareBook"
        class="card-footer-item"
      >Share</b-button>
    </footer>
  </div>
</template>

<script>
import { BOOK_INFO_QUERY } from "@/graphql/query/bookInfo";

export default {
  name: "BookCard",

  data() {
    return {
      book: {}
    };
  },

  apollo: {
    book: {
      query: BOOK_INFO_QUERY
    }
  },

  methods: {
    shareBook() {
      console.log("share!");
    }
  }
};
</script>

<style lang="scss" scoped></style>
