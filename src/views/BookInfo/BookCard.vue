<template>
  <div>
    <!-- Book Card -->
    <div class="card">
      <div class="card-image">
        <div class="config-buttons">
          <!-- Delete Button -->
          <b-button
            type="is-danger"
            icon-left="delete"
            @click="confirmDelete"
          />
          <!-- Edit Button -->
          <b-button type="is-info" icon-left="pen" @click="openEditModal" />
        </div>
        <!-- Image -->
        <figure class="image">
          <img :src="book.imageUrl" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <!-- Title -->
        <div class="content">{{ book.title }}</div>
      </div>
    </div>

    <!-- Book Add Modal (Edit mode) -->
    <BookEditModal :is-active.sync="isModalActive" :book="book"></BookEditModal>
  </div>
</template>

<script>
import BookEditModal from '@/views/BookEditModal/BookEditModal';
import { ALL_BOOKS_QUERY } from '@/graphql/query/allBooks';
import { BOOK_INFO_QUERY } from '@/graphql/query/bookInfo';
import { BOOK_DELETE_MUTATION } from '@/graphql/mutation/bookDelete';

export default {
  name: 'BookCard',

  components: {
    BookEditModal
  },

  data() {
    return {
      book: {},
      isModalActive: false
    };
  },

  apollo: {
    book: {
      query: BOOK_INFO_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },

  methods: {
    /**
     * display confirm dialog before delete.
     */
    confirmDelete() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure to DELETE?',
        onConfirm: () => {
          this.$buefy.toast.open({
            message: 'Delete Success!',
            type: 'is-success'
          });
          this.deleteBook();
        }
      });
    },

    /**
     * delete displayed book.
     */
    async deleteBook() {
      await this.$apollo.mutate({
        mutation: BOOK_DELETE_MUTATION,
        variables: {
          id: this.book.id
        },
        update: store => {
          const deletedBookId = this.book.id;
          const data = store.readQuery({ query: ALL_BOOKS_QUERY });

          data.allBooks = data.allBooks.filter(
            book => book.id !== deletedBookId
          );
          store.writeQuery({ query: ALL_BOOKS_QUERY, data });
        }
      });

      // return shelf page
      this.$router.push({ name: 'BookShelf' });
    },

    // open modal
    openEditModal() {
      this.isModalActive = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.config-buttons {
  position: absolute;
  width: 100%;
  padding: 2%;
  z-index: 1;
  text-align: right;

  button {
    margin-left: 2%;
  }
}
</style>
