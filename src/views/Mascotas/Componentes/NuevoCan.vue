<template>
    <div>
        <div class="columna d-flex justify-content-center">
            <div class="col-md-9">
                <b-overlay :show="validacionR" rounded="sm">
                    <b-form-group label-cols-lg="12" label="Nueva Mascota" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0 col-md-12" >
                        <a-row>
                            <a-col :span="18">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Nombre" label-for="Nombre" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Nombre" v-model="Form.Nombre"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Raza:" label-for="Raza" label-cols-sm="12" label-align-sm="right" >
                                        <Select @recibir_evento="RecibivirData($event)" Nombre="" />
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Edad de Registro" label-for="Registro" label-cols-sm="12" label-align-sm="right" >
                                        <a-input-number id="Registro" v-model="Form.EdadRegistro"/>
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Edad Actual" label-for="Actual" label-cols-sm="12" label-align-sm="right" >
                                        <a-input-number id="Actual" v-model="Form.Anho"/>
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Tamanho" label-for="Tamanho" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Tamanho" v-model="Form.Tamanho"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Numero de Chip" label-for="chip" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="chip" v-model="Form.Chip"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Color" label-for="Color" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Color" v-model="Form.Color"></b-form-input>
                                    </b-form-group>
                                </div>
                            </a-col>
                            <a-col :span="6" :style="{padding:'5px'}">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-6" label-cols-sm="12" label-align-sm="right" >
                                        <Imagen :Nombre="'Foto Frontal'" />
                                    </b-form-group>
                                    <b-form-group class="col-md-6" label-cols-sm="12" label-align-sm="right" >
                                        <Imagen :Nombre="'Foto Perfil Der'" />
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-6" label-cols-sm="12" label-align-sm="right" >
                                        <Imagen :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-6" label-cols-sm="12" label-align-sm="right" >
                                        <Imagen :Nombre="'Foto Perfil Izq'" />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24">
                                <div class="d-flex justify-content-between mb-2">
                                    <b-form-group class="col-md-12" label="Caracteristicas:" label-for="Caracteristicas" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-textarea id="Caracteristicas" v-model="Form.Caracteristica" placeholder="Caracteristicas.." rows="3" max-rows="3" ></b-form-textarea>
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-5" label="Vacunas:" label-for="Vacunas" label-cols-sm="12" label-align-sm="right" >
                                        <Vacunas />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{marginTop:'20px'}">
                                <b-button v-if="current > 0" @click="IrAntes()" pill variant="warning" :style="{marginTop:'20px',marginRight:'20px'}" >Anterior</b-button>
                                <b-button v-if="current < 3" pill @click="ValidarSiguiente()" variant="success" :style="{marginTop:'20px'}" >Siguiente</b-button>
                            </a-col>
                        </a-row>
                    </b-form-group>
                </b-overlay>
            </div>
        </div>
    </div>
</template>
<script>
import Select from './Select.vue';
import Vacunas from './Vacunas.vue';
import Imagen from './Image.vue';
export default {
    data() {
        return {
            validacionR: false,
            Form:{
                ID_CUENTA: parseInt(localStorage.id_cuenta),
                Propietario: parseInt(localStorage.ID_PROPIETARIO),
                Nombre: "",
                Raza: "",
                EdadRegistro: "",
                Anho: "",
                Tamanho: "",
                Chip: "",
                Color: "",
                Sexo: "",
                Tatuaje: "",
                Caracteristica: ""
            }
        };
    },
    props:{
        current:{
            type: Number,
            default: Number
        }
    },
    components:{ Select, Vacunas, Imagen },
    methods: {
        RecibivirData(obj){
            if (obj.Tipo == "Razas") {
                this.Form.Raza = parseInt(obj.Data);
            }
            console.log(this.Form);
        },
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