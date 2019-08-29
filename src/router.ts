import Vue from "vue";
import Router from "vue-router";
import BaseLayout from "./layouts/default.vue";
import Login from "./views/Login.vue";
import Main from "./views/Main.vue";
import SplitedMain from "./views/SplitedMain.vue";
import Welcome from "./views/Home.vue";
import Blank from "./views/Blank.vue";
import store from "./stores";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/",
            component: BaseLayout,
            meta: { requiresAuth: true },
            children: [
                { path: "/", component: Main },
                { path: "/smain", component: SplitedMain },
                { path: "/welcome", component: Welcome },
                {
                    path: "/about",
                    name: "about",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
                },
            ],
        },
        {
            path: "/blank",
            name: "blank",
            component: Blank,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth) && !store.getters.isLogin) {
        next({ path: "/login", query: { redirect: to.fullPath } });
    } else {
        next();
    }
});

export default router;
