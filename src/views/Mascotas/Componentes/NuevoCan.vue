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
                                        <a-input-number id="Registro" :style="{width: '100%'}" v-model="Form.EdadRegistro"/>
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Edad Actual" label-for="Actual" label-cols-sm="12" label-align-sm="right" >
                                        <a-input-number id="Actual" :style="{width: '100%'}" v-model="Form.Anho"/>
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
                                    <b-form-group class="col-md-5" label="Sexo" label-for="Sexo" label-cols-sm="12" label-align-sm="right" >
                                        <Sexos @recibir_evento="RecibivirData($event)" :Nombre="''" />
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
                                    <b-form-group v-if="Propietario == null" class="col-md-5" label="Propietario:" label-for="Propietario" label-cols-sm="12" label-align-sm="right" >
                                        <Vacunas />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{marginTop:'20px'}">
                                <b-button v-if="current > 0" @click="IrAntes()" pill variant="warning" :style="{marginTop:'20px',marginRight:'20px'}" >Anterior</b-button>
                                <b-button v-if="current < 3" pill @click="ValidarSiguiente()" variant="success" :style="{marginTop:'20px'}" >Siguiente</b-button>
                                <b-button v-else="current == 2" pill @click="ValidarSiguiente()" variant="success" :style="{marginTop:'20px'}" >
                                    <b>Finalizar registro</b>
                                </b-button>
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
import Sexos from './Sexos.vue';
import { CreateCan } from '../../../gql/variables';
export default {
    data() {
        return {
            validacionR: false,
            Form:{
                ID_CUENTA: parseInt(localStorage.id_cuenta),
                Propietario: "",
                Nombre: "",
                Raza: "",
                EdadRegistro: "",
                Anho: "",
                Tamanho: "",
                Chip: "",
                Color: "",
                Sexo: null,
                Tatuaje: "",
                Caracteristica: ""
            },
            Propietario: null
        };
    },
    props:{
        current:{
            type: Number,
            default: Number
        }
    },
    components:{ Select, Vacunas, Imagen, Sexos },
    methods: {
        RecibivirData(obj){
            if (obj.Tipo == "Razas") {
                this.Form.Raza = parseInt(obj.Data);
            }else if (obj.Tipo == "Sexos") {
                this.Form.Sexo = parseInt(obj.Data);
            }
            console.log(this.Form);
        },
        IrAntes(){
            this.$emit('evento_antes');
        },
        ValidarForm(){
            if (this.Form.ID_CUENTA != null && this.Form.Nombre != "" && this.Form.Raza != "" && this.Form.EdadRegistro != ""
            && this.Form.Anho != "" && this.Form.Tamanho != "" && this.Form.Chip != "" && this.Form.Propietario != null 
            && this.Form.Color != "" && this.Form.Sexo != null && this.Form.Caracteristica != ""){
                return true;
            }
            return false;
        },
        async miValidacion(){
            if (this.ValidarForm()) {
                this.validacionR = true;
                await this.$apollo.mutate({mutation: CreateCan,
                    variables: this.Form
                }).then(result => {
                    if (result.data.CreateCan!=null) {
                        if (result.data.CreateCan.number) {
                            localStorage.removeItem('ID_REFERENCIA');
                            localStorage.removeItem('ID_PROPIETARIO');
                            this.$router.push("/Mascotas");
                            this.$notification["success"]({
                                message: 'CAC',
                                description: "Can registrado exitosamente."
                            });
                            this.validacionR = false;
                            this.$emit('evento_siguiente');
                        }else{
                            this.$notification["error"]({
                                message: 'CAC',
                                description: "Error al registrar."
                            });
                        }
                    }
                });
            }else{
                this.$notification["error"]({
                    message: 'CAC',
                    description: "Rellene toda la informacion."
                });
            }
        },
        ValidarSiguiente(){
            this.miValidacion();
        },
    },
    async created() {
        if (localStorage.id_cuenta == null) {
            this.$router.push("/");
        }
        if (localStorage.id_cuenta!=null) {
            this.validacionR = false;
        }
        if (localStorage.ID_PROPIETARIO != null) {
            this.Propietario = localStorage.ID_PROPIETARIO;
        }
    },
    mounted(){
        if (localStorage.ID_PROPIETARIO != null) {
            this.Form.Propietario = parseInt(localStorage.ID_PROPIETARIO);
        }
    }
};
</script>