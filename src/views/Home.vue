<template>
  <div class="home">
    <div v-if="!$auth.isAuthenticated">
      <section class="hero is-large is-bold">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h2 class="title has-text-white">Log in with GitHub Account.</h2>
            <b-button
              size="is-medium"
              icon-left="shield-plus"
              type="is-info"
              @click="login"
              >Log in</b-button
            >
          </div>
        </div>
      </section>
    </div>

    <div v-if="$auth.isAuthenticated">
      <section class="hero is-medium is-bold">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h2 class="title has-text-white">
              Welcome {{ $auth.user.nickname }}!
            </h2>
            <div>
              <b-image
                :src="$auth.user.picture"
                alt="User Icon"
                ratio="1by1"
                :rounded="true"
              ></b-image>
              <br />
            </div>
            <div>
              <b-button
                type="is-info"
                icon-left="book"
                tag="router-link"
                to="/book-shelf"
              >
                Go To Book Shelf
              </b-button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  methods: {
    async login() {
      await this.$auth.loginWithRedirect();
    }
  }
};
</script>
