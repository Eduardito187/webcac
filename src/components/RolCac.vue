<template>
    <a-spin :spinning="cargando">
        <div class="spin-content">
            <a-select v-if="Rangos != null" label-in-value style="width: 180px" :value="{ key: this.Mi_Rango }" @change="imprimir_Rangos">
                <a-select-option v-if="Rangos.RangoUsuario!=null" v-for="i in Rangos.RangoUsuario" :key="i.Rango.ID+'_Permiso'" :value="i.Rango.ID">
                    <b>{{i.Rango.Rango}}</b>
                </a-select-option>
            </a-select>
        </div>
    </a-spin>
</template>
<script>
import {CuentaPermiso} from "./../gql/variables";
export default {
    data() {
        return {
            Rangos: [],
            RangoID: 0,
            cargando: true,
            Mi_Rango_ID : "",
            Mi_Rango : ""
        };
    },
    methods: {
        imprimir_Rangos(e){
            this.SeleccionRango(e);
        },
        SeleccionRango(SELECT){
            console.log("select", SELECT);
            if (this.Rangos != null) {
                if (this.Rangos.RangoUsuario != null) {
                    for (let index = 0; index < this.Rangos.RangoUsuario.length; index++) {
                        if (this.Rangos.RangoUsuario[index]["Rango"] != null) {
                            if (SELECT.key == this.Rangos.RangoUsuario[index]["Rango"]["ID"]) {
                                localStorage.ID_RANGO_SELECT = this.Rangos.RangoUsuario[index]["Rango"]["ID"];
                                localStorage.RANGO_SELECT = this.Rangos.RangoUsuario[index]["Rango"]["Rango"];
                                this.Mi_Rango_ID = localStorage.ID_RANGO_SELECT;
                                this.Mi_Rango = localStorage.RANGO_SELECT;
                            }
                        }
                    }
                }
            }
        },
        selectPosOne(){
            if (this.Rangos != null) {
                if (this.Rangos.RangoUsuario != null) {
                    if (this.Rangos.RangoUsuario.length > 0){
                        localStorage.ID_RANGO_SELECT = this.Rangos.RangoUsuario[0]["Rango"]["ID"];
                        localStorage.RANGO_SELECT = this.Rangos.RangoUsuario[0]["Rango"]["Rango"];
                        this.Mi_Rango_ID = localStorage.ID_RANGO_SELECT;
                        this.Mi_Rango = localStorage.RANGO_SELECT;
                    }
                }
            }
        },
        async ObtenerRoles() {
            await this.$apollo.query({query: CuentaPermiso,variables: {
                    ID_CUENTA:parseInt(localStorage.id_cuenta),
                    ID:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"}
            )
            .then(result => {
                this.Rangos = result.data.Usuario;
                this.selectPosOne();
                this.cargando = false;
            });
        }
    },
    async created() {
        if (localStorage.id_cuenta == null) {
            this.$router.push("/");
        }
        if (localStorage.ID_RANGO_SELECT != null && localStorage.RANGO_SELECT != null) {
            this.Mi_Rango_ID = localStorage.ID_RANGO_SELECT;
            this.Mi_Rango = localStorage.RANGO_SELECT;
        }
        this.ObtenerRoles();
    }
};
</script>