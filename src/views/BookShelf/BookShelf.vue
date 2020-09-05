<template>
  <div>
    <section>
      <div class="buttons is-right">
        <b-button type="is-info" icon-left="plus" @click="openAddDialog">Add</b-button>
      </div>

      <BookAddModal :is-active.sync="isActive"></BookAddModal>

      <!-- BookShelf -->
      <!-- TODO: tileで積んで縦幅を揃える -->
      <div class="columns is-multiline">
        <div class="column is-2" v-for="book in allBooks" :key="book.id">
          <SingleBook :id="book.id" :image-url="book.imageUrl" @card-click="routeDetail"></SingleBook>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
import SingleBook from "./SingleBook";
import BookAddModal from "./BookAddModal";

const ALL_BOOKS_QUERY = gql`
  query {
    allBooks {
      id
      title
      imageUrl
    }
  }
`;

export default {
  name: "BookShelf",

  components: {
    SingleBook,
    BookAddModal
  },

  data() {
    return {
      allBooks: [],
      isActive: false
    };
  },

  apollo: {
    allBooks: {
      query: ALL_BOOKS_QUERY
    }
  },

  methods: {
    routeDetail(id) {
      this.$router.push({ name: "BookInfo", params: { id: id } });
    },

    openAddDialog() {
      // show modal
      this.isActive = true;
    }
  }
};
</script>
