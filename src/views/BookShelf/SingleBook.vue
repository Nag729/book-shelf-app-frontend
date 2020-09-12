<template>
  <div class="card" @click="handleClick">
    <a>
      <figure class="image">
        <img :src="imageUrl" />
      </figure>
    </a>
  </div>
</template>

<script>
export default {
  name: "SingleBook",

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
      this.$emit("card-click", this.id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
