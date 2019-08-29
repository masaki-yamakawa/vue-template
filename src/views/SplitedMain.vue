<template>
  <div class="splitpanes-container">
    <splitpanes class="default-theme" horizontal style="height: 680px">
      <splitpanes>
        <span splitpanes-size="30%"><Tableau :url="url" /></span>
        <span splitpanes-size="40%"><Tableau url="http://public.tableau.com/views/RegionalSampleWorkbook/Obesity" :hideDevToolbar="false" /></span>
        <span splitpanes-size="30%">dummy</span>
      </splitpanes>
      <span splitpanes-size="100%"><Tableau url="http://public.tableau.com/views/RegionalSampleWorkbook/Stocks" :hideDevToolbar="false" /></span>
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
  private url: string = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms";
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
