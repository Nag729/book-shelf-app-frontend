<template>
	<div id="app">
		<div class="sf-site-all">
			<!-- Navbar -->
			<b-navbar fixed-top>
				<template slot="brand">
					<b-navbar-item tag="router-link" :to="{ path: '/' }">
						<!-- FIXME: fix image -->
						<img
							src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
							alt="Lightweight UI components for Vue.js based on Bulma"
						/>
					</b-navbar-item>
				</template>
				<template slot="start">
					<b-navbar-item tag="router-link" :to="{ path: '/graphql' }">Sample</b-navbar-item>
					<b-navbar-item tag="router-link" :to="{ path: '/book-info' }">Book Info</b-navbar-item>
				</template>

				<template slot="end">
					<b-navbar-item tag="div">
						<div class="buttons">
							<a class="button is-primary">
								<strong>Sign up</strong>
							</a>
							<a class="button is-light">Log in</a>
						</div>
					</b-navbar-item>
				</template>
			</b-navbar>
			<!-- Main View -->
			<div class="container sf-site-content">
				<section>
					<router-view />
				</section>
			</div>
			<!-- Footer -->
			<footer class="footer">
				<div class="container has-text-centered">
					<p>@Author: Nag729 / ooyu-kioo</p>
				</div>
			</footer>
		</div>
	</div>
</template>

<style lang="scss">
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
	'white': (
		$white,
		$black,
	),
	'black': (
		$black,
		$white,
	),
	'light': (
		$light,
		$light-invert,
	),
	'dark': (
		$dark,
		$dark-invert,
	),
	'primary': (
		$primary,
		$primary-invert,
	),
	'info': (
		$info,
		$info-invert,
	),
	'success': (
		$success,
		$success-invert,
	),
	'warning': (
		$warning,
		$warning-invert,
	),
	'danger': (
		$danger,
		$danger-invert,
	),
	'twitter': (
		$twitter,
		$twitter-invert,
	),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';

.sf-site-all {
	min-height: 100vh; /* 全体の高さを最低でもビューポートの100%にする */
	display: flex; /* 子クラスを横並びにする */
	flex-direction: column; /* 子クラスの横並びの方向を縦にする */
}
.sf-site-content {
	flex: 1; /* flexに1つだけ数値を指定するとその要素は伸びる */
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
