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
import { RepositoryFactory } from "../repositories/repositoryFactory";
import { IContentRepository } from "../repositories/contentRepository";

@Component({
  components: {
    Slide,
  },
})
export default class Layout extends Vue {
  private iframeContents = [];

  private async created() {
    this.iframeContents = await this.getIframeContents();
  }

  private async getIframeContents() {
    try {
      const repos: IContentRepository = RepositoryFactory.get("Content") as IContentRepository;
      const res = await repos.find(`/api/v1/content`);
      return res.data;
    } catch (err) {
      this.$notify({
        title: "ERROR",
        type: "error",
        text: "Not connected to API server: Failed to get iframe contents",
        duration: 5000,
      });
      console.log(`Not connected to API server: Failed to get iframe contents: ${err}`);
      return;
    }
  }
}
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
