<template>
    <div class="PerfilHeader">
        <a-spin tip="Carcango..." :spinning="Cargando">
            <a-dropdown v-if="DATA!=null" placement="bottomRight">
                <template :style="{display:'flex'}">
                    <div>
                        <a-avatar :size="40" :src="DATA.FotoR.URL" /> 
                        <strong :style="{fontSize:'20px',lineHeigth:'40px'}">{{DATA.PoliciaR.Nombre + ' ' + DATA.PoliciaR.Paterno + '' + DATA.PoliciaR.Materno}}</strong>
                    </div>
                </template>
                <a-menu slot="overlay">
                    <a-menu-item>
                        Perfil
                    </a-menu-item>
                    <a-menu-item @click="CerrarSesion()">
                        Cerrar Session
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </a-spin>
    </div>
</template>
<script>
import gql from "graphql-tag";
import {PerfilHeader} from "./../gql/variables";
export default {
    name: "PerfilHeader",
    data() {
        return {
            id_cuenta: 0,
            DATA:null,
            Cargando:true
        }
    },
    components:{},
    methods:{
        async obtenerData(){
            await this.$apollo.query({query: PerfilHeader,variables: {
                ID_CUENTA:parseInt(localStorage.id_cuenta),
                ID:parseInt(this.id_cuenta)
                },fetchPolicy: "network-only"}).then(result => {
                this.DATA = result.data.Usuario;
                this.Cargando = false;
            });
        },
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
            this.obtenerData();
        } else {
            this.id_cuenta = 0;
        }
    },
};
</script>