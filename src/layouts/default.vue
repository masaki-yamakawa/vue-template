<template>
  <div>
    <nav class="navbar header" role="navigation" aria-label="main navigation">
      <slide left width="350">
        <b-link :to="{ path: '/' }"><span>Main</span></b-link>
        <b-link :to="{ path: '/welcome' }" append><span>Welcome to Vue.js world</span></b-link>
        <b-link :to="{ path: '/about' }"><span>About us</span></b-link>
      </slide>
    </nav>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Slide } from "vue-burger-menu";

@Component({
  components: {
    Slide,
  },
})
export default class Layout extends Vue {}
</script>

<style scoped>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
