<template>
    <div class="VistaUsuario">
        <a-row>
            <a-col :span="24" style="position:relative;margin-bottom: 85px;">
                <a-col :span="24">
                    <div style="background-color: #808080;width:100%;height:200px;border-radius: 10px;" />
                </a-col>
                <div v-if="Usuario!=null" style="position:absolute;left:10px;top:125px;z-index:100;">
                    <FotoCircular v-if="Usuario.FotoR!=null" :foto="Usuario.FotoR.URL" ancho="150" />
                </div>
                <div v-if="Usuario!=null" style="position:absolute;left:170px;top:200px;z-index:100;">
                    <h1 class="TextoBold" v-if="Usuario.PoliciaR!=null">{{Usuario.PoliciaR.Nombre+" "+Usuario.PoliciaR.Paterno+" "+Usuario.PoliciaR.Materno}}</h1>
                </div>
                <div v-if="Usuario!=null" style="position:absolute;right:10px;top:200px;z-index:100;">
                    <h1 class="TextoBold">Editar : <a-switch :checked="Editando" @change="EditarStatusSet" /></h1>
                </div>
            </a-col>
            <a-col v-if="Editando==false" :span="24">
                <a-col :span="18" style="padding:5px;">
                    <a-card v-if="Usuario!=null" :bordered="true" style="width: 100%;">
                        <h6 class="TextoBold" v-if="Usuario.Jerarquia!=null">Grado : {{Usuario.Jerarquia.Grado}}</h6>
                        <h6 class="TextoBold" v-if="Usuario.Escalafon!=null">Escalafon : {{Usuario.Escalafon}}</h6>
                        <h6 class="TextoBold">Nombre : {{Usuario.PoliciaR.Nombre}}</h6>
                        <h6 class="TextoBold">Apellidos : {{Usuario.PoliciaR.Paterno+" "+Usuario.PoliciaR.Materno}}</h6>
                        <h6 class="TextoBold">CI : {{Usuario.PoliciaR.CI}}</h6>
                        <h6 class="TextoBold">Fecha de nacimiento : {{Usuario.PoliciaR.Nacimiento}}</h6>
                    </a-card>
                </a-col>
                <a-col :span="6" style="padding:5px;">
                    <a-card v-if="Usuario.PoliciaR!=null" title="Infromacion de contacto:" :bordered="true" style="width: 100%;margin-bottom: 10px;">
                        <h6 class="TextoBold">Correo : {{Usuario.PoliciaR.Correo}}</h6>
                        <h6 class="TextoBold">Telefono : {{Usuario.PoliciaR.Telefono}}</h6>
                    </a-card>
                    <a-card v-if="Usuario.RangoUsuario!=null" title="Credenciales:" :bordered="true" style="width: 100%;">
                        <h6 class="TextoBold">
                            Rangos : <RangosUser :Rangos="Usuario.RangoUsuario" />
                        </h6>
                        <h6 class="TextoBold">Usuario : {{Usuario.Usuario}}</h6>
                    </a-card>
                </a-col>
            </a-col>
            <a-col v-else :span="24">
                <a-col :span="6" :style="{padding:'10px'}">
                    <a-card title="Grado" :bordered="false" style="width: 100%;">
                        <a-switch default-checked @change="onChange" />
                    </a-card>
                    <a-card title="Rango" :bordered="false" style="width: 100%;">
                        <a-switch default-checked @change="onChange" />
                    </a-card>
                </a-col>
                <a-col :span="18">
                    <a-row>
                        <a-col :span="8">
                            <b-form-group class="col-md-11" label="Escalafon" label-for="Escalafon" label-cols-sm="12" label-align-sm="right" >
                                <b-form-input id="Escalafon"></b-form-input>
                            </b-form-group>
                        </a-col>
                        <a-col :span="8">
                            <b-form-group class="col-md-11" label="Nombre" label-for="Nombre" label-cols-sm="12" label-align-sm="right" >
                                <b-form-input id="Nombre"></b-form-input>
                            </b-form-group>
                        </a-col>
                        <a-col :span="8">
                            <b-form-group class="col-md-11" label="Apellido Materno" label-for="Apellido Materno" label-cols-sm="12" label-align-sm="right" >
                                <b-form-input id="Materno"></b-form-input>
                            </b-form-group>
                        </a-col>
                        <a-col :span="8">
                            <b-form-group class="col-md-11" label="Apellido Paterno" label-for="Apellido Paterno" label-cols-sm="12" label-align-sm="right" >
                                <b-form-input id="Paterno"></b-form-input>
                            </b-form-group>
                        </a-col>
                        <a-col :span="8">
                            <b-form-group class="col-md-11" label="Telefono" label-for="Telefono" label-cols-sm="12" label-align-sm="right" >
                                <b-form-input id="Telefono"></b-form-input>
                            </b-form-group>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24" :style="{marginTop:'20px'}">
                            <a-button type="primary" style="background-color: #0b8235 !important;border-color: #0b8235 !important;" icon="edit" size="large">
                                Editar
                            </a-button>
                            <a-button type="primary" style="margin-left:10px;background-color: #ff4d4f !important;border-color: #ff4d4f !important;" icon="delete" size="large">
                                Eliminar
                            </a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import {PerfilHeader} from "./../../gql/variables";
import FotoCircular from "./../../components/FotoCircular.vue";
import RangosUser from "./../../components/RangosUser.vue";
export default {
    name: "VistaUsuario",
    data() {
        return {
            Usuario:{},
            Editando:false
        }
    },
    components:{FotoCircular,RangosUser},
    methods:{
        EditarStatusSet(check){
            this.Editando=check;
        },
        onChange(checked) {
            console.log(`a-switch to ${checked}`);
        },
        async GetUserAPI(){
            await this.$apollo.query({
                query: PerfilHeader,
                variables:{
                    ID:parseInt(this.$route.params.ID)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Usuario != null) {
                    this.Usuario=result.data.Usuario;
                }
            });
        },
    },
    created() {
        if (this.$route.params.ID!=null) {
            this.GetUserAPI();
        }
    },
};
</script>