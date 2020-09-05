<template>
  <div id="app">
    <div class="sf-site-all" :class="hasBackground ? 'has-background' : ''">
      <!-- Header -->
      <TheHeader></TheHeader>

      <!-- Main View -->
      <div class="container sf-site-content">
        <section class="site-content">
          <router-view />
        </section>
      </div>

      <!-- Footer -->
      <TheFooter></TheFooter>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  name: "App",

  components: {
    TheHeader,
    TheFooter
  },

  computed: {
    hasBackground() {
      return this.$route.name === "BookShelf";
    }
  }
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

.sf-site-all {
  min-height: 100vh; /* 全体の高さを最低でもビューポートの100%にする */
  display: flex;
  flex-direction: column; /* 子クラスの横並びの方向を縦にする */
}

.sf-site-content {
  flex: 1; /* flexに1つだけ数値を指定するとその要素は伸びる */
}

.has-background {
  background-image: url("/shelf-background.jpg");
}

.site-content {
  margin: 1rem 0 1rem 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
  }
}
</style>
