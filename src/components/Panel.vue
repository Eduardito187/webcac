<template>
    <div class="Panel">
        <a-spin tip="Carcango..." :spinning="Cargando">
        </a-spin>
    </div>
</template>
<script>
import gql from "graphql-tag";
import {CuentaPermiso} from "./../gql/variables";
export default {
    name: "Panel",
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
            await this.$apollo.query({query: CuentaPermiso,variables: {
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
        if (localStorage.id_cuenta == null) {
        this.$router.push("/");
        }
        if (localStorage.id_cuenta != null) {
            this.id_cuenta = localStorage.id_cuenta;
            this.obtenerData();
        } else {
            this.id_cuenta = 0;
        }
    },
};
</script>