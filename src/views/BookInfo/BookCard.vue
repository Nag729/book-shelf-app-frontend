<template>
  <div>
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img :src="book.imageUrl" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">{{ book.title }}</div>
      </div>
    </div>
    <div>
      <b-button type="is-danger" icon-right="delete" @click="confirmDelete" />
    </div>
  </div>
</template>

<script>
import { ALL_BOOKS_QUERY } from '@/graphql/query/allBooks';
import { BOOK_INFO_QUERY } from '@/graphql/query/bookInfo';
import { BOOK_DELETE_MUTATION } from '@/graphql/mutation/bookDelete';

export default {
  name: 'BookCard',

  data() {
    return {
      book: {}
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
    shareBook() {
      console.log('share!');
    },

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
      this.$router.push({ name: 'BookShelf' });
    }
  }
};
</script>

<style lang="scss" scoped></style>
