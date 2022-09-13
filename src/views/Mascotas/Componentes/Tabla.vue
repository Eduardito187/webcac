<template>
    <div class="Tabla">
        <a-row>
            <a-col :span="18">
                <Nuevo :URL="'/NewMascota'" :Nombre="'Nueva Mascota'" />
            </a-col>
            <a-col :span="6">
                <a-input-search placeholder="Buscador" style="width: 100%;" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row :style="{marginTop:'20px'}">
            <a-col :span="24">
                <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns" :data-source="DatosTabla" />
            </a-col>
        </a-row>
    </div>
</template>
<script>
import Nuevo from "./../../Personas/Componentes/Nuevo.vue";
import { GetCanes } from "../../../gql/variables";
export default {
    name: "Tabla",
    data() {
        return {
            DatosTabla:[],
            columns:[
                {
                    title: 'ID',
                    dataIndex: 'ID',
                },
                {
                    title: 'Nombre',
                    dataIndex: 'Nombre',
                },
                {
                    title: 'Meses',
                    dataIndex: 'Meses',
                },
                {
                    title: 'Anho',
                    dataIndex: 'Anho',
                },
                {
                    title: 'Color',
                    dataIndex: 'Color',
                },
                {
                    title: 'Chip',
                    dataIndex: 'Chip',
                },
                {
                    title: 'Tatuaje',
                    dataIndex: 'Tatuaje',
                },
                {
                    title: 'Raza',
                    dataIndex: 'Raza',
                    key: 'Raza.ID+"_Raza"',
                    customRender: (text, row, index) => {
                        let res = [];
                        if (text != null) {
                            res.push(<a-tag>{text.Nombre}</a-tag>);
                        }
                        return (res);
                    }
                },
                {
                    title: 'Tamanho',
                    dataIndex: 'Tamanho',
                    key: 'Tamanho.ID+"_Tamanho"',
                    customRender: (text, row, index) => {
                        let res = [];
                        if (text != null) {
                            res.push(<a-tag>{text.Tamanho}</a-tag>);
                        }
                        return (res);
                    }
                },
                {
                    title: 'Sexo',
                    dataIndex: 'Sexo',
                    key: 'Sexo.ID+"_Sexo"',
                    customRender: (text, row, index) => {
                        let res = [];
                        if (text != null) {
                            res.push(<a-tag>{text.Sexo}</a-tag>);
                        }
                        return (res);
                    }
                },
                {
                    title: 'Propietario',
                    dataIndex: 'Propietario',
                    key: 'Propietario.ID+"Propietario"',
                    customRender: (text, row, index) => {
                        let res = [];
                        if (text != null) {
                            res.push(<a-tag>{text.CI+" : "+text.Nombre+" "+text.Apellido+" "+text.Telefono}</a-tag>);
                        }
                        return (res);
                    }
                },
                {
                    title: 'Accion',
                    dataIndex: 'ID',
                    key: 'ID+"p"',
                    customRender: (text, row, index) => {
                        return (
                            <a-button type="primary" icon="edit" onClick={()=>this.AccionEdit(text)}>
                                Editar
                            </a-button>
                        );
                    }
                }
            ],
            selectedRowKeys: [],
            loading: false,
        }
    },
    components:{Nuevo},
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },
    methods:{
        onSearch(value) {
            console.log(value);
        },
        start() {
            this.loading = true;
            // ajax request after empty completing
            setTimeout(() => {
                this.loading = false;
                this.selectedRowKeys = [];
            }, 1000);
        },
        onSelectChange(selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        async GetUserAPI(){
            await this.$apollo.query({
                query: GetCanes,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Canes != null) {
                    this.DatosTabla=result.data.Canes;
                }
            });
        },
        AccionEdit(ID){
            this.$router.push("/Can/"+ID);
        },
        UpdateAPINEW(a){
            if (a) {
                this.GetUserAPI();
            }
        }
    },
    created() {
        this.GetUserAPI();
    },
};
</script>