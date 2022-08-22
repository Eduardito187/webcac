<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in TipoDocumento" :key="i.ID" :value="i.Tipo">
                {{i.Tipo}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetTipoDocumento} from "./../../../gql/variables";
export default {
    data() {
        return {
            TipoDocumento:[],
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
            for (let index = 0; index < this.TipoDocumento.length; index++) {
                if (this.TipoDocumento[index]["Tipo"]==value) {
                    return this.TipoDocumento[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetTipoDocumento,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.TipoDocumento != null) {
                    this.TipoDocumento=result.data.TipoDocumento;
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
