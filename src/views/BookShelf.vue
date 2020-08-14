<template>
  <div>
    <section>
      <!-- BookShelf -->
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
    return {
      books: [
        {
          id: 123,
          image_url: "@/assets/graphql.jpg",
          progress: 80
        },
        {
          id: 456,
          image_url: "@/assets/hbr.jpg",
          progress: 20
        }
      ]
    };
  }
};
</script>
