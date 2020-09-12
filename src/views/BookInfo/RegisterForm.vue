<template>
  <div>
    <section>
      <div class="columns">
        <!-- DatePicker -->
        <div class="column">
          <b-field label="DATE">
            <b-datepicker
              placeholder="Click to select..."
              icon="calendar-today"
              trap-focus
              v-model="date"
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
            <b-button type="is-info" icon-left="book-open" @click="regist"
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
      const inputDate = new Date(this.date);
      let isDateOk;
      let isPageOk;

      if (this.book.progress.length > 0) {
        const lastProgress = this.book.progress.slice(-1)[0];
        const lastDate = new Date(lastProgress.readAt);
        const lastPage = lastProgress.currentPage;

        isDateOk =
          lastDate.getDate() <= inputDate.getDate() &&
          inputDate.getDate() <= new Date().getDate();
        isPageOk = lastPage < this.page && this.page <= this.max;
      } else {
        isDateOk = inputDate.getDate() <= new Date().getDate();
        isPageOk = 0 < this.page && this.page <= this.max;
      }

      if (!isDateOk || !isPageOk) {
        this.$buefy.dialog.alert({
          title: 'Validation Error',
          message: 'Input Error has occured!',
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
