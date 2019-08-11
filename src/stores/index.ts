import Vue from "vue";
import Vuex from "vuex";
import appProperty from "./modules/appProperty";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        appProperty,
    },
    plugins: [createPersistedState()],
    strict: debug,
});
