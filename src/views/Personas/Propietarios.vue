<template>
    <div class="Propietarios">
        <a-spin :spinning="cargando">
            <TablaPropietarios />
        </a-spin>
    </div>
</template>
<script>
import {GetBitacoralist} from "./../../gql/variables";
import TablaPropietarios from "./Componentes/TablaPropietarios.vue";
export default {
    name: "Propietarios",
    data() {
        return {
            cargando: true,
            Bitacoras:[]
        }
    },
    components:{TablaPropietarios},
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