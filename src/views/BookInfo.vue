<template>
  <div>
    <section>
      <div class="columns">
        <div class="column is-one-third">
          <!-- picture -->
          <!-- TODO: ネットワーク越しの画像取得でCORBエラー -->
          <BookCard :image-url="book.image_url" :title="book.title"></BookCard>
        </div>
        <div class="column">
          <!-- Reading info -->
          <ReadingInfo :latest-page="latestPage" :all-pages="book.all_pages"></ReadingInfo>
          <!-- line chart -->
          <LineChart></LineChart>
          <!-- Forms -->
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
import BookCard from "@/components/BookCard";
import ReadingInfo from "@/components/ReadingInfo";
import LineChart from "@/components/LineChart";
import RegisterForm from "@/components/RegisterForm";

const BOOK_INFO_QUERY = gql`
  query getBook {
    book {
      id
      title
      image_url
      all_pages
      # start_date
      # end_date
      status
      progress {
        id
        current_page
      }
    }
  }
`;

export default {
  name: "BookInfo",

  components: {
    BookCard,
    ReadingInfo,
    LineChart,
    RegisterForm
  },

  data() {
    return {
      book: {}
    };
  },

  computed: {
    latestPage() {
      const progress = this.book.progress;
      const idx = progress.length - 1;
      return progress[idx].current_page;
    }
  },

  apollo: {
    book: {
      query: BOOK_INFO_QUERY
    }
  }
};
</script>
