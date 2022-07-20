import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Inicio from "./views/Inicio.vue";
import V404 from "./views/V404";
import Localidad from "./views/Localidad.vue";
import ListaUsuario from "./views/Usuarios/ListaUsuario.vue";
import VistaUsuario from "./views/Usuarios/VistaUsuario.vue";

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
            name: "LOGIN",
            component: Login
        },
        {
            path: "/Inicio",
            name: "INICIO",
            component: Inicio
        },
        {
            path: "/Localidad",
            name: "LOCALIDAD",
            component: Localidad
        },
        {
            path: "/ListaUsuario",
            name: "LISTAUSUARIO",
            component: ListaUsuario
        },
        {
            path: "/VistaUsuario/:ID",
            name: "VISTAUSUARIO",
            component: VistaUsuario,
            props: true
        }
    ],
    linkActiveClass: "active"
});