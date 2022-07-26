<template>
  <div>
    <a-button type="primary" @click="showDrawer" style="margin-left:10px;" icon="branches" size="large">
      Nuevo Rol
    </a-button>
    <a-drawer title="Crear nuevo rol" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
      <a-row>
        <b-form-group label-cols-lg="12" label="Nuevo Rol" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0 col-md-12" >
          <div class="d-flex justify-content-between">
            <b-form-group class="col-md-12" label="Nombre" label-for="Nombre" label-cols-sm="12" label-align-sm="right" >
              <b-form-input id="Nombre" v-model="Nombre"></b-form-input>
            </b-form-group>
          </div>
          <div class="d-flex justify-content-between">
            <b-form-group class="col-md-12" label="Permisos:" label-for="Permisos" label-cols-sm="12" label-align-sm="right" >
              <SelectPermisos @ActualizacionPermisos="UpdatePermiso" />
            </b-form-group>
          </div>
        </b-form-group>
      </a-row>
      <div :style="{position: 'absolute',right: 0,bottom: 0,width: '100%',borderTop: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',textAlign: 'right',zIndex: 1}" >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancelar
        </a-button>
        <a-button v-if="Nombre.length>0 && Permisos.length>0" type="primary" @click="RegistrarPermisoDB()">
          Registrar Rol
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import SelectPermisos from './SelectPermisos.vue';
import {SetRangosCreate} from "./../../../gql/variables";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      Nombre:"",
      Permisos:[]
    };
  },
  components:{SelectPermisos},
  methods: {
    UpdatePermiso(item){
      this.Permisos=item;
    },
    LimpiarVariables(){
      this.Nombre="";
      this.Permisos=[];
    },
    async RegistrarPermisoDB() {
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
        await this.$apollo.mutate({mutation: SetRangosCreate,variables: {
          ID_CUENTA:parseInt(localStorage.id_cuenta),
          Nombre: this.Nombre,
          Permisos: this.Permisos
          }}).then(result => {
          if (result.data.SetRangos!=null) {
            if (result.data.SetRangos.response) {
              this.$notification["success"]({
                message: 'Permisos',
                description: "Rol registrado exitosamente."
              });
              this.onClose();
              this.LimpiarVariables();
              this.$emit('actualizar_roles',true);
            }else{
              this.$notification["error"]({
                message: 'Permisos',
                description: "Error al registrar."
              });
            }
          }
        });
      }
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  },
};
</script>
