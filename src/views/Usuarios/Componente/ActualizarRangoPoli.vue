<template>
    <a-spin :spinning="cargando">
    <a-select show-search placeholder="Seleccion un grado" v-model="ValorGrado" option-filter-prop="children" style="width: 100%" @change="handleChange">
            <a-select-option v-for="i in Jerarquias" :key="i.ID" :value="i.Grado">
                {{i.Grado}}
            </a-select-option>
        </a-select>
    </a-spin>
</template>
<script>
import {GetJerarquias,ChangeJerarquia} from "./../../../gql/variables";
export default {
    data() {
        return {
            Jerarquias:[],
            cargando:true,
            ValorGrado:""
        }
    },
    props:{
        Grado:{
            type: String,
            default: String
        }
    },
    methods: {
        ObtenerIDJerarquia(value){
            for (let index = 0; index < this.Jerarquias.length; index++) {
                if (this.Jerarquias[index]["Grado"]==value) {
                    return this.Jerarquias[index]["ID"];
                }
            }
        },
        async handleChange(value) {
            this.ValorGrado = value;
            await this.$apollo.mutate({
                mutation: ChangeJerarquia,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta),
                    ID:parseInt(this.$route.params.ID),
                    Jerarquia:this.ObtenerIDJerarquia(this.ValorGrado)
                }
            }).then(result => {
                if (result.data.ActualizarJerarquia != null) {
                    if (result.data.ActualizarJerarquia.response) {
                        this.$notification["success"]({
                            message: 'CAC',
                            description: 'Jerarquia actualizada'
                        });
                        this.$emit('Jerarquia_Update',{ID:this.ObtenerIDJerarquia(this.ValorGrado),Grado:this.ValorGrado});
                    }else{
                        this.$notification["success"]({
                            message: this.RetornarNombreCompleto(),
                            description: 'Cuenta no existe.'
                        });
                    }
                }
            });
        },
        async ObtenerAPI(){
            await this.$apollo.query({
                query: GetJerarquias,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Jerarquias != null) {
                    this.Jerarquias=result.data.Jerarquias;
                    this.cargando=false;
                }
            });
        }
    },
    created(){
        this.ValorGrado=this.Grado;
        this.ObtenerAPI();
    }
};
</script>
