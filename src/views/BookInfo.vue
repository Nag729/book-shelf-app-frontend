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
import LineChart from "@/components/LineChart";
import RegisterForm from "@/components/RegisterForm";

const BOOK_INFO_QUERY = gql`
  query getBook {
    book {
      id
      title
      image_url
      all_page
      # start_date
      # end_date
      status
      progress_ids {
        id
        book_id
        current_page
      }
    }
  }
`;

export default {
  name: "BookInfo",

  components: {
    BookCard,
    LineChart,
    RegisterForm
  },

  data() {
    return {
      book: {}
    };
  },

  apollo: {
    book: {
      query: BOOK_INFO_QUERY
    }
  }
};
</script>
