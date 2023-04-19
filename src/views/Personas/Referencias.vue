<template>
    <div class="Referencias">
        <a-spin :spinning="cargando">
            <TablaReferencias />
        </a-spin>
    </div>
</template>
<script>
import {GetBitacoralist} from "./../../gql/variables";
import TablaReferencias from "./Componentes/TablaReferencias.vue";
export default {
    name: "Referencias",
    data() {
        return {
            cargando: true,
            Bitacoras:[]
        }
    },
    components:{TablaReferencias},
    methods:{
        AccederURL (a){
            this.$router.push(a);
        },
        async ObtenerRoles() {
        },
    },
    created() {
        if (localStorage.id_cuenta == null) {
            this.$router.push("/");
        }
        if (localStorage.id_cuenta!=null) {
            this.ObtenerRoles();
            this.cargando = false;
        }
    },
};
</script>