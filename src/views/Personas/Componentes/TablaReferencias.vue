<template>
    <div class="TablaReferencias">
        <a-row>
            <a-col :span="18" :style="{display:'flex'}">
                <Nuevo :URL="'/NewReferencia'" :Nombre="'Nueva Referencia'" :style="{display: 'inline-block'}" />
                <a-button @click="descargar()" :style="{display: 'inline-block',marginLeft:'10px'}" type="primary" shape="round" icon="download" :size="'large'" />
                    <b :style="{padding:'5px'}">Exportar Data</b>
                </a-button>
            </a-col>
            <a-col :span="6">
                <a-input-search placeholder="Buscador" style="width: 100%;" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row :style="{marginTop:'20px'}">
            <a-col :span="24">
                <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns" :data-source="Referencias" />
            </a-col>
        </a-row>
    </div>
</template>
<script>
import Nuevo from "./Nuevo.vue";
import { GetReferencias } from "../../../gql/variables";
export default {
    name: "TablaReferencias",
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
                    title: 'Propietarios',
                    dataIndex: 'Propietarios',
                    key: 'Propietarios.ID+"_Propietarios"',
                    customRender: (text, row, index) => {
                        let res = [];
                        if (text.length > 0) {
                            for (let i = 0; i < text.length; i++) {
                                if (text[i]["Propietario"] != null) {
                                    res.push(<a-tag>{text[i]["Propietario"]["CI"]+" : "+text[i]["Propietario"]["Nombre"]+" "+text[i]["Propietario"]["Apellido"]+" : "+text[i]["Propietario"]["Telefono"]}</a-tag>);
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
            Referencias: [],
            infor_d: []
        }
    },
    components:{Nuevo},
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },
    methods:{
        transformacion_data() {
            this.infor_d = [];
            for (let x = 0; x < this.Referencias.length; x++) {
            }
        },
        descargar() {
            const data = XLSX.utils.json_to_sheet(this.infor_d);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, data, "Reporte");
            let d = new Date();
            XLSX.writeFile(wb, d + ".xlsx");
        },
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
                query: GetReferencias,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Referencias != null) {
                    this.Referencias=result.data.Referencias;
                    this.transformacion_data();
                }
            });
        },
        AccionEdit(ID){
            this.$router.push("/Referencia/"+ID);
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