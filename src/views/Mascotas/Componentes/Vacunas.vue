<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccione un elemento" v-model="ValorDato" option-filter-prop="children" style="width: 100%">
            <a-select-option v-for="i in Vacunas" :key="i.ID" :value="''">
                {{i.Nombre}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetVacunas} from "./../../../gql/variables";
export default {
    data() {
        return {
            Vacunas:[],
            cargando:true,
            ValorDato:""
        }
    },
    props:{
    },
    methods: {
        ObtenerIDJerarquia(value){
            for (let index = 0; index < this.Vacunas.length; index++) {
                if (this.Vacunas[index]["Nombre"]==value) {
                    return this.Vacunas[index]["ID"];
                }
            }
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetVacunas,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Vacunas != null) {
                    this.Vacunas=result.data.Vacunas;
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
