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
      <div class="modal-card" style="width: auto">
        <!-- Header -->
        <header class="modal-card-head">
          <p class="modal-card-title">Add A Book!</p>
        </header>

        <!-- Body -->
        <section class="modal-card-body">
          <!-- Form -->
          <b-field label="Keyword">
            <b-input v-model="keyword" placeholder="Book Keyword" required></b-input>
          </b-field>
          <b-field>
            <button class="button is-info" @click="searchBook">Search</button>
          </b-field>

          <!-- Books -->
          <template v-if="selectedBook.volumeInfo && selectedBook.volumeInfo.title">
            <h5 class="subtitle is-5 has-text-centered">selected title is</h5>
            <!-- CSSでラインマーカー風にする -->
            <h4
              class="title is-4 has-text-centered line-markered"
            >{{ selectedBook.volumeInfo.title }}</h4>
          </template>

          <div class="columns">
            <div class="column is-4" v-for="book in books" :key="book.id" @click="selectBook(book)">
              <SingleBook :id="book.id" :image-url="book.volumeInfo.imageLinks.thumbnail"></SingleBook>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isLocalActive = false">Close</button>
          <button class="button is-primary" @click="registNewBook">Add</button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { ALL_BOOKS_QUERY } from "@/graphql/query/allBooks";
import { BOOK_REGIST_MUTATION } from "@/graphql/mutation/bookRegist";

// TODO: Google Books APIにApollo経由で通信を飛ばす
import SingleBook from "./SingleBook";

export default {
  name: "BookAddModal",

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
      allBooks: "",
      books: [],
      selectedBook: {},
      keyword: ""
    };
  },

  apollo: {
    allBooks: {
      query: ALL_BOOKS_QUERY
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
          return book.saleInfo.country === "JP";
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
          status: "HAVE"
        }
      });

      this.$buefy.toast.open({
        message: "Register Success!",
        type: "is-success"
      });

      // re-search
      await this.$apollo.queries.allBooks.refetch();

      // close the modal
      this.isLocalActive = false;
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
          this.keyword = "";
        }
        this.$emit("update:isActive", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.line-markered {
  background: linear-gradient(transparent 60%, #ff8 60%);
}
</style>
