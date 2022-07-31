<template>
    <div class="Bitacora">
        <a-spin :spinning="cargando">
            <a-timeline>
                <a-timeline-item v-for="i in Bitacoras" color="green">
                    <Carta :Bitacora="i" />
                </a-timeline-item>
            </a-timeline>
        </a-spin>
    </div>
</template>
<script>
import {GetBitacoralist} from "./../../gql/variables";
import Carta from "./Componente/Carta.vue";
export default {
    name: "Bitacora",
    data() {
        return {
            cargando: true,
            Bitacoras:[]
        }
    },
    components:{Carta},
    methods:{
        AccederURL (a){
            this.$router.push(a);
        },
        async ObtenerRoles() {
            await this.$apollo.query({query: GetBitacoralist,variables:{
                ID_CUENTA:parseInt(localStorage.id_cuenta)
            },fetchPolicy: "network-only"}).then(result => {
                this.Bitacoras = result.data.HistorialActividades;
            this.cargando=false;
            });
        },
    },
    created() {
        if (localStorage.id_cuenta!=null) {
            this.ObtenerRoles();
        }
    },
};
</script>