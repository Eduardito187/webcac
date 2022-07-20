<template>
    <div class="VistaUsuario">
        <a-row>
            <a-col :span="6" :style="{padding:'10px'}">
                <a-card title="Estado" :bordered="false" style="width: 100%;">
                    <a-switch default-checked @change="onChange" />
                </a-card>
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
        </a-row>
    </div>
</template>
<script>
import gql from "graphql-tag";
export default {
    name: "VistaUsuario",
    data() {
        return {
        }
    },
    components:{},
    methods:{
        onChange(checked) {
            console.log(`a-switch to ${checked}`);
        },
    },
    created() {
    },
};
</script>
</script>