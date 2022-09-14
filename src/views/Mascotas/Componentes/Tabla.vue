<template>
    <div class="Tabla">
        <a-row>
            <a-col :span="18">
                <Nuevo :URL="'/NewMascota'" :Nombre="'Nueva Mascota'" :style="{display: 'inline-block'}" />
                <Nuevo :URL="'/NuevaMascota'" :Nombre="'Registro Simple'" :style="{display: 'inline-block'}" />
                <a-button @click="descargar()" :style="{display: 'inline-block',marginLeft:'10px'}" type="primary" shape="round" icon="download" :size="'large'" />
                    <b :style="{padding:'5px'}">Exportar Data</b>
                </a-button>
                <a-button @click="showDrawer()" :style="{display: 'inline-block',marginLeft:'10px'}" type="primary" shape="round" icon="file-pdf" :size="'large'" />
                    <b :style="{padding:'5px'}">PDF</b>
                </a-button>
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

        <a-drawer title="Visualizador PDF" width="720" :closable="true" :visible="visible" @close="onClose" >
            <template>
                <div>
                    <VueHtml2pdf :show-layout="false" :float-layout="false" :enable-download="true" :preview-modal="false" :paginate-elements-by-height="1400" filename="myPDF" :pdf-quality="2" :manual-pagination="false" pdf-format="a4" pdf-orientation="landscape" pdf-content-width="720px" ref="html2Pdf" >
                        <section slot="pdf-content">
                            <h1>HOLA</h1>
                        </section>
                    </VueHtml2pdf>
                </div>
            </template>
            <div :style="{position: 'absolute',bottom: 0,width: '100%',borderTop: '1px solid #e8e8e8',padding: '10px 16px',textAlign: 'right',left: 0,background: '#fff',borderRadius: '0 0 4px 4px',}">
                <a-button type="success" @click="generateReport()">
                    Descargar
                </a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import Nuevo from "./../../Personas/Componentes/Nuevo.vue";
import { GetCanes } from "../../../gql/variables";
import VueHtml2pdf from 'vue-html2pdf';
import XLSX from "xlsx";
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
                            res.push(<a-tag>{text.CI+" : "+text.Nombre+" "+text.Apellido+" : "+text.Telefono}</a-tag>);
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
            infor_d: [],
            visible: false
        }
    },
    components:{Nuevo,VueHtml2pdf},
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },
    methods:{
        generateReport () {
            this.$refs.html2Pdf.generatePdf();
            this.onClose();
        },
        showDrawer() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
        },
        transformacion_data() {
            this.infor_d = [];
            for (let x = 0; x < this.DatosTabla.length; x++) {
                let raza = "";
                if (this.DatosTabla[x]["Raza"] != null) {
                    raza = this.DatosTabla[x]["Raza"]["Nombre"];
                }
                let tamanho = "";
                if (this.DatosTabla[x]["Tamanho"] != null) {
                    tamanho = this.DatosTabla[x]["Tamanho"]["Tamanho"];
                }
                let sexo = "";
                if (this.DatosTabla[x]["Sexo"] != null) {
                    sexo = this.DatosTabla[x]["Sexo"]["Sexo"];
                }
                let Propietario_ID = "";
                let Propietario_Nombre = "";
                let Propietario_CI = "";
                let Propietario_Telefono = "";
                if (this.DatosTabla[x]["Propietario"] != null) {
                    Propietario_CI = this.DatosTabla[x]["Propietario"]["CI"];
                    Propietario_Nombre = this.DatosTabla[x]["Propietario"]["Nombre"]+" "+this.DatosTabla[x]["Propietario"]["Apellido"];
                    Propietario_ID = this.DatosTabla[x]["Propietario"]["ID"];
                    Propietario_Telefono = this.DatosTabla[x]["Propietario"]["Telefono"];
                }
                this.infor_d.push({
                    "ID" : this.DatosTabla[x]["ID"],
                    "Nombre" : this.DatosTabla[x]["Nombre"],
                    "Chip" : this.DatosTabla[x]["Chip"],
                    "Anho" : this.DatosTabla[x]["Anho"],
                    "Meses" : this.DatosTabla[x]["Meses"],
                    "Raza" : raza,
                    "Tamanho" : tamanho,
                    "Sexo" : sexo,
                    "Propietario_ID" : Propietario_ID,
                    "Propietario_Nombre" : Propietario_Nombre,
                    "Propietario_CI" : Propietario_CI,
                    "Propietario_Telefono" : Propietario_Telefono
                });
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
                query: GetCanes,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Canes != null) {
                    this.DatosTabla=result.data.Canes;
                    this.transformacion_data();
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