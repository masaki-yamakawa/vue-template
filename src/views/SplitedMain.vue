<template>
  <div class="splitpanes-container">
    <splitpanes horizontal style="height: 680px">
      <span v-for="tableauViews in tableauViewsArray" :key="tableauViews.id">
        <splitpanes>
          <span v-for="tableauView in tableauViews" :key="tableauView.id"><Tableau :url="tableauView.url" /></span>
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
      { id: 10, url: "http://public.tableau.com/views/RegionalSampleWorkbook/Storms", next: [] },
    ],
    [
      { id: 20, url: "http://public.tableau.com/views/RegionalSampleWorkbook/Obesity", next: [] },
      { id: 21, url: "http://public.tableau.com/views/RegionalSampleWorkbook/College", next: [] },
      { id: 22, url: "http://public.tableau.com/views/RegionalSampleWorkbook/Economy", next: [] },
    ],
    [
      { id: 30, url: "http://public.tableau.com/views/RegionalSampleWorkbook/Flights", next: [] },
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
