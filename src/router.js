import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Inicio from "./views/Inicio.vue";
import V404 from "./views/V404";

/*
"production": "vue-cli-service serve --mode production",
*/
Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "*",
            name: "404",
            component: V404
        },
        {
            path: "/",
            name: "login",
            component: Login
        },
        {
            path: "/Inicio",
            name: "inicio",
            component: Inicio
        }
    ],
    linkActiveClass: "active"
});