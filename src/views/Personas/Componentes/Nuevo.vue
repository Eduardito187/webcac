<template>
  <div>
    <a-button type="primary" @click="accionNewData()" style="margin-left:10px;" icon="branches" size="large">
        Nuevo
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
  components:{},
  methods: {
    accionNewData() {
    }
  },
};
</script>
