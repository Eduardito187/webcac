<template>
    <div class="Bitacora">
        <a-spin :spinning="cargando">
            <a-card :title="Bitacora.Actividad.Actividad" :bordered="true" style="width: 300px">
                <span>{{Bitacora.Glosa}}</span>
                <a-card hoverable style="width: 100%">
                    <img slot="cover" alt="example" :src="Bitacora.Usuario.FotoR.URL" />
                    <a-card-meta :title="RetornarNombreCompleto()">
                        <template slot="description">
                            {{RetornarInfoCuenta()}}
                        </template>
                    </a-card-meta>
                </a-card>
            </a-card>
        </a-spin>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cargando: true,
        }
    },
    components:{},
    props:{
        Bitacora:{
            type: Object,
            default: Object
        }
    },
    methods:{
        AccederURL (a){
            this.$router.push(a);
        },
        RetornarNombreCompleto(){
            return this.Bitacora.Usuario.PoliciaR.Nombre+" "+this.Bitacora.Usuario.PoliciaR.Paterno+" "+this.Bitacora.Usuario.PoliciaR.Materno;
        },
        RetornarInfoCuenta(){
            return this.Bitacora.Usuario.Escalafon+" - "+this.Bitacora.Usuario.JerarquiaR.Grado;
        }
    },
    created() {
        if (localStorage.id_cuenta!=null) {
            this.cargando=false;
        }
    },
};
</script>