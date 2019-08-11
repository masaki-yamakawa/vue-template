
import { MutationTree } from "vuex";

class AppProperty {
    public content: string = "";
    // public userName: string = "";
    // public operatorId: string = "";
    // public lastLogin: string = "";
    // public isLogin: boolean = false;
    // public jwt: string = "";
    // public roles: string[] = [];
}

const getters: MutationTree<AppProperty> = {
    content: (state) => state.content,
    // userName: (state) => state.userName,
    // operatorId: (state) => state.operatorId,
    // lastLogin: (state) => state.lastLogin,
    // isLogin: (state) => state.isLogin,
    // jwt: (state) => state.jwt,
    // roles: (state) => state.roles,
};

const mutations: MutationTree<AppProperty> = {
    ["setContent"](state: AppProperty, payload) {
        state.content = payload;
    },

    // ["doLogin"](state: AppProperty, payload) {
    //     state.userName = payload.userName;
    //     state.operatorId = payload.userId;
    //     state.roles = payload.roles;
    //     state.lastLogin = "2018/9/12 10:55:21(sample)"
    //     state.isLogin = true;
    // },
    // ["doLogout"](state: AppProperty, payload) {
    //     state.isLogin = false;
    // },
    // ["saveJwt"](state: AppProperty, payload) {
    //     state.jwt = payload;
    // },
    // ["reset"](state: AppProperty) {
    //     state.userName = "";
    //     state.lastLogin = "";
    //     state.isLogin = false;
    //     state.jwt = "";
    //     state.roles = [];
    // },
};

export default {
    state: new AppProperty(),
    getters,
    mutations,
};
