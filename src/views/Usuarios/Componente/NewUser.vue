<template>
  <div>
    <a-button type="primary" @click="showDrawer" style="margin-left:10px;" icon="branches" size="large">
        Nuevo Usuario
    </a-button>
    <a-drawer title="Crear nuevo usuario" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Nombre" label-for="Nombre" label-cols-sm="12" label-align-sm="right" >
                  <b-form-input v-model="FormUsuario.Nombre" id="Nombre"></b-form-input>
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Apellido Paterno" label-for="Apellido Paterno" label-cols-sm="12" label-align-sm="right" >
                  <b-form-input v-model="FormUsuario.Paterno" id="Paterno"></b-form-input>
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Apellido Materno" label-for="Apellido Materno" label-cols-sm="12" label-align-sm="right" >
                  <b-form-input v-model="FormUsuario.Materno" id="Materno"></b-form-input>
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Telefono" label-for="Telefono" label-cols-sm="12" label-align-sm="right" >
                  <b-form-input v-model="FormUsuario.Telefono" id="Telefono"></b-form-input>
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Correo" label-for="Correo" label-cols-sm="12" label-align-sm="right" >
                  <b-form-input v-model="FormUsuario.Correo" id="Correo"></b-form-input>
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Usuario" label-for="Usuario" label-cols-sm="12" label-align-sm="right" >
                  <b-form-input v-model="FormUsuario.Usuario" id="Usuario"></b-form-input>
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="CI" label-for="CI" label-cols-sm="12" label-align-sm="right" >
                  <b-form-input v-model="FormUsuario.CI" id="CI"></b-form-input>
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Fecha de nacimiento" label-cols-sm="12" label-align-sm="right" >
                <input type="date" class="form-control form-control-lg" v-model="FormUsuario.Nacimiento" />
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Password" label-for="Password" label-cols-sm="12" label-align-sm="right" >
                <input type="password" class="form-control form-control-lg" v-model="FormUsuario.Password" />
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Escalafon" label-for="Escalafon" label-cols-sm="12" label-align-sm="right" >
                <b-form-input v-model="FormUsuario.Escalafon" id="Escalafon"></b-form-input>
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Grado" label-for="Grado" label-cols-sm="12" label-align-sm="right" >
                <ActualizarRangoPoli @Jerarquia_Update="JerarquiaActualizada($event)" :Grado="''" />
              </b-form-group>
          </a-col>
          <a-col :span="12">
              <b-form-group class="col-md-11" label="Roles" label-for="Roles" label-cols-sm="12" label-align-sm="right" >
                <SelectRoles @ActualizacionRoles="ActualizarRoles($event)" :RolesUser="[]" />
              </b-form-group>
          </a-col>
        </a-row>
      </a-form>
      <div :style="{position: 'absolute',right: 0,bottom: 0,width: '100%',borderTop: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',textAlign: 'right',zIndex: 1}" >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button>
        <a-button type="primary" v-if="FormUsuario.Nacimiento.length>0 && FormUsuario.Roles.length>0 && FormUsuario.Escalafon.length>0 && FormUsuario.Nombre.length>0 && FormUsuario.Paterno.length>0 
        && FormUsuario.Materno.length>0 && FormUsuario.Telefono.length>0 && FormUsuario.Correo.length>0 && FormUsuario.Usuario.length>0 && FormUsuario.Password.length>0" @click="RegistrarUsuario()">
          Registrar Usuario
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import ActualizarRangoPoli from "./ActualizarRangoPoli.vue";
import SelectRoles from "../../Roles/Componente/SelectRoles.vue";
import {CreateUsuarioAPI} from "./../../../gql/variables";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      FormUsuario:{
        "Escalafon":"",
        "Nombre":"",
        "Paterno":"",
        "Materno":"",
        "Telefono":"",
        "CI":"",
        "Correo":"",
        "Usuario":"",
        "Password":"",
        "IDGrado":"",
        "Grado":"",
        "Nacimiento":"",
        "Roles":[]
      }
    };
  },
  components:{ActualizarRangoPoli,SelectRoles},
  methods: {
    async RegistrarUsuario(){
      await this.$apollo.mutate({
        mutation: CreateUsuarioAPI,
        variables:{
          ID_CUENTA:parseInt(localStorage.id_cuenta),
          Escalafon:this.FormUsuario.Escalafon,
          Nombre:this.FormUsuario.Nombre,
          Paterno:this.FormUsuario.Paterno,
          Materno:this.FormUsuario.Materno,
          Telefono:this.FormUsuario.Telefono,
          CI:this.FormUsuario.CI,
          Correo:this.FormUsuario.Correo,
          Usuario:this.FormUsuario.Usuario,
          Pwd:this.FormUsuario.Password,
          Jerarquia:parseInt(this.FormUsuario.IDGrado),
          Nacimiento:this.FormUsuario.Nacimiento,
          Roles:this.FormUsuario.Roles
        }
      }).then(result => {
        if (result.data.CreateUsuario != null) {
          if (result.data.CreateUsuario.response) {
            this.$notification["success"]({
              message: 'CAC',
              description: 'Cuenta registrada exitosamente.'
            });
            this.$emit('Nuevo_UsuarioAPI',true);
          }else{
            this.$notification["error"]({
              message: 'CAC',
              description: 'Cuenta no existe.'
            });
          }
        }
      });
    },
    async ActualizarRoles(obj){
      if (obj.length>0) {
        this.FormUsuario.Roles=obj;
      }
    },
    JerarquiaActualizada(data){
      if (data!=null) {
        this.FormUsuario.IDGrado=data.ID;
        this.FormUsuario.Grado=data.Grado;
      }
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
