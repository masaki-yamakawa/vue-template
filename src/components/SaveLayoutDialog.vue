<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">Save Layout</div>
          <div class="modal-body">
            Layout Name
            <b-input type="text" v-model="layoutName" maxlength="20" placeholder="Input Layout Name" size="sm"/>
            <br />

            Layout Information
            <ul v-for="layouts in saveData" :key="layouts.id">
              <li v-if="layouts.length === 1">
                {{ layouts[0].id }}:{{ layouts[0].url.split("/")[layouts[0].url.split("/").length - 1] }}
              </li>
              <ul v-else>
                <li v-for="layout in layouts" :key="layout.id">
                  {{ layout.id }}:{{ layout.url.split("/")[layout.url.split("/").length - 1] }}
                </li>
              </ul>
            </ul>

            Share Layout
            <b-form-radio-group id="layoutShare" v-model="layoutShare" name="layoutShare" size="sm">
              <b-form-radio value="None">None</b-form-radio>
              <b-form-radio value="Group">Group</b-form-radio>
              <b-form-radio value="All">All</b-form-radio>
            </b-form-radio-group>
          </div>
          <div class="modal-footer">
            <b-button variant="primary" @click="doSaveLayout">Save</b-button>
            <b-button variant="secondary" @click="cancelSaveLayout">Cancel</b-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Logger } from "../loggers/logger";

@Component
export default class SaveLayoutDialog extends Vue {
  @Prop()
  private saveData!: any[][];

  private layoutName: string = "";
  private layoutShare: string = "None";

  @Emit("ok")
  private doSaveLayout(): any {
    return {
      name: this.layoutName,
      share: this.layoutShare,
    };
  }

  @Emit("cancel")
  private cancelSaveLayout(): void {
    Logger.getLogger().debug("Cancel save layout");
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 40%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
}
.modal-header {
  display: -ms-flexbox;
  display: flex;
}
.modal-body {
  text-align: left;
}
.modal-footer {
  display: -ms-flexbox;
  display: flex;
}
.modal-footer > :not(:first-child) {
  margin-left: 0.25rem;
}
.modal-footer > :not(:last-child) {
  margin-right: 0.25rem;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
</style>
