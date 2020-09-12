<template>
  <div class="home">
    <div v-if="!$auth.isAuthenticated">
      <section class="hero is-medium is-info is-bold">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h2 class="title">Log in with Google Account.</h2>
            <b-button size="is-medium" icon-left="shield-plus" @click="login"
              >Log in</b-button
            >
          </div>
        </div>
      </section>
    </div>

    <div v-if="$auth.isAuthenticated">
      <h1>ログインしてくれてありがとう！</h1>
      <div>
        <img :src="$auth.user.picture" />
        <h2>{{ $auth.user.name }}</h2>
        <p>{{ $auth.user.email }}</p>
      </div>

      <div>
        <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  methods: {
    async login() {
      await this.$auth.loginWithRedirect();
    }
  }
};
</script>
