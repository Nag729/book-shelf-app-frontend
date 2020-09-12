<template>
  <!-- Navbar -->
  <b-navbar type="is-light" fixed-top spaced>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/book-shelf' }">
        <img id="book-icon" src="@/assets/book-icon.png" alt="book icon" />
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            v-if="!$auth.isAuthenticated"
            class="button is-primary"
            @click="login"
            >Log in</a
          >
          <a
            v-if="$auth.isAuthenticated"
            class="button is-light"
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
  name: "TheHeader",

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
