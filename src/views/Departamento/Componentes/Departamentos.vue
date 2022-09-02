<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" @change="ChangeSelect" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Departamentos" :key="i.ID" :value="i.ID">
                {{i.Nombre}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetDepartamentos} from "./../../../gql/variables";
export default {
    data() {
        return {
            Departamentos:[],
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
                this.$emit('recibir_evento',{Tipo:"Departamento",Data:e});
            }
        },
        ObtenerIDJerarquia(value){
            for (let index = 0; index < this.Departamentos.length; index++) {
                if (this.Departamentos[index]["Nombre"]==value) {
                    return this.Departamentos[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetDepartamentos,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Departamentos != null) {
                    this.Departamentos=result.data.Departamentos;
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
