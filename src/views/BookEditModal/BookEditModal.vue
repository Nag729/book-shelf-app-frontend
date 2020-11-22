<template>
  <b-modal
    :active.sync="isLocalActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    aria-role="dialog"
    aria-modal
  >
    <div class="modal-card">
      <form ref="inputForm" @submit.prevent>
        <!-- Header -->
        <header class="modal-card-head">
          <p class="modal-card-title">Edit A Book!</p>
        </header>

        <!-- Body -->
        <section class="modal-card-body">
          <!-- Title -->
          <b-field label="Title">
            <b-input v-model="title" icon="book-open" required></b-input>
          </b-field>
          <!-- Image URL -->
          <b-field label="Image URL">
            <b-input
              v-model="imageUrl"
              type="url"
              icon="link"
              required
            ></b-input>
          </b-field>
          <!-- All Pages -->
          <b-field label="All Pages">
            <b-numberinput v-model="allPages" step="1"></b-numberinput>
          </b-field>
          <!-- Status -->
          <b-field label="Status">
            <b-select
              v-model="status"
              placeholder="Status"
              icon="check"
              required
              expanded
            >
              <template v-for="o in statusOption">
                <option :key="o" :value="o">{{ o }}</option>
              </template>
            </b-select>
          </b-field>
        </section>

        <!-- Footer -->
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeModal">
            Close
          </button>
          <button class="button is-primary" @click="editBook">
            Edit
          </button>
        </footer>
      </form>
    </div>
  </b-modal>
</template>

<script>
import { BOOK_INFO_QUERY } from '@/graphql/query/bookInfo';
import { BOOK_UPDATE_MUTATION } from '@/graphql/mutation/bookUpdate';

export default {
  name: 'BookEditModal',

  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      book: {},
      title: '',
      imageUrl: '',
      allPages: 300,
      status: 'WISH',
      statusOption: ['WISH', 'HAVE', 'DOING', 'DONE']
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

  computed: {
    isLocalActive: {
      get() {
        return this.isActive;
      },
      set(value) {
        this.$emit('update:isActive', value);
      }
    }
  },

  async mounted() {
    // refetch book data
    const apolloBook = await this.$apollo.queries.book.refetch();
    const book = apolloBook.data.book;

    // set Form data
    this.title = book.title;
    this.imageUrl = book.imageUrl;
    this.allPages = book.allPages;
    this.status = book.status;
  },

  methods: {
    async editBook() {
      // update book info
      const variables = {
        id: this.$route.params.id,
        title: this.title,
        imageUrl: this.imageUrl,
        allPages: this.allPages,
        status: this.status
      };

      await this.$apollo.mutate({
        mutation: BOOK_UPDATE_MUTATION,
        variables: variables
      });

      // refetch data after mutation
      await this.$apollo.queries.book.refetch();

      // complete toast open
      this.$buefy.toast.open({
        message: 'Update Success!',
        type: 'is-success'
      });

      this.closeModal();
    },

    closeModal() {
      this.isLocalActive = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
