<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" @change="ChangeSelect" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Municipios" :key="i.ID" :value="i.ID">
                {{i.Nombre}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetMunicipios} from "./../../../gql/variables";
export default {
    data() {
        return {
            Municipios:[],
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
        ChangeSelect(e){
            if (e != null) {
                this.$emit('recibir_evento',{Tipo:"Municipio",Data:e});
            }
        },
        ObtenerIDJerarquia(value){
            for (let index = 0; index < this.Municipios.length; index++) {
                if (this.Municipios[index]["Nombre"]==value) {
                    return this.Municipios[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetMunicipios,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Municipios != null) {
                    this.Municipios=result.data.Municipios;
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
