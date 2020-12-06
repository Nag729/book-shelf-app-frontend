<template>
  <div>
    <div class="card timeline-card">
      <div class="card-content">
        <p class="title">
          {{ note }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineCard',

  props: {
    note: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.timeline-card {
  color: gray;
  background-color: white;
  border-radius: 0.5rem;
}

.card-content {
  padding: 1rem;
}

.title {
  color: #4c4c4c;
  font-size: small;
}
</style>
