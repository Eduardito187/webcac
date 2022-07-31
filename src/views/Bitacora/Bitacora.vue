<template>
    <div class="Bitacora">
        <a-spin :spinning="cargando">
        </a-spin>
    </div>
</template>
<script>
export default {
    name: "Bitacora",
    data() {
        return {
            cargando: true,
        }
    },
    components:{},
    methods:{
        AccederURL (a){
            this.$router.push(a);
        },
    },
    created() {
        if (localStorage.id_cuenta!=null) {
            //
            this.cargando=false;
        }
    },
};
</script>