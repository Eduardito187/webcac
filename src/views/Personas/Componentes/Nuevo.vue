<template>
  <div>
    <a-button type="primary" @click="accionNewData()" :style="{display:'inline-block',marginLeft:'10px'}" icon="branches" size="large">
      {{Nombre}}
    </a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
    };
  },
  props: {
    URL: {
      type: String,
      default: String
    },
    Nombre: {
      type: String,
      default: String
    }
  },
  components:{},
  methods: {
    accionNewData() {
      this.$router.push(this.URL);
    }
  },
};
</script>
