<template>
  <b-modal
    :active.sync="isLocalActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    aria-role="dialog"
    aria-modal
  >
    <form @submit.prevent>
      <div class="modal-card">
        <!-- Header -->
        <header class="modal-card-head">
          <p class="modal-card-title">Add A Book!</p>
        </header>

        <!-- Body -->
        <section class="modal-card-body">
          <!-- Form -->
          <b-field label="Keyword">
            <b-input
              v-model="keyword"
              placeholder="Book Keyword"
              required
            ></b-input>
          </b-field>
          <b-field>
            <button class="button is-info" @click="searchBook">Search</button>
          </b-field>

          <!-- Books -->
          <h5 class="title is-5 has-text-centered has-text-info">
            <template v-if="isSelectBook">
              {{ selectedBook.volumeInfo.title }}
            </template>
            <template v-else>
              <b-skeleton height="5vh"></b-skeleton>
            </template>
          </h5>

          <div class="columns book-space">
            <template v-if="books ? books.length > 0 : false">
              <div
                v-for="book in books"
                :key="book.id"
                class="column is-4 search-books"
                @click="selectBook(book)"
              >
                <div>
                  <SingleBook
                    :id="book.id"
                    :image-url="book.volumeInfo.imageLinks.thumbnail"
                  ></SingleBook>
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="n in 3" :key="n" class="column is-4">
                <b-skeleton height="35vh"></b-skeleton>
              </div>
            </template>
          </div>
        </section>

        <!-- Footer -->
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isLocalActive = false">
            Close
          </button>
          <button
            class="button is-primary"
            :disabled="!isSelectBook"
            @click="registNewBook"
          >
            Add
          </button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { ALL_BOOKS_QUERY } from '@/graphql/query/allBooks';
import { BOOK_REGIST_MUTATION } from '@/graphql/mutation/bookRegist';

// TODO: Google Books APIにApollo経由で通信を飛ばす
import SingleBook from './SingleBook';

export default {
  name: 'BookAddModal',

  components: {
    SingleBook
  },

  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      allBooks: '',
      books: [],
      selectedBook: {},
      keyword: ''
    };
  },

  apollo: {
    allBooks: {
      query: ALL_BOOKS_QUERY
    }
  },

  computed: {
    isLocalActive: {
      get() {
        return this.isActive;
      },
      set(value) {
        if (!value) {
          // reset data
          this.books = [];
          this.selectedBook = {};
          this.keyword = '';
        }
        this.$emit('update:isActive', value);
      }
    },

    isSelectBook() {
      const volumeInfo = this.selectedBook.volumeInfo;
      return volumeInfo && volumeInfo.title;
    }
  },

  methods: {
    async searchBook() {
      // TODO: Do Title Validation

      // initialize data
      this.selectedBook = {};

      // REST to Google Books API
      // https://developers.google.com/books/docs/v1/using
      const response = await this.axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${this.keyword}`
      );

      // Arrange data
      const topItems = response.data.items
        .filter(book => {
          return book.saleInfo.country === 'JP';
        })
        .filter(book => {
          return (
            book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
          );
        })
        .slice(0, 3);

      this.books = topItems;
    },

    selectBook(book) {
      this.selectedBook = book;
    },

    async registNewBook() {
      const book = this.selectedBook;
      console.log(book);

      await this.$apollo.mutate({
        mutation: BOOK_REGIST_MUTATION,
        variables: {
          title: book.volumeInfo.title,
          imageUrl: book.volumeInfo.imageLinks.thumbnail,
          allPages: 100,
          status: 'HAVE'
        }
      });

      this.$buefy.toast.open({
        message: 'Register Success!',
        type: 'is-success'
      });

      // re-search
      await this.$apollo.queries.allBooks.refetch();

      // close the modal
      this.isLocalActive = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.book-space {
  height: 40vh;
}

.search-books {
  height: 35vh;
}
</style>
