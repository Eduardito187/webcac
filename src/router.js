import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Inicio from "./views/Inicio.vue";
import V404 from "./views/V404.vue";
import Localidad from "./views/Localidad.vue";
import ListaUsuario from "./views/Usuarios/ListaUsuario.vue";
import VistaUsuario from "./views/Usuarios/VistaUsuario.vue";
import ListaRoles from "./views/Roles/ListaRoles.vue";
import VistaRol from "./views/Roles/VistaRol.vue";
import MiPerfil from "./views/Usuarios/MiPerfil.vue";
import PanelControl from "./views/Usuarios/PanelControl.vue";
import Bitacora from "./views/Bitacora/Bitacora.vue";
import Propietarios from "./views/Personas/Propietarios.vue";
import Referencias from "./views/Personas/Referencias.vue";
import NuevaReferencia from "./views/Personas/NuevaReferencia.vue";
import NuevoPropietario from "./views/Personas/NuevoPropietario.vue";
import Mascotas from "./views/Mascotas/Mascotas.vue";
import NuevaMascota from "./views/Mascotas/NuevaMascota.vue";
import NuevoCan from "./views/Mascotas/NuevoCan.vue";
import NewReferencia from "./views/Personas/NewReferencia.vue";
import NewPropietario from "./views/Personas/NewPropietario.vue";

/*
"production": "vue-cli-service serve --mode production",
*/
Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
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
        },
        {
            path: "/ListaRoles",
            name: "LISTA ROLES",
            component: ListaRoles
        },
        {
            path: "/VistaRol/:ID",
            name: "VISTA ROL",
            component: VistaRol,
            props: true
        },
        {
            path: "/MiPerfil",
            name: "Mi Perfil",
            component: MiPerfil
        },
        {
            path: "/PanelControl",
            name: "Panel de Control",
            component: PanelControl
        },
        {
            path: "/Bitacora",
            name: "Bitacora de Control",
            component: Bitacora
        },
        {
            path: "/Propietarios",
            name: "Propietarios",
            component: Propietarios
        },
        {
            path: "/Referencias",
            name: "Referencias",
            component: Referencias
        },
        {
            path: "/Mascotas",
            name: "Mascotas",
            component: Mascotas
        },
        {
            path: "/NuevaMascota",
            name: "Nueva Mascotas",
            component: NuevaMascota
        },
        {
            path: "/NuevaReferencia",
            name: "Nueva Referencia",
            component: NuevaReferencia
        },
        {
            path: "/NuevoPropietario",
            name: "Nuevo Propietario",
            component: NuevoPropietario
        },
        {
            path: "/NewMascota",
            name: "Nueva Mascota",
            component: NuevoCan
        },
        {
            path: "/NewReferencia",
            name: "Nueva Referencia",
            component: NewReferencia
        },
        {
            path: "/NewPropietario",
            name: "Nuevo Propietario",
            component: NewPropietario
        }
    ],
    linkActiveClass: "active"
});