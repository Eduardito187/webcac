<template>
  <div class="BarraCuenta">
    <div style="width:auto;height:50px;">
      <img
        :style="{
          width: ancho + 'px',
          height: ancho + 'px',
          display: 'inline-block',
          marginRight: '5px',
          borderRadius: ancho / 2 + 'px'
        }"
        :src="foto"
      />
      <h5
        @click="() => $emit('click_ev', true)"
        :style="{
          display: 'inline-block',
          marginRight: '5px',
          color: '#808080',
          fontWeight: 'bold'
        }"
      >
        {{ nombre }}
      </h5>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "BarraCuenta",
  data() {
    return {};
  },
  props: {
    foto: {
      type: String
    },
    nombre: {
      type: String
    },
    ancho: {
      type: Number
    },
    click: {
      type: Function
    }
  },
  async mounted() {
    if (localStorage != null) {
      if (localStorage.id_cuenta != null) {
        await this.$apollo
          .query({
            query: gql`
              query saber_permiso($Cuenta: Int!, $Code: String!) {
                saber_permiso(Cuenta: $Cuenta, Code: $Code) {
                  Respuesta
                }
              }
            `,
            variables: {
              Cuenta: parseInt(localStorage.id_cuenta),
              Code: "P58"
            },
            fetchPolicy: "network-only"
          })
          .then(result => {
            if (result.data.saber_permiso != null) {
              if (result.data.saber_permiso.Respuesta) {
              }
            }
          });
      }
    }
  },
  async created(){
  },
  beforeDestroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
