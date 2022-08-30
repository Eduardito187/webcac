import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { URL_API_CAC } from "./Configuracion";
import { createProvider } from "./vue-apollo";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(Antd);

 
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCO_IeKdjJ48PtvbbjQvC_0oMNwZFUW-Js',
        libraries: 'places',
    },
    installComponents: true
});


library.add(faUserSecret);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    router,
    apolloProvider: createProvider(),
    render: h => h(App)
}).$mount("#app");