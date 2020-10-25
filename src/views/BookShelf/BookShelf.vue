<template>
  <div>
    <section>
      <div class="buttons is-right">
        <b-button type="is-info" icon-left="plus" @click="openAddDialog"
          >Add</b-button
        >
      </div>

      <BookAddModal :is-active.sync="isActive"></BookAddModal>

      <!-- BookShelf -->
      <div class="shelf-container">
        <div class="columns is-multiline">
          <div v-for="book in allBooks" :key="book.id" class="column is-2">
            <SingleBook
              :id="book.id"
              :image-url="book.imageUrl"
              @card-click="routeDetail"
            ></SingleBook>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SingleBook from './SingleBook';
import BookAddModal from './BookAddModal';
import { ALL_BOOKS_QUERY } from '@/graphql/query/allBooks';

export default {
  name: 'BookShelf',

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
      this.$router.push({ name: 'BookInfo', params: { id: id } });
    },

    openAddDialog() {
      // show modal
      this.isActive = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.shelf-container {
  width: 80%;
  margin: 0 auto;
}
</style>
