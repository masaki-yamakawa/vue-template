<template>
  <div>
    <nav class="navbar header" role="navigation" aria-label="main navigation">
      <slide left width="350" class="navbar slider">
        <b-link :to="{ path: '/' }"><span>Main</span></b-link>
        <b-link :to="{ path: '/welcome' }"><span>Welcome to Vue.js world</span></b-link>
        <b-link :to="{ path: '/about' }"><span>About us</span></b-link>
        <div>
          <b-dropdown id="dropdown-offset" offset="40" text="Add Content" variant="dark">
            <b-dropdown-item v-bind="iframeContents" v-for="iframeContent in iframeContents" :key="iframeContent.id" v-on:click="selectContent(iframeContent)">
              <span>{{ iframeContent.title }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
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
import store from "../stores";
import { Logger } from "../loggers/logger";

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
      const res = await repos.find();
      return res.data;
    } catch (err) {
      const status = err.response ? err.response.status : "";
      this.$notify({
        title: `ERROR:${status}`,
        type: "error",
        text: "Not connected to API server: Failed to get iframe contents",
        duration: 5000,
      });
      Logger.getLogger().error(`${status}: Not connected to API server: Failed to get iframe contents: ${err}`);
      return;
    }
  }

  private selectContent(content: any) {
    this.$store.commit("setContent", content);
  }
}
</script>

<style scoped>
.navbar.slider >>> .bm-burger-button {
  height: 27px;
  width: 33px;
  left: 5px;
  top: 10px;
}
.navbar.slider >>> .bm-menu {
  background-color: #343a40;
  padding-top: 20px;
}
.bm-item-list >* {
  padding: .4em;
}
.bm-item-list >*> span {
  font-weight: 400;
  font-size: 18px;
}
.dropdown.btn-group.b-dropdown >>> .btn {
  padding: 0rem 0.5rem;
}
</style>
