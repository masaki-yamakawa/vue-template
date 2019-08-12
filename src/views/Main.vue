<template>
  <div class="view-lane-container">
    <div class="view-lane-views">
      <div v-for="(views, id) in viewsLanes" :key="id" class="views-lanes" ref="viewLane">
        <div class="views-lane">
          <draggable :options="{group:'group', animation: 150}">
            <div v-for="view in views" :key="view.id" class="view-lane item">
              {{ view.name }} <span class="view-close-button" @click="delView(view.id)">x</span>
              <br />
              <iframe :src="view.url" class="iframe-view" />
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <div class="view-lane-button">
      <b-button v-on:click="addLane" pill variant="outline-secondary" style="width: 40px; height: 40px;">+</b-button>
      <b-button v-on:click="delLane" pill variant="outline-secondary" style="width: 40px; height: 40px;">-</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Draggable from "vuedraggable";
import store from "../stores";
import * as util from "util";
import { Logger } from "../loggers/logger";

@Component({
  components: {
    Draggable,
  },
})
export default class Main extends Vue {
  private viewsLanes = [
    [
      { id: 0, name: "Embeded View 1-1", url: "http://maps.google.co.jp/maps?&output=embed" },
      { id: 1, name: "Embeded View 1-2", url: "/blank" },
      // tslint:disable-next-line:max-line-length
      { id: 2, name: "Embeded View 1-3", url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.4425090625195!2d136.88223540000004!3d35.170521900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e794d78b89%3A0x81f7204bf8261663!2z5ZCN5Y-k5bGL6aeF!5e0!3m2!1sja!2sjp!4v1433317763525" },
    ],
    [
      { id: 3, name: "Embeded View 2-1", url: "/blank" },
      { id: 4, name: "Embeded View 2-2", url: "https://www.youtube.com/embed/sk6uU8gb8PA?rel=0" },
    ],
  ];

  private mounted() {
    this.adjustViewLaneWidth();
    this.watchAndAddContent();
  }

  private updated() {
    this.adjustViewLaneWidth();
  }

  private adjustViewLaneWidth() {
    const divs: HTMLDivElement[] = this.$refs.viewLane as HTMLDivElement[];
    for (const div of divs) {
      const before = div.style.width;
      div.style.width = 100 / divs.length + "%";
      Logger.getLogger().debug(`divs.length:${divs.length}, width:${before} -> ${div.style.width}`);
    }
  }

  private watchAndAddContent() {
    this.$store.subscribe(
      (mutation, state) => {
        Logger.getLogger().debug(`mutationType=${mutation.type}, payload=${JSON.stringify(mutation.payload)}`);
        if (mutation.type === "setContent") {
          const maxNum = this.largestNumber(this.viewsLanes);
          this.viewsLanes[0].push({ id: maxNum + 1, name: mutation.payload.title, url: mutation.payload.url });
        }
      },
    );
  }

  private addLane() {
    this.viewsLanes.push([]);
  }

  private delLane() {
    this.viewsLanes.pop();
  }

  private delView(id: number) {
    for (const views of this.viewsLanes) {
      const index = views.findIndex((view) => view.id === id);
      Logger.getLogger().debug(`view.id=${id}, findIndex=${index}`);
      if (index >= 0) {
        views.splice(index, 1);
        break;
      }
    }
  }

  private largestNumber(arr: any[][]) {
    const innerArr = arr.flatMap((inner) => inner);
    return Math.max(...innerArr.map((obj) => obj.id));
  }
}
</script>

<style scoped>
.view-lane-container {
  margin: 20px auto;
  padding-left: 12px;
}
.view-lane-views {
  width: 96%;
  float: left;
}
.view-lane-button {
  width: 4%;
  float: right;
}
.views-lanes {
  display: block;
  float: left;
  height: 100px;
  list-style-type: none;
  text-align: center;
}
.views-lane {
  min-height: 400px;
}
.view-lane {
  cursor: move;
  cursor: pointer;
}
.iframe-view {
  width: 98%;
  height: 400px;
  margin-left: 1%;
  margin-right: 1%;
}
.view-close-button {
  float: right;
  margin-right: 1%;
  font-size: 130%;
  font-weight: bolder;
}
</style>
