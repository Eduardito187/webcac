<template>
  <div class="inicio columna">
    <div class="col-md-12" style="margin-top:60px;">
      <div class="columna">
        <div style="background-color:white;border-radius:3px;height:100vh;justify-content:center;align-items:center;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inicio",
  data() {
    return {
    };
  },
  components: {},
  methods: {
  },
  created() {
    document.title = "CAC | Inicio";
    if (localStorage.id_cuenta == null) {
      this.$router.push("/");
    }
  },
  mounted() {},
};
</script>
