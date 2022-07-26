<template>
    <a-spin :spinning="cargando">
        <div class="spin-content">
            <a-tree-select v-model="value" style="width: 100%;" @change="imprimir_Permisos()" :dropdownStyle="{maxHeight: '300px'}" :tree-data="OpcionesSelect" tree-checkable search-placeholder="Seleccionar Permisos" />
        </div>
    </a-spin>
</template>
<script>
import {GetPermisos} from "./../../../gql/variables";
export default {
    data() {
        return {
            Permisos: [],
            value: [],
            permiso: null,
            RangoID: 0,
            cargando: true,
            OpcionesSelect: []
        };
    },
    props: {
        PermisosRol: {
            type: Array
        }
    },
    watch: {
        PermisosRol: {
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
        async imprimir_Permisos(){
            this.$emit("ActualizacionPermisos",this.value);
        },
        async ObtenerPermisos() {
            await this.$apollo.query({query: GetPermisos,variables:{
                ID_CUENTA:parseInt(localStorage.id_cuenta)
            },fetchPolicy: "network-only"}).then(result => {
                this.Permisos = result.data.Permisos;
                this.armadoSelectPermisos();
            });
        },
        armadoSelectPermisos(){
            for (let index = 0; index < this.Permisos.length; index++) {
                this.OpcionesSelect.push({
                    title: this.Permisos[index]["Permiso"],
                    value: this.Permisos[index]["ID"],
                    key: this.Permisos[index]["ID"]
                });
            }
            this.SeleccionadorItemSelect();
        },
        UpdateSetAPI(obj){
            for (let index = 0; index < obj.length; index++) {
                if (obj[index]["RangoPermiso"]!=null) {
                    if (obj[index]["RangoPermiso"]["ID"]!=null) {
                        this.value.push(obj[index]["RangoPermiso"]["ID"]);
                    }
                }
            }
        },
        SeleccionadorItemSelect(){
            if (this.PermisosRol!=null) {
                this.UpdateSetAPI(this.PermisosRol);
            }else{
                this.value=[];
            }
            this.cargando=false;
        }
    },
    async created() {
        this.ObtenerPermisos();
    }
};
</script>
