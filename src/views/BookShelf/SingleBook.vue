<template>
  <div class="card" @click="handleClick">
    <a>
      <b-image :src="imageUrl"> </b-image>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SingleBook',

  props: {
    id: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },

  methods: {
    handleClick() {
      this.$emit('card-click', this.id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
