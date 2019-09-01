<template>
  <div class="splitpanes-container">
    <splitpanes horizontal class="default-theme" style="height: 680px">
      <span v-for="tableauViews in tableauViewsArray" :key="tableauViews.id">
        <splitpanes>
          <span v-for="tableauView in tableauViews" :key="tableauView.id">
            <Tableau :url="tableauView.url" :refreshInterval="5000" :hideDevToolbar="false" />
          </span>
        </splitpanes>
      </span>
    </splitpanes>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Splitpanes from "splitpanes";
import Tableau from "@/components/Tableau.vue";
import "splitpanes/dist/splitpanes.css";

@Component({
  components: {
    Splitpanes,
    Tableau,
  },
})
export default class SplitedMain extends Vue {
  private tableauViewsArray = [
    [
      { id: 10, url: "http://public.tableau.com/views/RegionalSampleWorkbook/Storms", children: [[]] },
    ],
    [
      { id: 20, url: "http://public.tableau.com/views/RegionalSampleWorkbook/Obesity", children: [[]] },
      { id: 21, url: "http://public.tableau.com/views/RegionalSampleWorkbook/College", children: [[]] },
      { id: 22, url: "http://public.tableau.com/views/RegionalSampleWorkbook/Economy", children: [[]] },
    ],
    [
      { id: 30, url: "http://public.tableau.com/views/RegionalSampleWorkbook/Flights", children: [[]] },
    ],
  ];
}
</script>

<style scoped>
.splitpanes-container {
  width: 100%;
  height: 100%;
  margin: 20px auto;
  padding-left: 12px;
}
</style>

<style>
.default-theme.splitpanes--horizontal > .splitpanes__splitter,
.default-theme .splitpanes--horizontal > .splitpanes__splitter {
  height: 11px;
}
.default-theme.splitpanes--vertical > .splitpanes__splitter,
.default-theme .splitpanes--vertical > .splitpanes__splitter {
  width: 11px;
}
</style>
