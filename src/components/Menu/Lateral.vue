<template>
    <div class="Lateral">
        <a-spin tip="Carcango..." :spinning="Cargando">
            <a-menu theme="light" mode="inline">
                <a-menu-item key="1" @click="AccederURL('/PanelControl')">
                    <a-icon type="dashboard" />
                    <span>Panel de Control</span>
                </a-menu-item>
                <a-menu-item key="2" @click="AccederURL('/ListaRoles')">
                    <a-icon type="security-scan" />
                    <span>Rol</span>
                </a-menu-item>
                <a-menu-item key="3" @click="AccederURL('/ListaUsuario')">
                    <a-icon type="user" />
                    <span>Usuarios</span>
                </a-menu-item>
                <a-menu-item key="4" @click="AccederURL('/Mascotas')">
                    <a-icon type="qq" />
                    <span>Mascotas</span>
                </a-menu-item>
                <a-menu-item key="5" @click="AccederURL('/Propietarios')">
                    <a-icon type="user" />
                    <span>Propietarios</span>
                </a-menu-item>
                <a-menu-item key="6" @click="AccederURL('/Referencias')">
                    <a-icon type="user" />
                    <span>Referencias</span>
                </a-menu-item>
            </a-menu>
        </a-spin>
    </div>
</template>
<script>
import gql from "graphql-tag";
import {CuentaPermiso} from "./../../gql/variables";
export default {
    name: "Lateral",
    data() {
        return {
            id_cuenta: 0,
            Cargando:true
        }
    },
    components:{},
    methods:{
        AccederURL (a){
            this.$router.push(a);
        },
    },
    created() {
        if (localStorage.id_cuenta != null) {
            this.id_cuenta = localStorage.id_cuenta;
        } else {
            this.id_cuenta = 0;
        }
    },
};
</script>