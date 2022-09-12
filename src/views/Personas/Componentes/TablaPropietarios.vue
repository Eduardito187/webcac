<template>
    <div class="TablaPropietarios">
        <a-row>
            <a-col :span="18" :style="{display:'flex'}">
                <Nuevo :URL="'/NuevoPropietario'" :Nombre="'Nuevo Propietario'" />
            </a-col>
            <a-col :span="6">
                <a-input-search placeholder="Buscador" style="width: 100%;" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row :style="{marginTop:'20px'}">
            <a-col :span="24">
                <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns" :data-source="Propietarios" />
            </a-col>
        </a-row>
    </div>
</template>
<script>
import Nuevo from "./Nuevo.vue";
import { GetPropietarios } from "../../../gql/variables";
export default {
    name: "TablaPropietarios",
    data() {
        return {
            columns:[
                {
                    title: 'ID',
                    dataIndex: 'ID',
                },
                {
                    title: 'Tipo Documento',
                    dataIndex: 'TipoDocumento',
                    key: 'ID+"_Documento_Tipo"',
                    customRender: (text, row, index) => {
                        return (<b>{text.Tipo}</b>);
                    }
                },
                {
                    title: 'Datos Personales',
                    dataIndex: 'ID',
                },
                {
                    title: 'Direccion',
                    dataIndex: 'ID',
                },
                {
                    title: 'Referencias',
                    dataIndex: 'ID',
                }
            ],
            selectedRowKeys: [],
            loading: false,
            Propietarios: []
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
                query: GetPropietarios,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Propietarios != null) {
                    this.Propietarios=result.data.Propietarios;
                }
            });
        },
        AccionEdit(ID){
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