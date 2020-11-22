<template>
  <b-modal
    :active.sync="isLocalActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    aria-role="dialog"
    aria-modal
  >
    <!-- Search Form by Google Books Api -->
    <SearchInputForm
      v-show="!isManual"
      :is-switch-on.sync="isManual"
      @regist-complete="refetchData"
      @close-modal="closeModal"
    ></SearchInputForm>

    <!-- Manual User Input Form -->
    <ManualInputForm
      v-show="isManual"
      :is-switch-on.sync="isManual"
      @regist-complete="refetchData"
      @close-modal="closeModal"
    ></ManualInputForm>
  </b-modal>
</template>

<script>
import { ALL_BOOKS_QUERY } from '@/graphql/query/allBooks';

import SearchInputForm from './SearchInputForm';
import ManualInputForm from './ManualInputForm';

export default {
  name: 'BookAddModal',

  components: {
    SearchInputForm,
    ManualInputForm
  },

  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      isManual: false,
      allBooks: ''
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
        this.$emit('update:isActive', value);
      }
    }
  },

  methods: {
    async refetchData() {
      // complete toast open
      this.$buefy.toast.open({
        message: 'Register Success!',
        type: 'is-success'
      });

      // refetch data
      await this.$apollo.queries.allBooks.refetch();

      this.closeModal();
    },

    closeModal() {
      this.isLocalActive = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
