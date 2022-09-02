<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" @change="ChangeSelect" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Provincias" :key="i.ID" :value="i.ID">
                {{i.Nombre}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetProvincias} from "./../../../gql/variables";
export default {
    data() {
        return {
            Provincias:[],
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
                this.$emit('recibir_evento',{Tipo:"Provincia",Data:e});
            }
        },
        ObtenerIDJerarquia(value){
            for (let index = 0; index < this.Provincias.length; index++) {
                if (this.Provincias[index]["Nombre"]==value) {
                    return this.Provincias[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetProvincias,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Provincias != null) {
                    this.Provincias=result.data.Provincias;
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
