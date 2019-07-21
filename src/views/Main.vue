<template>
  <div class="view-lane-container">
    <div v-for="(views, id) in viewsLanes" :key="id" class="views-lanes">
      <div class="views-lane">
        <draggable :options="{group:'group', animation: 150}">
          <i class="fa fa-align-justify handle"></i>
          <div v-for="view in views" :key="view.id" class="view-lane item">
            {{ view.name }}
            <br />
            <iframe :src="view.url" class="iframe-view" />
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Draggable from "vuedraggable";

@Component({
  components: {
    Draggable,
  },
})
export default class Main extends Vue {
  private viewsLanes = [
    [
      { id: 0, name: "Embeded View 1-1", url: "http://maps.google.co.jp/maps?&output=embed" },
      { id: 1, name: "Embeded View 1-2", url: "/embed" },
      // tslint:disable-next-line:max-line-length
      { id: 2, name: "Embeded View 1-3", url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.4425090625195!2d136.88223540000004!3d35.170521900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e794d78b89%3A0x81f7204bf8261663!2z5ZCN5Y-k5bGL6aeF!5e0!3m2!1sja!2sjp!4v1433317763525" },
    ],
    [
      { id: 3, name: "Embeded View 2-1", url: "/embed" },
      { id: 4, name: "Embeded View 2-2", url: "https://www.youtube.com/embed/sk6uU8gb8PA?rel=0" },
    ],
  ];
}
</script>

<style scoped>
.view-lane-container {
  margin: 65px auto;
}
.views-lanes {
  width: 50%;
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
  width: 80%;
  height: 400px;
}
</style>
