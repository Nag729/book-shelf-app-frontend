<template>
  <div>
    <div class="card timeline-card">
      <div class="card-content flex-container">
        <b-image
          class="user-icon"
          :src="$auth.user.picture"
          alt="Icon"
          :rounded="true"
        ></b-image>
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

.flex-container {
  width: 100%;
  display: flex;
}

.user-icon {
  width: 48px;
  height: 48px;
  margin-right: 3%;
}

.title {
  color: #4c4c4c;
  font-size: small;
}
</style>
