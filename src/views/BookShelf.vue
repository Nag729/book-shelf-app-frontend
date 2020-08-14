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
    return {};
  }
};
</script>
