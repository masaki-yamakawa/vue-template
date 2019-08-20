import { MutationTree } from "vuex";

class AppProperty {
    public jwt: string = "";
    public content: string = "";
}

const getters: MutationTree<AppProperty> = {
    jwt: (state) => state.jwt,
    content: (state) => state.content,
};

const mutations: MutationTree<AppProperty> = {
    ["saveJwt"](state: AppProperty, payload) {
        state.jwt = payload;
    },
    ["setContent"](state: AppProperty, payload) {
        state.content = payload;
    },
    ["reset"](state: AppProperty) {
        state.jwt = "";
        state.content = "";
    },
};

export default {
    state: new AppProperty(),
    getters,
    mutations,
};
