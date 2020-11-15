<template>
  <!-- Navbar -->
  <b-navbar type="is-light" fixed-top spaced>
    <!-- Brand Icon -->
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/book-shelf' }">
        <img id="book-icon" src="@/assets/book-icon.png" alt="book icon" />
      </b-navbar-item>
    </template>

    <template slot="start">
      <!-- Home -->
      <b-navbar-item id="home-link" tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <!-- BookShelf -->
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
          <!-- Login -->
          <a
            v-if="!$auth.isAuthenticated"
            id="login"
            class="button is-info"
            @click="login"
            >Log in</a
          >
          <!-- Logout -->
          <a
            v-if="$auth.isAuthenticated"
            id="logout"
            class="button"
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
