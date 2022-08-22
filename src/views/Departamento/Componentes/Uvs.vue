<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in UVS" :key="i.ID" :value="i.UV">
                {{i.UV}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetUVS} from "./../../../gql/variables";
export default {
    data() {
        return {
            UVS:[],
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
            for (let index = 0; index < this.UVS.length; index++) {
                if (this.UVS[index]["UV"]==value) {
                    return this.UVS[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetUVS,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.UVS != null) {
                    this.UVS=result.data.UVS;
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
