<template>
    <div class="ListaRoles">
        <ListaRol />
    </div>
</template>
<script>
import {GetRoles} from "./../../gql/variables";
import ListaRol from "./Componente/ListaRol.vue";
export default {
    name: "ListaRoles",
    data() {
        return {
        }
    },
    components:{ListaRol},
    methods:{
    },
    created() {
    },
};
</script>