<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" @change="ChangeSelect" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Mascotas" :key="i.ID" :value="i.ID">
                {{i.Nombre}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetRazas} from "./../../../gql/variables";
export default {
    data() {
        return {
            Mascotas:[],
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
                this.$emit('recibir_evento',{Tipo:"Razas",Data:e});
            }
        },
        ObtenerIDJerarquia(value){
            for (let index = 0; index < this.Mascotas.length; index++) {
                if (this.Mascotas[index]["Nombre"]==value) {
                    return this.Mascotas[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetRazas,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Razas != null) {
                    this.Mascotas=result.data.Razas;
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
