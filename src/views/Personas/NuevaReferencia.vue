<template>
    <div>
        <div class="columna d-flex justify-content-center">
            <div class="col-md-9">
                <b-overlay :show="validacionR" rounded="sm">
                    <b-form-group label-cols-lg="12" label="Nueva Referencia" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0 col-md-12" >
                        <a-row>
                            <a-col :span="18">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Nombre" label-for="Nombre" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Nombre"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Apellidos" label-for="Apellidos" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Apellidos"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-4" label="Tipo de Documento" label-for="TipoDocumento" label-cols-sm="12" label-align-sm="right" >
                                        <TipoDocumento :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" label="N~" label-for="N~" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="N~"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-3" label="Complemento" label-for="Complemento" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Complemento"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Direccion" label-for="Direccion" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Direccion"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Zona" label-for="Zona" label-cols-sm="12" label-align-sm="right" >
                                        <Zonas :Nombre="''" />
                                    </b-form-group>
                                </div>
                            </a-col>
                            <a-col :span="6" :style="{padding:'5px'}">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-12" label-cols-sm="12" label-align-sm="right" >
                                        <Imagen :Nombre="'Foto'" />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-3" label="Barrio" label-for="Barrio" label-cols-sm="12" label-align-sm="right" >
                                        <Barrios :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" label="Calle" label-for="Calle" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Calle"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-2" label="N~ de Casa" label-for="NCasa" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="NCasa"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-2" label="UV" label-for="UV" label-cols-sm="12" label-align-sm="right" >
                                        <Uvs :Nombre="''" />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="18">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Parentesco" label-for="Parentesco" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Parentesco"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Telefono" label-for="Telefono" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Telefono"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Departamento" label-for="Departamentos" label-cols-sm="12" label-align-sm="right" >
                                        <Departamentos :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Provincia" label-for="Provincias" label-cols-sm="12" label-align-sm="right" >
                                        <Provincias :Nombre="''" />
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Municipio" label-for="Municipios" label-cols-sm="12" label-align-sm="right" >
                                        <Municipios :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Canton" label-for="Cantones" label-cols-sm="12" label-align-sm="right" >
                                        <Cantones :Nombre="''" />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <b-button v-if="current > 0" @click="IrAntes()" pill variant="warning" :style="{marginTop:'20px',marginRight:'20px'}" >Anterior</b-button>
                        <b-button v-if="current < 3" pill @click="ValidarSiguiente()" variant="success" :style="{marginTop:'20px'}" >Siguiente</b-button>
                    </b-form-group>
                </b-overlay>
            </div>
        </div>
    </div>
</template>
<script>
import Imagen from './Componentes/Imagen.vue';
import Zonas from '../Departamento/Componentes/Zonas.vue';
import Barrios from '../Departamento/Componentes/Barrios.vue';
import Uvs from '../Departamento/Componentes/Uvs.vue';
import TipoDocumento from './Componentes/TipoDocumento.vue';
import Cantones from '../Departamento/Componentes/Cantones.vue';
import Departamentos from '../Departamento/Componentes/Departamentos.vue';
import Municipios from '../Departamento/Componentes/Municipios.vue';
import Provincias from '../Departamento/Componentes/Provincias.vue';
export default {
    data() {
        return {
            validacionR: false
        };
    },
    props:{
        current:{
            type: Number,
            default: Number
        }
    },
    components:{ Imagen, TipoDocumento, Cantones, Departamentos, Municipios, Provincias, Zonas, Barrios, Uvs },
    methods: {
        IrAntes(){
            this.$emit('evento_antes');
        },
        miValidacion(){
            return true;
        },
        ValidarSiguiente(){
            if (this.miValidacion()) {
                this.$emit('evento_siguiente');
            }
        },
    },
    async created() {
        if (localStorage.id_cuenta!=null) {
            this.validacionR = false;
        }
    }
};
</script>