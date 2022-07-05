<template>
  <div id="app" class="vue-tempalte">
      <a-layout v-if="id_cuenta!=0 && id_cuenta !=null" theme="light" id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider theme="light" v-model="collapsed" collapsible>
          <ImgLogo />
          <Lateral />
        </a-layout-sider>
        <a-layout theme="light">
          <a-layout-header style="background: #fff; padding: 0" >
            <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="$route.name" @back="() => $router.go(-1)">
              <template slot="extra">
                <PerfilHeaderVue />
              </template>
            </a-page-header>
          </a-layout-header>
          <a-layout-content>
            <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
              <div class="App">
                <Panel />
                <router-view />
              </div>
            </div>
          </a-layout-content>
          <a-layout-footer :style="{ textAlign: 'center' }">
            CAC v1.0.0
          </a-layout-footer>
        </a-layout>
      </a-layout>
      <div v-else class="App">
        <router-view />
      </div>
    </div>
</template>
<script>
import PerfilHeaderVue from "./components/PerfilHeader.vue";
import Panel from "./components/Panel.vue";
import Lateral from "./components/Menu/Lateral.vue";
import ImgLogo from "./components/Menu/ImgLogo.vue";
export default {
  title: "CAC | APP",
  data() {
    return {
      id_cuenta: 0,
      collapsed: false,
      visible: false,
    };
  },
  components: {
    PerfilHeaderVue,
    Panel,
    Lateral,
    ImgLogo
},
  methods:{
    IrLocalidad(){
      this.$router.push("/Localidad");
    },
    CerrarSesion(){
      localStorage.removeItem('id_cuenta');
      this.id_cuenta = 0;
      this.$router.push("/");
    }
  },
  created() {
    if (localStorage.id_cuenta != null) {
      this.id_cuenta = localStorage.id_cuenta;
    } else {
      this.id_cuenta = 0;
    }
  },
  updated() {
    if (localStorage.id_cuenta != null) {
      this.id_cuenta = localStorage.id_cuenta;
    } else {
      this.id_cuenta = 0;
    }
  }
};
</script>
<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-menu-item,.ant-menu-submenu-title,.ant-page-header-heading-title{
  color: #9B933B !important;
  font-weight: bold !important;
  text-decoration: none !important;
}
</style>