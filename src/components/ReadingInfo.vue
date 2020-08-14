<template>
  <div>
    <!-- TODO: STATUSによって出力内容を変える -->
    <p
      class="is-size-4 has-text-centered has-text-weight-bold"
    >I read {{ latestPage }} / {{ allPages }} pages now ! 😆</p>
  </div>
</template>

<script>
export default {
  name: "ReadingInfo",

  props: {
    latestPage: {
      type: Number
    },
    allPages: {
      type: Number
    }
  },

  data() {
    return {};
  },

  methods: {}
};
</script>
