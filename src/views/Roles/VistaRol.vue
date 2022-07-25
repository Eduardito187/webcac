<template>
    <div class="VistaRol">
        <a-spin :spinning="cargando">
            <div class="spin-content">
                <a-row>
                    <a-col :span="24">
                        <a-col :span="6" :style="{padding:'10px'}">
                            <a-row>
                                <b-form-group label-cols-lg="12" label="Nuevo Rol" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0 col-md-12" >
                                    <div class="d-flex justify-content-between">
                                        <b-form-group class="col-md-12" label="Nombre" label-for="Nombre" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Nombre" v-model="Nombre"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <b-form-group class="col-md-12" label="Permisos:" label-for="Permisos" label-cols-sm="12" label-align-sm="right" >
                                            <SelectPermisos :PermisosRol="PermisosAPI" @ActualizacionPermisos="UpdatePermiso" />
                                        </b-form-group>
                                    </div>
                                </b-form-group>
                            </a-row>
                            <a-row v-if="Nombre.length>0 && Permisos.length>0">
                                <a-col :span="24" :style="{marginTop:'20px'}">
                                    <a-button @click="EditarPermisoDB()" type="primary" style="background-color: #0b8235 !important;border-color: #0b8235 !important;" icon="edit" size="large">
                                        Editar
                                    </a-button>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :span="18" :style="{padding:'10px'}">
                            <a-card title="Usuarios" :bordered="false" style="width: 100%;">
                                <a-switch default-checked />
                            </a-card>
                        </a-col>
                    </a-col>
                </a-row>
            </div>
        </a-spin>
    </div>
</template>
<script>
import {GetRangoVista,SetRangosEdit} from "./../../gql/variables";
import FotoCircular from "./../../components/FotoCircular.vue";
import RangosUser from "./../../components/RangosUser.vue";
import SelectPermisos from './Componente/SelectPermisos.vue';
export default {
    name: "VistaRol",
    data() {
        return {
            Rango:{},
            Editando:false,
            Nombre:"",
            Permisos:[],
            PermisosAPI:[],
            cargando: true
        }
    },
    components:{FotoCircular,RangosUser,SelectPermisos},
    methods:{
        UpdatePermiso(item){
            this.Permisos=item;
        },
        async GetRangoAPI(){
            await this.$apollo.query({
                query: GetRangoVista,
                variables:{
                    ID:parseInt(this.$route.params.ID)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Rango != null) {
                    this.Rango=result.data.Rango;
                    this.Nombre = this.Rango.Rango != null ? this.Rango.Rango : "";
                    this.PermisosAPI = this.Rango.RangoPermiso != null ? this.Rango.RangoPermiso : [];
                    this.cargando=false;
                }
            });
        },
        async EditarPermisoDB() {
            if (this.Nombre.length==0) {
                this.$notification["error"]({
                    message: 'Permisos',
                    description: "El nombre es obligatorio."
                });
            }else if (this.Permisos.length==0) {
                this.$notification["error"]({
                    message: 'Permisos',
                    description: "Seleccione permisos para el rol."
                });
            }else{
                await this.$apollo.mutate({mutation: SetRangosEdit,variables: {ID:parseInt(this.$route.params.ID),Nombre: this.Nombre,Permisos: this.Permisos}}).then(result => {
                    if (result.data.EditRangos!=null) {
                        if (result.data.EditRangos.response) {
                            this.$notification["success"]({
                                message: 'Permisos',
                                description: "Rol editado exitosamente."
                            });
                        }else{
                            this.$notification["error"]({
                                message: 'Permisos',
                                description: "Error al editar."
                            });
                        }
                    }
                });
            }
        },
    },
    created() {
        if (this.$route.params.ID!=null) {
            this.GetRangoAPI();
        }
    },
};
</script>