<template>
  <div class="login App">
    <div class="vertical-center">
      <div class="inner-block">
        <div class="vue-tempalte">
          <h3>Inicio de Sesión</h3>
          <div class="form-group">
            <label>Usuario</label>
            <input type="text" class="form-control form-control-lg" v-model="usuario" />
          </div>

          <div class="form-group mb-2">
            <label>Contraseña</label>
            <input type="password" v-on:keyup.13="event_enter" class="form-control form-control-lg" v-model="contra" />
          </div>

          <button type="submit" @click="validarLogin()" class="btn btn-dark btn-lg btn-block" >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import gql from "graphql-tag";
import {URL_APICHAVEZ} from "./../Configuracion";

export default {
  name: "login",
  components: {},
  data() {
    return {
      usuario: "",
      contra: "",
    };
  },
  methods: {
    event_enter(){
     this.validarLogin();
    },
    async validarLogin() {
      await this.$apollo
      .mutate({
        mutation: gql`
          mutation validacion_login(
            $Usuario: String!
            $Contra: String!
          ) {
            validacion_login(
              Usuario: $Usuario
              Contra: $Contra
            ) {
              estado
              id_cuenta
            }
          }
        `,
        variables: {
          Usuario: this.usuario,
          Contra: this.contra
        }
      })
      .then(result => {
        if (result.data.validacion_login != null) {
          if (result.data.validacion_login.id_cuenta) {
            localStorage.id_cuenta = result.data.validacion_login.id_cuenta;
            this.$router.push("/Inicio");
          }else{
            alert("NO");
          }
        }
      });
    },
  },
  created() {
    document.title = "Chavez | Login";
  },
  mounted() {
    if (localStorage.id_cuenta != null) {
      this.$router.push("/Inicio");
    } else {
      this.$router.push("/");
    }
  }
};
</script>
