<template>
    <div class="MiPerfil">
        <a-spin :spinning="cargando">
            <div class="spin-content">
                <a-row v-if="cargando==false">
                    <a-col :span="24" style="position:relative;margin-bottom: 85px;">
                        <a-col :span="24">
                            <div style="background-color: #808080;width:100%;height:200px;border-radius: 10px;" />
                        </a-col>
                        <div v-if="Usuario!=null" style="position:absolute;left:10px;top:125px;z-index:100;">
                            <FotoCircular v-if="Usuario.FotoR!=null" :foto="Usuario.FotoR.URL" :ancho="150" />
                        </div>
                        <div v-if="Usuario!=null" style="position:absolute;left:170px;top:200px;z-index:100;">
                            <h1 class="TextoBold" v-if="Usuario.PoliciaR!=null">{{Usuario.PoliciaR.Nombre+" "+Usuario.PoliciaR.Paterno+" "+Usuario.PoliciaR.Materno}}</h1>
                        </div>
                        <div v-if="Usuario!=null" style="position:absolute;right:10px;top:200px;z-index:100;">
                            <h1 class="TextoBold">Editar : <a-switch :checked="Editando" @change="EditarStatusSet" /></h1>
                        </div>
                    </a-col>
                    <a-col v-show="Editando==false" :span="24">
                        <a-col :span="18" style="padding:5px;">
                            <a-card v-if="Usuario!=null" :bordered="true" style="width: 100%;">
                                <h6 class="TextoBold" v-if="Usuario.Escalafon!=null">Escalafon : {{Usuario.Escalafon}}</h6>
                                <h6 class="TextoBold" v-if="Usuario.JerarquiaR!=null">Grado : {{Usuario.JerarquiaR.Grado}}</h6>
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
                                <h6 class="TextoBold">Estado : <a-tag v-if="Usuario.Estado" color="green">Activado</a-tag><a-tag v-else color="red">Bloqueado</a-tag></h6>
                            </a-card>
                        </a-col>
                    </a-col>
                    <a-col v-show="Editando==true" :span="24">
                        <a-col :span="24">
                            <a-row>
                                <a-col :span="8">
                                    <b-form-group class="col-md-11" label="Nombre" label-for="Nombre" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input v-model="FormUsuario.Nombre" id="Nombre"></b-form-input>
                                    </b-form-group>
                                </a-col>
                                <a-col :span="8">
                                    <b-form-group class="col-md-11" label="Apellido Paterno" label-for="Apellido Paterno" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input v-model="FormUsuario.Paterno" id="Paterno"></b-form-input>
                                    </b-form-group>
                                </a-col>
                                <a-col :span="8">
                                    <b-form-group class="col-md-11" label="Apellido Materno" label-for="Apellido Materno" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input v-model="FormUsuario.Materno" id="Materno"></b-form-input>
                                    </b-form-group>
                                </a-col>
                                <a-col :span="8">
                                    <b-form-group class="col-md-11" label="Telefono" label-for="Telefono" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input v-model="FormUsuario.Telefono" id="Telefono"></b-form-input>
                                    </b-form-group>
                                </a-col>
                                <a-col :span="8">
                                    <b-form-group class="col-md-11" label="Correo" label-for="Correo" label-cols-sm="12" label-align-sm="right" >
                                        <b-form-input v-model="FormUsuario.Correo" id="Correo"></b-form-input>
                                    </b-form-group>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="24" :style="{marginTop:'20px'}">
                                    <a-button type="primary" @click="EditarUsuarioApi()" style="background-color: #0b8235 !important;border-color: #0b8235 !important;" icon="edit" size="large">
                                        Editar
                                    </a-button>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-col>
                </a-row>
            </div>
        </a-spin>
    </div>
</template>
<script>
import {PerfilHeader,SetEstadoUsuario,UpdateUsuario,DeleteUsuario,SetRolesEdit} from "./../../gql/variables";
import FotoCircular from "./../../components/FotoCircular.vue";
import RangosUser from "./../../components/RangosUser.vue";
import ActualizarRangoPoli from "./Componente/ActualizarRangoPoli.vue";
import SelectRoles from "../Roles/Componente/SelectRoles.vue";
export default {
    name: "MiPerfil",
    data() {
        return {
            Usuario:{},
            FormUsuario:{},
            Editando:false,
            cargando: true,
            RolesUser:[],
        }
    },
    components:{FotoCircular,RangosUser,ActualizarRangoPoli,SelectRoles},
    methods:{
        async EditarUsuarioApi(){
            await this.$apollo.mutate({
                mutation: UpdateUsuario,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta),
                    ID:parseInt(localStorage.id_cuenta),
                    Nombre: this.FormUsuario.Nombre,
                    Paterno: this.FormUsuario.Paterno,
                    Materno: this.FormUsuario.Materno,
                    Correo: this.FormUsuario.Correo,
                    Telefono: this.FormUsuario.Telefono
                }
            }).then(result => {
                if (result.data.UpdateUsuario != null) {
                    if (result.data.UpdateUsuario.response) {
                        this.$notification["success"]({
                            message: this.RetornarNombreCompleto(),
                            description: 'Cuenta editada.'
                        });
                        this.Usuario.PoliciaR.Nombre=this.FormUsuario.Nombre;
                        this.Usuario.PoliciaR.Paterno=this.FormUsuario.Paterno;
                        this.Usuario.PoliciaR.Materno=this.FormUsuario.Materno;
                        this.Usuario.PoliciaR.Telefono=this.FormUsuario.Telefono;
                        this.Usuario.PoliciaR.Correo=this.FormUsuario.Correo
                    }else{
                        this.$notification["error"]({
                            message: this.RetornarNombreCompleto(),
                            description: 'Cuenta no existe.'
                        });
                    }
                }
            });
        },
        EditarStatusSet(check){
            this.Editando=check;
        },
        RetornarNombreCompleto(){
            return this.Usuario.PoliciaR.Nombre+" "+this.Usuario.PoliciaR.Paterno+" "+this.Usuario.PoliciaR.Materno;
        },
        async GetUserAPI(){
            await this.$apollo.query({
                query: PerfilHeader,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta),
                    ID:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Usuario != null) {
                    this.Usuario=result.data.Usuario;
                    this.FormUsuario={
                        "Nombre":this.Usuario.PoliciaR.Nombre,
                        "Paterno":this.Usuario.PoliciaR.Paterno,
                        "Materno":this.Usuario.PoliciaR.Materno,
                        "Telefono":this.Usuario.PoliciaR.Telefono,
                        "Correo":this.Usuario.PoliciaR.Correo
                    };
                    this.RolesUser=this.Usuario.RangoUsuario;
                    this.cargando=false;
                }
            });
        },
    },
    created() {
        if (localStorage.id_cuenta == null) {
            this.$router.push("/");
        }
        if (localStorage.id_cuenta!=null) {
            this.GetUserAPI();
        }
    },
};
</script>