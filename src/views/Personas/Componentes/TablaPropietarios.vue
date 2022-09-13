<template>
    <div class="TablaPropietarios">
        <a-row>
            <a-col :span="18" :style="{display:'flex'}">
                <Nuevo :URL="'/NewPropietario'" :Nombre="'Nuevo Propietario'" />
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
                    title: 'Documento',
                    dataIndex: 'CI',
                },
                {
                    title: 'Nombre',
                    dataIndex: 'Nombre',
                },
                {
                    title: 'Apellidos',
                    dataIndex: 'Apellido',
                },
                {
                    title: 'Telefono',
                    dataIndex: 'Telefono',
                },
                {
                    title: 'Direccion',
                    dataIndex: 'Direccion',
                    key: 'Direccion.ID+"_Referencias"',
                    customRender: (text, row, index) => {
                        let res = [];
                        if (text != null) {
                            if (text["Municipio"] != null) {
                                res.push(<a-tag>{text["Municipio"]["Nombre"]}</a-tag>);
                            }
                            if (text["Canton"] != null) {
                                res.push(<a-tag>{text["Canton"]["Canton"]}</a-tag>);
                            }
                            if (text["Zona"] != null) {
                                res.push(<a-tag>{text["Zona"]["Zona"]}</a-tag>);
                            }
                            if (text["Distrito"] != null) {
                                res.push(<a-tag>{text["Distrito"]["Distrito"]}</a-tag>);
                            }
                            if (text["Uv"] != null) {
                                res.push(<a-tag>{text["Uv"]["UV"]}</a-tag>);
                            }
                            if (text["Barrio"] != null) {
                                res.push(<a-tag>{text["Barrio"]["Barrio"]}</a-tag>);
                            }
                            if (text["Calle"] != null) {
                                res.push(<a-tag>{text["Calle"]}</a-tag>);
                            }
                            if (text["Casa"] != null) {
                                res.push(<a-tag>{text["Casa"]}</a-tag>);
                            }
                        }
                        return (res);
                    }
                },
                {
                    title: 'Referencias',
                    dataIndex: 'Referencias',
                    key: 'Referencias.ID+"_Referencias"',
                    customRender: (text, row, index) => {
                        let res = [];
                        if (text.length > 0) {
                            for (let i = 0; i < text.length; i++) {
                                if (text[i]["Referencia"] != null) {
                                    res.push(<a-tag>{text[i]["Referencia"]["CI"]+" : "+text[i]["Referencia"]["Nombre"]+" "+text[i]["Referencia"]["Apellido"]+" "+text[i]["Referencia"]["Telefono"]}</a-tag>);
                                }
                            }
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
            this.$router.push("/Propietario/"+ID);
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