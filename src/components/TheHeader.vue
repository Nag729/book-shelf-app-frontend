<template>
  <!-- Navbar -->
  <b-navbar type="is-light" fixed-top spaced>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/book-shelf' }">
        <img id="book-icon" src="@/assets/book-icon.png" alt="book icon" />
      </b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item id="home-link" tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-item
        id="book-shelf-link"
        tag="router-link"
        :to="{ path: '/book-shelf' }"
      >
        Book Shelf
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            id="login"
            v-if="!$auth.isAuthenticated"
            class="button is-info"
            @click="login"
            >Log in</a
          >
          <a
            id="logout"
            v-if="$auth.isAuthenticated"
            class="button is-info"
            @click="logout"
            >Log out</a
          >
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheHeader',

  methods: {
    async login() {
      await this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
