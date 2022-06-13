<template>
  <div id="app" class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top" >
      <div class="container">
        <router-link class="navbar-brand float-left" to="/">CAC</router-link>
        <ul v-if="id_cuenta != 0" class="nav navbar-nav flex-row float-right">
          <ApolloQuery :query="consulta" :variables="{ id: id_cuenta }">
            <template v-slot="{ result: { loading, data } }">
              <div v-if="data">
                <li class="nav-item pointer">
                  <BarraCuenta
                    v-if="loading == false && data.cuenta != null"
                    @click_ev="showDrawer"
                    :nombre="data.cuenta.nombre"
                    :foto="data.cuenta.foto"
                    :ancho="50"
                  />
                </li>
              </div>
            </template>
          </ApolloQuery>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <router-view />
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import BarraCuenta from "./components/BarraCuenta.vue";
export default {
  title: "Chavez | APP",
  data() {
    return {
      id_cuenta: 0,
      consulta: gql`
        query cuenta($id: String!) {
          cuenta(ID: $id) {
            foto
            nombre
          }
        }
      `,
      visible: false
    };
  },
  components: {
    BarraCuenta,
  },
  created() {
    if (localStorage.id_cuenta != null) {
      this.id_cuenta = localStorage.id_cuenta;
    } else {
      this.id_cuenta = 0;
    }
  },
  updated() {
    if (localStorage.id_cuenta != null) {
      this.id_cuenta = localStorage.id_cuenta;
    } else {
      this.id_cuenta = 0;
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.scroll::-webkit-scrollbar {
    width: 12px;
}

.scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}

.scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
</style>
