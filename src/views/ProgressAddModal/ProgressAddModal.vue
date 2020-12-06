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
          <p class="modal-card-title">Add A Progress!</p>
        </header>

        <!-- Body -->
        <section class="modal-card-body">
          <!-- Date -->
          <b-field label="DATE">
            <b-datepicker
              v-model="date"
              placeholder="Click to select..."
              icon="calendar-today"
              trap-focus
            ></b-datepicker>
          </b-field>
          <!-- Read Page -->
          <b-field label="PAGE">
            <b-numberinput
              v-model="page"
              step="5"
              :min="min"
              :max="max"
            ></b-numberinput>
          </b-field>
          <!-- Note -->
          <b-field label="NOTE">
            <b-input v-model="note" type="textarea"></b-input>
          </b-field>
        </section>

        <!-- Footer -->
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeModal">
            Close
          </button>
          <button class="button is-primary" @click="addProgress">
            Add
          </button>
        </footer>
      </form>
    </div>
  </b-modal>
</template>

<script>
import { PROGRESS_INFO_QUERY } from '@/graphql/query/progressInfo';
import { PROGRESS_REGIST_MUTATION } from '@/graphql/mutation/progressRegist';

export default {
  name: 'ProgressAddModal',

  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      book: {},
      date: new Date(),
      page: 0,
      min: 0,
      max: 500,
      note: ''
    };
  },

  apollo: {
    book: {
      query: PROGRESS_INFO_QUERY,
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
    await this.$apollo.queries.book.refetch();
    this.setInitValues();
  },

  methods: {
    setInitValues() {
      const progress = this.book.progress;
      if (!progress || !progress.length) return;

      // page, min
      const idx = progress.length - 1;
      this.page = progress[idx].currentPage;
      this.min = progress[idx].currentPage;

      // max
      this.max = this.book.allPages;
    },

    async addProgress() {
      // Validation Check
      const progress = this.book.progress;
      const hasProgress = progress.length > 0;

      // Date Validation
      const typedDate = new Date(this.date);
      const isTypedDateAfterToday = typedDate.getTime() > new Date().getTime();
      const isTypedDateBeforeLast =
        hasProgress &&
        new Date(progress[progress.length - 1].readAt).getTime() >
          typedDate.getTime();

      if (isTypedDateAfterToday || isTypedDateBeforeLast) {
        this.$buefy.dialog.alert({
          title: 'Date Validation Error',
          message: 'Typed Date is invalid!',
          type: 'is-danger'
        });
        return;
      }

      // Page Validation
      const lastPage = hasProgress
        ? progress[progress.length - 1].currentPage
        : 0;
      const isTypedPageLargerAllPages = this.page > this.max;
      const isTypedPageSmallerLast = lastPage > this.page;

      if (isTypedPageLargerAllPages || isTypedPageSmallerLast) {
        this.$buefy.dialog.alert({
          title: 'Page Validation Error',
          message: 'Typed Page is invalid!',
          type: 'is-danger'
        });
        return;
      }

      await this.$apollo.mutate({
        mutation: PROGRESS_REGIST_MUTATION,
        variables: {
          bookId: this.$route.params.id,
          currentPage: this.page,
          readAt: this.date,
          note: this.note
        }
      });

      this.$buefy.toast.open({
        message: 'Register Success!',
        type: 'is-success'
      });

      // re-search
      await this.$apollo.queries.book.refetch();

      // close modal
      this.closeModal();
    },

    closeModal() {
      this.isLocalActive = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
