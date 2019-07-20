<template>
  <div class="row">
    <div class="col">
      <h3>First Lane</h3>
      <draggable id="first" :list="view1" class="list-group" draggable=".item" group="group1">
        <div class="list-group-item item" v-for="view in views1" :key="view.id">
          {{ view.name }}
          <br />
          <iframe :src="view.url" class="iframe" />
        </div>
      </draggable>
    </div>
    <div class="col">
      <h3>Second Lane</h3>
      <draggable id="second" :list="view2" class="list-group" draggable=".item" group="group1">
        <div class="list-group-item item" v-for="view in views2" :key="view.id">
          {{ view.name }}
          <br />
          <iframe :src="view.url" class="iframe" />
        </div>
      </draggable>
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
  private views1 = [
    { id: 0, name: "Embeded View 1-1", url: "http://maps.google.co.jp/maps?&output=embed" },
    { id: 1, name: "Embeded View 1-2", url: "/embed" },
    { id: 2, name: "Embeded View 1-3", url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.4425090625195!2d136.88223540000004!3d35.170521900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e794d78b89%3A0x81f7204bf8261663!2z5ZCN5Y-k5bGL6aeF!5e0!3m2!1sja!2sjp!4v1433317763525" },
  ];

  private views2 = [
    { id: 3, name: "Embeded View 2-1", url: "/embed" },
    { id: 4, name: "Embeded View 2-2", url: "https://www.youtube.com/embed/sk6uU8gb8PA?rel=0" },
  ];
}
</script>

<style scoped>
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.col {
  width: 50%;
  display: block;
  float: left;
  height: 100px;
  list-style-type: none;
  text-align: center;
}
.iframe {
  width: 80%;
  height: 400px;
}
</style>
