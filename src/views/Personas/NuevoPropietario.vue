<template>
    <div>
        <div class="columna d-flex justify-content-center">
            <div class="col-md-9">
                <b-overlay :show="validacionR" rounded="sm">
                    <b-form-group label-cols-lg="12" label="Nuevo Propietario" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0 col-md-12" >
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
                                    <b-form-group class="col-md-3" label="Direccion" label-for="Direccion" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Direccion"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-2" label="Zona" label-for="Zona" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Zona"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-2" label="Barrio" label-for="Barrio" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Barrio"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-2" label="Calle" label-for="Calle" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Calle"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-1" label="N~ de Casa" label-for="NCasa" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="NCasa"></b-form-input>
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Departamento" label-for="Departamentos" label-cols-sm="12" label-align-sm="right" >
                                        <Departamentos :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Provincia" label-for="Provincias" label-cols-sm="12" label-align-sm="right" >
                                        <Provincias :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Municipio" label-for="Municipios" label-cols-sm="12" label-align-sm="right" >
                                        <Municipios :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Canton" label-for="Cantones" label-cols-sm="12" label-align-sm="right" >
                                        <Cantones :Nombre="''" />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-12" :style="{padding:'10px'}" label="Departamento" label-for="Departamentos" label-cols-sm="12" label-align-sm="right" >
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1597.7021055488115!2d-63.144498993701845!3d-17.74476058815136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e647d1170425%3A0xe8ac0be7e9b82c74!2sCyberSpace%20Internet!5e0!3m2!1ses!2sbo!4v1661070776409!5m2!1ses!2sbo" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <b-button :disabled="validacionR" pill variant="primary" :style="{marginTop:'20px'}" >Siguiente</b-button >
                    </b-form-group>
                </b-overlay>
            </div>
        </div>
    </div>
</template>
<script>
import Imagen from './Componentes/Imagen.vue';
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
    components:{ Imagen, TipoDocumento, Cantones, Departamentos, Municipios, Provincias },
    methods: {
    },
    async created() {
        if (localStorage.id_cuenta!=null) {
            this.validacionR = false;
        }
    }
};
</script>