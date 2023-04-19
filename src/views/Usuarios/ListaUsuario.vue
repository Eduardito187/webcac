<template>
    <div class="ListaUsuario">
        <HeaderListaUsuario />
    </div>
</template>
<script>
import gql from "graphql-tag";
import HeaderListaUsuario from "./Componente/HeaderListaUsuario.vue";
export default {
    name: "ListaUsuario",
    data() {
        return {
        }
    },
    components:{HeaderListaUsuario},
    methods:{
    },
    created() {
        if (localStorage.id_cuenta == null) {
            this.$router.push("/");
        }
    },
};
</script>