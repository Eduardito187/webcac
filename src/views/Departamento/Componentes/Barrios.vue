<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Barrios" :key="i.ID" :value="i.Barrio">
                {{i.Barrio}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetBarrios} from "./../../../gql/variables";
export default {
    data() {
        return {
            Barrios:[],
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
            for (let index = 0; index < this.Barrios.length; index++) {
                if (this.Barrios[index]["Barrio"]==value) {
                    return this.Barrios[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetBarrios,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Barrios != null) {
                    this.Barrios=result.data.Barrios;
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
