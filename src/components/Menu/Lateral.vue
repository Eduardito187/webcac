<template>
    <div class="Lateral">
        <a-spin tip="Carcango..." :spinning="Cargando">
            <a-menu theme="light" mode="inline">
                <a-menu-item v-if="DATA!=null" v-for="i in DATA.Rangos" :key="i.ID">
                    <span>{{i.Rango.Rango}}</span>
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
            DATA:null,
            Cargando:true
        }
    },
    components:{},
    methods:{
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
</script>