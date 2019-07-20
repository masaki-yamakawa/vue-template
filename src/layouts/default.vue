<template>
  <div>
    <nav class="navbar header" role="navigation" aria-label="main navigation">
      <slide left width="350">
        <a href="/"><span>Main</span></a>
        <a href="/welcome"><span>Welcome to Vue.js world</span></a>
        <a href="/about"><span>About us</span></a>
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
