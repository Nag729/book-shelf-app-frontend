<template>
  <div>
    <section>
      <div class="velocity-container">
        <Velocity></Velocity>
        <div>
          <b-button type="is-info" icon-left="plus" @click="openAddDialog">
            Add
          </b-button>
        </div>
      </div>
      <!-- Book Add Modal (Regist mode) -->
      <BookAddModal :is-active.sync="isModalActive"></BookAddModal>

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
import BookAddModal from '@/views/BookAddModal/BookAddModal';
import Velocity from './Velocity';
import { ALL_BOOKS_QUERY } from '@/graphql/query/allBooks';

export default {
  name: 'BookShelf',

  components: {
    SingleBook,
    BookAddModal,
    Velocity
  },

  data() {
    return {
      allBooks: [],
      isModalActive: false
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

    // open modal
    openAddDialog() {
      this.isModalActive = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.velocity-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.shelf-container {
  width: 80%;
  margin: 0 auto;
}
</style>
