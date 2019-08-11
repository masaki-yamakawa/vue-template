
import { MutationTree } from "vuex";

class AppProperty {
    public content: string = "";
}

const getters: MutationTree<AppProperty> = {
    content: (state) => state.content,
};

const mutations: MutationTree<AppProperty> = {
    ["setContent"](state: AppProperty, payload) {
        state.content = payload;
    },
};

export default {
    state: new AppProperty(),
    getters,
    mutations,
};
