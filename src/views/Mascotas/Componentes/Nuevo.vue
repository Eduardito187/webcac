<template>
    <div>
        <a-button type="primary" @click="AccederURL('/NuevaMascota')" style="margin-left:10px;" icon="branches" size="large">
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
        AccederURL (a){
            this.$router.push(a);
        },
        accionNewData() {
        }
    },
};
</script>
