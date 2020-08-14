<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <!-- TODO: image-urlをバインドする -->
        <img src="@/assets/graphql.jpg" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">{{ book.title }}</div>
    </div>
    <!-- <footer class="card-footer">
			<b-button type="is-info" icon-left="share-variant" @click="shareBook" class="card-footer-item">Share</b-button>
    </footer>-->
  </div>
</template>

<script>
import gql from "graphql-tag";

const BOOK_CARD_QUERY = gql`
  query {
    book(id: 1) {
      id
      title
      imageUrl
    }
  }
`;

export default {
  name: "BookCard",

  data() {
    return {
      book: {}
    };
  },

  apollo: {
    book: {
      query: BOOK_CARD_QUERY
    }
  },

  methods: {
    // shareBook() {
    // 	console.log('share!');
    // },
  }
};
</script>

<style lang="scss" scoped></style>
