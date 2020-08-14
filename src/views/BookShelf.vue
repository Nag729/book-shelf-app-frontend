<template>
  <div>
    <section>
      <!-- TODO: 本を登録できるダイアログを追加 -->
      <!-- https://developers.google.com/books/docs/v1/using#PerformingSearch -->

      <!-- BookShelf -->
      <!-- TODO: SingleBookをList表示する -->
      <SingleBook></SingleBook>
    </section>
  </div>
</template>

<script>
// import gql from 'graphql-tag';
import SingleBook from "@/components/SingleBook";

export default {
  name: "BookShelf",

  components: {
    SingleBook
  },

  data() {
    return {};
  }
};
</script>
