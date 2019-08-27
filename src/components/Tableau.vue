<template>
  <div ref="tableauViz"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Logger } from "../loggers/logger";

@Component
export default class Tableau extends Vue {
  @Prop()
  private url!: string;
  @Prop({ default: "100%" })
  private width!: string;
  @Prop({ default: "700px" })
  private height!: string;
  @Prop({ default: false })
  private hideTabs!: boolean;
  @Prop({ default: false })
  private hideToolbar!: boolean;
  @Prop({
    default: "https://public.tableau.com/javascripts/api/tableau-2.2.2.min.js",
  })
  private apiUrl!: string;
  @Prop({ default: -1 })
  private refreshInterval!: number;

  private viz: any;
  private refreshTimer: NodeJS.Timeout | null = null;

  private mounted() {
    const tableauScript = document.createElement("script");
    tableauScript.setAttribute("src", this.apiUrl);
    document.head.appendChild(tableauScript);

    try {
      this.initViz();
    } catch (err) {
      window.addEventListener("load", () => {
        this.initViz();
      });
    }
  }

  private beforeDestroy() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
    this.viz.dispose();
  }

  private initViz() {
    const vizDiv = this.$refs.tableauViz;
    const options = {
      height: this.height,
      width: this.width,
      hideTabs: this.hideTabs,
      hideToolbar: this.hideToolbar,
      onFirstInteractive: () => {
        Logger.getLogger().debug("Tableau viz has finished loading");
      },
    };
    this.viz = new (window as any).tableau.Viz(vizDiv, this.url, options);

    if (this.refreshInterval > 0) {
      this.refreshTimer = setInterval(() => {
        this.viz.refreshDataAsync();
      }, this.refreshInterval);
    }
  }
}
</script>
