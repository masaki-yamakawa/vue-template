import Vue from "vue";
import Router from "vue-router";
import BaseLayout from "./layouts/default.vue";
import Main from "./views/Main.vue";
import Welcome from "./views/Home.vue";
import Blank from "./views/Blank.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: BaseLayout,
            children: [
                { path: "/", component: Main },
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
