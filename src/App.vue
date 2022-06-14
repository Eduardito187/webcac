<template>
  <div id="app" class="vue-tempalte">
      <a-layout v-if="id_cuenta!=0 && id_cuenta !=null" theme="light" id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider theme="light" v-model="collapsed" collapsible>
          <div class="logo" style="text-align:center;margin-top: 15px;margin-bottom: 15px;">
            <img src="./assets/cac.jpeg" style="width: 80px;height: 80px;border-radius: 40px;" alt="">
          </div>
          <a-menu theme="light" :default-selected-keys="['1']" mode="inline">
            <a-menu-item key="1">
              <a-icon type="pie-chart" />
              <span style="padding: 10px;">Option 1</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="desktop" />
              <span>Option 2</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" /><span>User</span></span>
              <a-menu-item key="3">
                Tom
              </a-menu-item>
              <a-menu-item key="4">
                Bill
              </a-menu-item>
              <a-menu-item key="5">
                Alex
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="team" /><span>Team</span></span>
              <a-menu-item key="6">
                Team 1
              </a-menu-item>
              <a-menu-item key="8">
                Team 2
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="9" @click="IrLocalidad()">
              <a-icon type="environment" />
              <span>Localidad</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout theme="light">
          <a-layout-header style="background: #fff; padding: 0" >
            <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="$route.name" @back="() => $router.go(-1)">
              <template slot="extra">
                <a-dropdown placement="bottomRight">
                  <a-avatar :size="40" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <a-menu slot="overlay">
                    <a-menu-item>
                      Perfil
                    </a-menu-item>
                    <a-menu-item @click="CerrarSesion()">
                      Cerrar Session
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </template>
            </a-page-header>
          </a-layout-header>
          <a-layout-content>
            <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
              <div class="App">
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
import gql from "graphql-tag";
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