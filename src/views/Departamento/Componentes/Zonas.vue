<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Zonas" :key="i.ID" :value="i.Zona">
                {{i.Zona}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetZonas} from "./../../../gql/variables";
export default {
    data() {
        return {
            Zonas:[],
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
            for (let index = 0; index < this.Zonas.length; index++) {
                if (this.Zonas[index]["Zona"]==value) {
                    return this.Zonas[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetZonas,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Zonas != null) {
                    this.Zonas=result.data.Zonas;
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
