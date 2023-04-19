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
                                        <b-form-input id="Nombre" @change="a=>Form.Nombre=a"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-5" label="Apellidos" label-for="Apellidos" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Apellidos" @change="a=>Form.Apellidos=a"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-4" label="Tipo de Documento" label-for="TipoDocumento" label-cols-sm="12" label-align-sm="right" >
                                        <TipoDocumento @recibir_evento="RecibivirData($event)" :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" label="N°" label-for="N°" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="N°" @change="a=>Form.Numero=a"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-3" label="Parentesco" label-for="Parentesco" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Parentesco" @change="a=>Form.Parentesco=a"></b-form-input>
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
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Direccion" label-for="Direccion" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Direccion" @change="a=>Form.Direccion=a"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Zona" label-for="Zona" label-cols-sm="12" label-align-sm="right" >
                                        <Zonas @recibir_evento="RecibivirData($event)" :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Complemento" label-for="Complemento" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Complemento" @change="a=>Form.Complemento=a"></b-form-input>
                                    </b-form-group>
                                    <b-form-group v-if="Propietario == null" class="col-md-3" :style="{padding:'2px'}" label="Propietario:" label-for="Propietario" label-cols-sm="12" label-align-sm="right" >
                                        <Zonas @recibir_evento="RecibivirData($event)" :Nombre="''" />
                                    </b-form-group>
                                </div>
                            </a-col>
                            <a-col :span="24">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-3" label="Barrio" label-for="Barrio" label-cols-sm="12" label-align-sm="right" >
                                        <Barrios @recibir_evento="RecibivirData($event)" @Value="" :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" label="Calle" label-for="Calle" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Calle" @change="a=>Form.Calle=a"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-2" label="N° de Casa" label-for="NCasa" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="NCasa" @change="a=>Form.NumCasa=a"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-2" label="UV" label-for="UV" label-cols-sm="12" label-align-sm="right" >
                                        <Uvs @recibir_evento="RecibivirData($event)" @Value="" :Nombre="''" />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Departamento" label-for="Departamentos" label-cols-sm="12" label-align-sm="right" >
                                        <Departamentos @recibir_evento="RecibivirData($event)" :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Provincia" label-for="Provincias" label-cols-sm="12" label-align-sm="right" >
                                        <Provincias @recibir_evento="RecibivirData($event)" :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Municipio" label-for="Municipios" label-cols-sm="12" label-align-sm="right" >
                                        <Municipios @recibir_evento="RecibivirData($event)" :Nombre="''" />
                                    </b-form-group>
                                    <b-form-group class="col-md-3" :style="{padding:'2px'}" label="Canton" label-for="Cantones" label-cols-sm="12" label-align-sm="right" >
                                        <Cantones @recibir_evento="RecibivirData($event)" :Nombre="''" />
                                    </b-form-group>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-4" label="Latitud" label-for="Latitud" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Latitud" @change="a=>Form.Latitud=a" :value="Form.Latitud"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-4" label="Longitud" label-for="Longitud" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input id="Longitud" @change="a=>Form.Longitud=a" :value="Form.Longitud"></b-form-input>
                                    </b-form-group>
                                    <b-form-group class="col-md-2" label-cols-sm="12" label-align-sm="right">
                                        <b-button @click="getLocation()" pill variant="success" :style="{marginTop:'20px'}" >Ver Mapa</b-button>
                                    </b-form-group>
                                </div>
                            </a-col>
                            <a-col :span="24" v-if="mapVisible">
                                <div class="d-flex justify-content-between">
                                    <b-form-group class="col-md-12" :style="{padding:'10px'}" label-cols-sm="12" label-align-sm="right" >
                                        <GmapMap ref="mapRef" :center="{lat:coordinates.lat, lng:coordinates.lng}" :zoom="10" map-type-id="terrain" style="width:100%;height:300px;">
                                            <GmapMarker :position="{lat:coordinates.lat, lng:coordinates.lng}" :draggable="true" @dragend="updateCoordinates" />
                                        </GmapMap>
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
import {CreateReferencia} from './../../gql/variables';
export default {
    data() {
        return {
            validacionR: false,
            mapVisible: false,
            coordinates: {lat: null, lng: null},
            Form: {
                ID_CUENTA:parseInt(localStorage.id_cuenta),
                Parentesco: "",
                Nombre: "",
                Apellidos: "",
                TipoDocumento: "",
                Numero: "",
                Complemento: "",
                Direccion: "",
                Zona: "",
                Barrio: "",
                Calle: "",
                NumCasa: "",
                Uv: "",
                Parentesco: "",
                Telefono: "",
                Departamento: "",
                Provincia: "",
                Municipio: "",
                Canton: "",
                Latitud: "",
                Longitud: "",
                Distrito: "",
                Propietario: ""
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
    components:{ Imagen, TipoDocumento, Cantones, Departamentos, Municipios, Provincias, Zonas, Barrios, Uvs },
    methods: {
        RecibivirData(obj){
            if (obj.Tipo == "Departamento") {
                this.Form.Departamento = parseInt(obj.Data);
            }else if (obj.Tipo == "Provincia") {
                this.Form.Provincia = parseInt(obj.Data);
            }else if (obj.Tipo == "Municipio") {
                this.Form.Municipio = parseInt(obj.Data);
            }else if (obj.Tipo == "Canton") {
                this.Form.Canton = parseInt(obj.Data);
            }else if (obj.Tipo == "Barrio") {
                this.Form.Barrio = parseInt(obj.Data);
            }else if (obj.Tipo == "Uv") {
                this.Form.Uv = parseInt(obj.Data);
            }else if (obj.Tipo == "TipoDocumento") {
                this.Form.TipoDocumento = parseInt(obj.Data);
            }else if (obj.Tipo == "Zona") {
                this.Form.Zona = parseInt(obj.Data);
            }
            console.log(this.Form);
        },
        IrAntes(){
            this.$emit('evento_antes');
        },
        ValidarForm(){
            if (this.Form.ID_CUENTA != null && this.Form.Nombre != "" && this.Form.Apellidos != "" && this.Form.TipoDocumento != ""
            && this.Form.Numero != "" && this.Form.Complemento != "" && this.Form.Direccion != "" 
            && this.Form.Zona != "" && this.Form.Barrio != "" && this.Form.Calle != "" && this.Form.NumCasa != "" && this.Form.Uv != "" 
            && this.Form.Departamento != "" && this.Form.Provincia != "" && this.Form.Municipio != "" 
            && this.Form.Canton != "" && localStorage.ID_PROPIETARIO != null){
                return true;
            }
            return false;
        },
        async miValidacion(){
            if (this.ValidarForm()) {
                this.validacionR = true;
                await this.$apollo.mutate({mutation: CreateReferencia,
                    variables: this.Form
                }).then(result => {
                    if (result.data.CreateReferencia!=null) {
                        if (result.data.CreateReferencia.number) {
                            localStorage.ID_REFERENCIA = result.data.CreateReferencia.number;
                            this.$notification["success"]({
                                message: 'CAC',
                                description: "referencia registrada exitosamente."
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
            //this.$emit('evento_siguiente');
            this.miValidacion();
        },
        updateCoordinates(location) {
            this.coordinates = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            };
            this.Form.Latitud = String(location.latLng.lat());
            this.Form.Longitud = String(location.latLng.lng());
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position)=> {
                    this.SetshowPosition(position.coords);
                });
            }else{
                alert("No");
            }
        },
        SetshowPosition(position) {
            this.coordinates = {lat:position.latitude,lng:position.longitude};
            this.Form.Latitud = String(position.latitude);
            this.Form.Longitud = String(position.longitude);
            this.mapVisible = true;
        }
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