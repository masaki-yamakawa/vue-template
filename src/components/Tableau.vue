<template>
  <div class="tableau-container" v-visibility-change="onVisibilityChanged">
    <div class="dev-tool-bar" v-if="!hideDevToolbar">
      Refresh Interval:
      <input
        type="text"
        :value="refreshIntervalInput"
        v-on:change="onRefreshIntervalChanged"
        size="3"
        maxlength="5"
        class="refresh-interval-input"
      />ms
    </div>
    <div class="tableau-viz" ref="tableauViz" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import visibility from "vue-visibility-change";
import { Logger } from "../loggers/logger";

Vue.use(visibility);

@Component
export default class Tableau extends Vue {
  @Prop()
  private url!: string;
  @Prop({ default: "100%" })
  private width!: string;
  @Prop({ default: "100%" })
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
  @Prop({ default: true })
  private hideDevToolbar!: boolean;

  private viz: any;
  private refreshTimer: NodeJS.Timeout | null = null;
  private refreshIntervalInput: number = 0;

  private async mounted() {
    if (this.isTableauScriptLoaded() === false) {
      await this.loadTableauScript();
    }

    this.initViz();
    this.refreshIntervalInput = this.refreshInterval;
  }

  private isTableauScriptLoaded(): boolean {
    try {
      const vizManager = (window as any).tableau.VizManager;
      return true;
    } catch (err) {
      Logger.getLogger().debug("Tableau script is not yet loaded");
      return false;
    }
  }

  private loadTableauScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isTableauScriptLoaded()) {
        return;
      }

      const tableauScript = document.createElement("script");
      tableauScript.setAttribute("src", this.apiUrl);
      tableauScript.async = true;
      tableauScript.onload = () => {
        resolve();
      };
      document.head.appendChild(tableauScript);
    });
  }

  private beforeDestroy() {
    this.clearRefreshTimer();
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

    this.setRefreshTimer(this.refreshInterval);
  }

  private setRefreshTimer(interval: number) {
    this.clearRefreshTimer();
    if (interval > 0) {
      this.refreshTimer = setInterval(() => {
        this.viz.refreshDataAsync();
      }, interval);
      Logger.getLogger().debug(`Set refresh timer. interval=${interval}, timerId=${this.refreshTimer}`);
    }
  }

  private clearRefreshTimer() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      Logger.getLogger().debug(`Clear refresh timer. timerId=${this.refreshTimer}`);
      this.refreshTimer = null;
    }
  }

  private onRefreshIntervalChanged(event: any) {
    if (!isNaN(event.target.value)) {
      this.refreshIntervalInput = event.target.value;
      this.setRefreshTimer(event.target.value);
    }
  }

  private onVisibilityChanged(evt: any, hidden: boolean) {
    if (hidden) {
      this.clearRefreshTimer();
    } else {
      this.setRefreshTimer(this.refreshIntervalInput);
    }
  }
}
</script>

<style scoped>
.tableau-container {
  width: 100%;
  height: 100%;
  padding: 2px;
}
.dev-tool-bar {
  float: right;
  margin-right: 1.5%;
  font-size: 0.875rem;
}
.refresh-interval-input {
  height: 20px;
  padding: 0.2rem 0.2rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.4rem;
}
.tableau-viz {
  width: 100%;
  height: 100%;
}
</style>
