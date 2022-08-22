<template>
    <div class="Personas">
        <a-spin :spinning="cargando">
            <Tabla />
        </a-spin>
    </div>
</template>
<script>
import {GetBitacoralist} from "./../../gql/variables";
import Tabla from "./Componentes/Tabla.vue";
export default {
    name: "Personas",
    data() {
        return {
            cargando: true,
            Bitacoras:[]
        }
    },
    components:{Tabla},
    methods:{
        AccederURL (a){
            this.$router.push(a);
        },
        async ObtenerRoles() {
        },
    },
    created() {
        if (localStorage.id_cuenta!=null) {
            this.ObtenerRoles();
            this.cargando = false;
        }
    },
};
</script>