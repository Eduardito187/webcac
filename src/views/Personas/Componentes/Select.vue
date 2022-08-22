<template>
    <a-spin :spinning="cargando">
        <div class="spin-content">
            <a-tree-select v-model="value" style="width: 100%;" @change="imprimir_Rangos()" :dropdownStyle="{maxHeight: '300px'}" :tree-data="OpcionesSelect" tree-checkable search-placeholder="Seleccionar Rangos" />
        </div>
    </a-spin>
</template>
<script>
import {GetRoles} from "./../../../gql/variables";
export default {
    data() {
        return {
            Rangos: [],
            value: [],
            permiso: null,
            RangoID: 0,
            cargando: true,
            OpcionesSelect: []
        };
    },
    props: {
        RolesUser: {
            type: Array
        }
    },
    watch: {
        RolesUser: {
            immediate: true,
            handler(val, oldVal) {
                //nuevo--anterior
                if (val != null && oldVal != null) {
                    if (val != oldVal) {
                        this.UpdateSetAPI(val);
                    }
                }
            }
        }
    },
    methods: {
        async imprimir_Rangos(){
            this.$emit("ActualizacionRoles",this.value);
        },
        async ObtenerRoles() {
            await this.$apollo.query({query: GetRoles,variables:{
                ID_CUENTA:parseInt(localStorage.id_cuenta)
            },fetchPolicy: "network-only"}).then(result => {
                this.Rangos = result.data.Rangos;
                this.armadoSelectRangos();
            });
        },
        armadoSelectRangos(){
            for (let index = 0; index < this.Rangos.length; index++) {
                this.OpcionesSelect.push({
                    title: this.Rangos[index]["Rango"],
                    value: this.Rangos[index]["ID"],
                    key: this.Rangos[index]["ID"]
                });
            }
            this.SeleccionadorItemSelect();
        },
        UpdateSetAPI(obj){
            for (let index = 0; index < obj.length; index++) {
                if (obj[index]["Rango"]!=null) {
                    if (obj[index]["Rango"]["ID"]!=null) {
                        this.value.push(obj[index]["Rango"]["ID"]);
                    }
                }
            }
        },
        SeleccionadorItemSelect(){
            if (this.RolesUser!=null) {
                this.UpdateSetAPI(this.RolesUser);
            }else{
                this.value=[];
            }
            this.cargando=false;
        }
    },
    async created() {
        this.ObtenerRoles();
    }
};
</script>