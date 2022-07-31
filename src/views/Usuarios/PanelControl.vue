<template>
    <div class="MiPerfil">
        <a-spin :spinning="cargando">
            <div style="background: #ECECEC; padding: 30px">
                <a-row :gutter="16">
                    <a-col :span="6">
                        <a-card @click="AccederURL('Bitacora')">
                            <a-statistic title="Bitacora" :value="'Historial del sistema'" :value-style="{ color: '#3f8600'}" style="margin-right: 50px" >
                                <template #prefix>
                                    <a-icon type="history" />
                                </template>
                            </a-statistic>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </a-spin>
    </div>
</template>
<script>
export default {
    name: "PanelControl",
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