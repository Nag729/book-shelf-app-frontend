<template>
  <div>
    <section>
      <div class="columns">
        <!-- DatePicker -->
        <div class="column">
          <b-field label="DATE">
            <b-datepicker
              v-model="date"
              placeholder="Click to select..."
              icon="calendar-today"
              trap-focus
            ></b-datepicker>
          </b-field>
        </div>
        <!-- Page Number -->
        <div class="column">
          <b-field label="PAGE">
            <b-numberinput
              v-model="page"
              step="5"
              :min="min"
              :max="max"
            ></b-numberinput>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <!-- Register Button -->
        <div class="column">
          <div class="is-pulled-right">
            <b-button type="is-primary" icon-left="book-open" @click="regist"
              >I Read it !</b-button
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { PROGRESS_INFO_QUERY } from '@/graphql/query/progressInfo';
import { PROGRESS_REGIST_MUTATION } from '@/graphql/mutation/progressRegist';

export default {
  name: 'RegisterForm',

  props: {},

  data() {
    return {
      book: {},
      date: new Date(),
      page: 0,
      min: 0,
      max: 500
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

  async mounted() {
    await this.$apollo.queries.book.refetch();
    this.setInitValues();
  },

  methods: {
    setInitValues() {
      const progress = this.book.progress;
      if (!progress || progress.length === 0) return;

      // page, min
      const idx = progress.length - 1;
      this.page = progress[idx].currentPage;
      this.min = progress[idx].currentPage;

      // max
      this.max = this.book.allPages;
    },

    async regist() {
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
          readAt: this.date
        }
      });

      this.$buefy.toast.open({
        message: 'Register Success!',
        type: 'is-success'
      });

      // re-search
      await this.$apollo.queries.book.refetch();
      this.setInitValues();
    }
  }
};
</script>
