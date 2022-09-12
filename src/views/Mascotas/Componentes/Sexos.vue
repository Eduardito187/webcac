<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" @change="ChangeSelect" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Sexos" :key="i.ID" :value="i.ID">
                {{i.Sexo}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetSexos} from "./../../../gql/variables";
export default {
    data() {
        return {
            Sexos:[],
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
                this.$emit('recibir_evento',{Tipo:"Sexos",Data:e});
            }
        },
        ObtenerIDJerarquia(value){
            for (let index = 0; index < this.Sexos.length; index++) {
                if (this.Sexos[index]["Sexo"]==value) {
                    return this.Sexos[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetSexos,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Sexos != null) {
                    this.Sexos=result.data.Sexos;
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
