<template>
    <div class="Lateral">
        <a-spin tip="Carcango..." :spinning="Cargando">
            <a-menu theme="light" mode="inline">
                <a-menu-item key="1">
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
                <template v-if="DATA!=null">
                    <a-menu-item v-if="DATA.RangoUsuario!=null" v-for="i in DATA.RangoUsuario" :key="i.ID+'_Permiso'">
                        <span>{{i.Rango.Rango}}</span>
                    </a-menu-item>
                </template>
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
            DATA:null,
            Cargando:true
        }
    },
    components:{},
    methods:{
        AccederURL (a){
            this.$router.push(a);
        },
        async obtenerData(){
            await this.$apollo.query({query: CuentaPermiso,variables: {ID:parseInt(this.id_cuenta)},fetchPolicy: "network-only"}).then(result => {
                this.DATA = result.data.Usuario;
                this.Cargando = false;
            });
        },
    },
    created() {
        if (localStorage.id_cuenta != null) {
            this.id_cuenta = localStorage.id_cuenta;
            this.obtenerData();
        } else {
            this.id_cuenta = 0;
        }
    },
};
</script>