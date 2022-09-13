<template>
    <a-spin :spinning="cargando">
        <div class="spin-content">
            <a-select v-if="Rangos != null" label-in-value style="width: 150px" @change="imprimir_Rangos">
                <a-select-option v-if="Rangos.RangoUsuario!=null" v-for="i in Rangos.RangoUsuario" :key="i.ID+'_Permiso'" :value="i.Rango.ID">
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
            cargando: true
        };
    },
    methods: {
        async imprimir_Rangos(e){
            console.log(e);
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
                this.cargando = false;
            });
        }
    },
    async created() {
        this.ObtenerRoles();
    }
};
</script>