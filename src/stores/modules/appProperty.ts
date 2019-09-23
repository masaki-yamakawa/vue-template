import { MutationTree } from "vuex";

class AppProperty {
    public userId: string = "";
    public jwt: string = "";
    public isLogin: boolean = false;
    public content: string = "";
}

const getters: MutationTree<AppProperty> = {
    userId: (state) => state.userId,
    jwt: (state) => state.jwt,
    isLogin: (state) => state.isLogin,
    content: (state) => state.content,
};

const mutations: MutationTree<AppProperty> = {
    ["doLogin"](state: AppProperty, payload) {
        state.userId = payload.userId;
        state.jwt = payload.jwt;
        state.isLogin = true;
    },
    ["doLogout"](state: AppProperty, payload) {
        state.isLogin = false;
    },
    ["setContent"](state: AppProperty, payload) {
        state.content = payload;
    },
    ["reset"](state: AppProperty) {
        state.userId = "";
        state.jwt = "";
        state.isLogin = false;
        state.content = "";
    },
};

export default {
    state: new AppProperty(),
    getters,
    mutations,
};
