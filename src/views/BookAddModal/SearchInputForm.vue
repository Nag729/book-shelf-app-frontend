<template>
  <div class="modal-card">
    <form ref="inputForm" @submit.prevent>
      <!-- Header -->
      <header class="modal-card-head">
        <p class="modal-card-title">Add A Book!</p>
        <div class="field">
          <b-switch v-model="isLocalSwitchOn">Manual</b-switch>
        </div>
      </header>

      <!-- Body -->
      <section class="modal-card-body">
        <!-- Search Form -->
        <b-field label="Keyword">
          <b-input
            v-model="keyword"
            type="search"
            placeholder="Keyword Search..."
            icon="magnify"
            required
          ></b-input>
        </b-field>
        <b-field>
          <button class="button is-info" @click="searchBook">Search</button>
        </b-field>

        <!-- Selected Book -->
        <h5 class="title is-5 has-text-centered has-text-info">
          <!-- Selected Title -->
          <template v-if="isSelectBook">
            {{ selectedBook.volumeInfo.title }}
          </template>
          <!-- skeleton -->
          <template v-else>
            <b-skeleton height="5vh"></b-skeleton>
          </template>
        </h5>

        <!-- Searched Books -->
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
          <!-- skeleton -->
          <template v-else>
            <div v-for="n in 3" :key="n" class="column is-4">
              <b-skeleton height="35vh"></b-skeleton>
            </div>
          </template>
        </div>
      </section>

      <!-- Footer -->
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="emitClose">
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
    </form>
  </div>
</template>

<script>
import { BOOK_REGIST_MUTATION } from '@/graphql/mutation/bookRegist';

import SingleBook from '@/views/BookShelf/SingleBook';

export default {
  name: 'SearchInputForm',

  components: {
    SingleBook
  },

  props: {
    isSwitchOn: Boolean
  },

  data() {
    return {
      books: [],
      selectedBook: {},
      keyword: ''
    };
  },

  computed: {
    // define computed to pass sync props.
    isLocalSwitchOn: {
      get() {
        return this.isSwitchOn;
      },
      set(value) {
        if (value) this.resetForm();
        this.$emit('update:isSwitchOn', value);
      }
    },

    isSelectBook() {
      const volumeInfo = this.selectedBook.volumeInfo;
      return volumeInfo && volumeInfo.title;
    }
  },

  methods: {
    /**
     * search books through Google Books API.
     * https://developers.google.com/books/docs/v1/using
     */
    // TODO: [WANT] Google Books APIにApollo経由で通信を飛ばす
    async searchBook() {
      // check validation
      const isValid = this.$refs.inputForm.reportValidity();
      if (!isValid) return;

      // reset data
      this.selectedBook = {};

      // REST to Google Books API
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

    /**
     * Add selected book info to data.
     */
    selectBook(book) {
      this.selectedBook = book;
    },

    /**
     * Regist new book.
     */
    async registNewBook() {
      const book = this.selectedBook;
      const variables = {
        title: book.volumeInfo.title,
        imageUrl: book.volumeInfo.imageLinks.thumbnail,
        allPages: 300,
        status: 'WISH'
      };

      await this.$apollo.mutate({
        mutation: BOOK_REGIST_MUTATION,
        variables: variables
      });

      this.resetForm();
      this.$emit('regist-complete');
    },

    /**
     * emit to close modal.
     */
    emitClose() {
      this.resetForm();
      this.$emit('close-modal');
    },

    /**
     * reset local data.
     */
    resetForm() {
      // reset data
      this.books = [];
      this.selectedBook = {};
      this.keyword = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.search-books {
  height: 35vh;
}
</style>
