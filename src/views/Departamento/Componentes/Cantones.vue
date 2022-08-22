<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Cantones" :key="i.ID" :value="i.Canton">
                {{i.Canton}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetCantones} from "./../../../gql/variables";
export default {
    data() {
        return {
            Cantones:[],
            cargando:true,
            ValorDato:""
        }
    },
    props:{
        Nombre:{
            type: String,
            default: String
        }
    },
    methods: {
        ObtenerIDJerarquia(value){
            for (let index = 0; index < this.Cantones.length; index++) {
                if (this.Cantones[index]["Canton"]==value) {
                    return this.Cantones[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetCantones,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Cantones != null) {
                    this.Cantones=result.data.Cantones;
                    this.cargando=false;
                }
            });
        }
    },
    created(){
        this.ValorDato=this.Nombre;
        this.ObtenerAPI();
    }
};
</script>
