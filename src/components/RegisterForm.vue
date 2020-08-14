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
            <b-numberinput v-model="page" step="5" :min="min" :max="max"></b-numberinput>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <!-- Register Button -->
        <div class="column">
          <div class="is-pulled-right">
            <b-button type="is-info" icon-left="book-open" @click="regist">I Read it !</b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";

const REGISTER_INFO_QUERY = gql`
  query {
    book(id: 1) {
      id
      allPages
      progress {
        id
        currentPage
        readAt
      }
    }
  }
`;

const PROGRESS_REGISTER_MUTATION = gql`
  mutation createProgress($currentPage: Int!, $readAt: ISO8601DateTime!) {
    createProgress(bookId: 1, currentPage: $currentPage, readAt: $readAt) {
      id
      # currentPage
      # readAt
      # book {
      #   id
      #   title
      # }
    }
  }
`;

export default {
  name: "RegisterForm",

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
      query: REGISTER_INFO_QUERY
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
      // TODO: date, pageのバリデーションチェックを行う

      await this.$apollo.mutate({
        mutation: PROGRESS_REGISTER_MUTATION,
        variables: {
          currentPage: this.page,
          readAt: this.date
        }
      });

      this.$buefy.toast.open({
        message: "Register Success!",
        type: "is-success"
      });

      // 再検索
      await this.$apollo.queries.book.refetch();
      this.setInitValues();
    }
  }
};
</script>
