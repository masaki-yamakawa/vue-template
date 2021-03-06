<template>
  <div>
    <nav class="navbar header" role="navigation" aria-label="main navigation">
      <slide left width="350" class="navbar slider">
        <b-link :to="{ path: '/' }"><span>Main</span></b-link>
        <b-link :to="{ path: '/smain' }"><span>Splitted Main</span></b-link>
        <b-link :to="{ path: '/welcome' }"><span>Welcome to Vue.js world</span></b-link>
        <b-link :to="{ path: '/about' }"><span>About us</span></b-link>
        <div>
          <b-dropdown id="dropdown-offset" offset="40" text="Add Content" variant="dark">
            <b-dropdown-item v-bind="iframeContents" v-for="iframeContent in iframeContents" :key="iframeContent.id" v-on:click="selectContent(iframeContent)">
              <span>{{ iframeContent.title }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div>
          <b-dropdown id="dropdown-offset" offset="40" text="Add Content(xml)" variant="dark">
            <b-dropdown-item v-bind="iframeXmlContents" v-for="iframeXmlContent in iframeXmlContents" :key="iframeXmlContent.id" v-on:click="selectContent(iframeXmlContent._attributes)">
              <span>{{ iframeXmlContent._attributes.title }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <b-link @click="showSaveLayout"><span>Save Layout</span></b-link>
        <SaveLayoutDialog v-if="showSaveLayoutDialog" :saveData="saveLayoutData" @ok="doSaveLayout" @cancel="cancelSaveLayout" />
        <b-link :to="{ path: '/Login' }" v-on:click="logout"><span>Logout</span></b-link>
      </slide>
    </nav>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Slide } from "vue-burger-menu";
import SaveLayoutDialog from "@/components/SaveLayoutDialog.vue";
import * as xmlConverter from "xml-js";
import { RepositoryFactory } from "../repositories/repositoryFactory";
import { IContentRepository } from "../repositories/contentRepository";
import { ILayoutRepository } from "../repositories/layoutRepository";
import store from "../stores";
import { Logger } from "../loggers/logger";

@Component({
  components: {
    Slide,
    SaveLayoutDialog,
  },
})
export default class Layout extends Vue {
  private iframeContents = [];
  private iframeXmlContents = [];
  private showSaveLayoutDialog: boolean = false;
  private saveLayoutData: any[][] = [[]];

  private async created() {
    this.iframeContents = await this.getIframeContents();
    this.iframeXmlContents = await this.getIframeXmlContents();
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
        text: "Error occurred when connecting to API server: Failed to get iframe contents",
        duration: 5000,
      });
      Logger.getLogger().error(`${status}: Error occurred when connecting to API server: Failed to get iframe contents: ${err}`);
      return;
    }
  }

  private async getIframeXmlContents() {
    try {
      const repos: IContentRepository = RepositoryFactory.get("XmlContent") as IContentRepository;
      const res = await repos.find();
      const parsedXml: any = xmlConverter.xml2js(res.data, { compact: true, ignoreComment: true });
      return parsedXml.response.contents.content;
    } catch (err) {
      const status = err.response ? err.response.status : "";
      this.$notify({
        title: `ERROR:${status}`,
        type: "error",
        text: "Error occurred when connecting to API server: Failed to get iframe xml contents",
        duration: 5000,
      });
      Logger.getLogger().error(`${status}: Error occurred when connecting to API server: Failed to get iframe xml contents: ${err}`);
      return;
    }
  }

  private selectContent(content: any) {
    this.$store.commit("setContent", content);
  }

  private showSaveLayout(): void {
    const splitedMain = this.$children.find((child) => child.$options.name === "SplitedMain");
    if (splitedMain) {
      this.saveLayoutData = (splitedMain as any).tableauViewsArray;
      this.showSaveLayoutDialog = true;
    } else {
      this.$notify({
        title: "WARNING",
        type: "warn",
        text: "Layout cannot be saved with this page",
        duration: 5000,
      });
    }
  }

  private async doSaveLayout(saveOpt: any): Promise<void> {
    this.showSaveLayoutDialog = false;
    Logger.getLogger().debug(`doSaveLayout:name=${saveOpt.name}, shareWith=${saveOpt.share}`);

    try {
      const repos: ILayoutRepository = RepositoryFactory.get("Layout") as ILayoutRepository;
      const req = {
        owner: store.getters.userId,
        group: "Group1",
        layouts: [
          {
            id: null,
            name: saveOpt.name,
            shareWith: saveOpt.share,
            layout: this.saveLayoutData,
          },
        ],
      };
      await repos.save("Layout", req);
    } catch (err) {
      const status = err.response ? err.response.status : "";
      this.$notify({
        title: `ERROR:${status}`,
        type: "error",
        text: "Error occurred when connecting to API server: Failed to save layout",
        duration: 5000,
      });
      Logger.getLogger().error(`${status}: Error occurred when connecting to API server: Failed to save layout: ${err}`);
    }
  }

  private cancelSaveLayout(): void {
    this.showSaveLayoutDialog = false;
  }

  private logout() {
    this.$store.commit("doLogout");
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
