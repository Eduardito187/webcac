<template>
    <div class="Tabla">
        <a-row>
            <a-col :span="18" :style="{display:'flex'}">
                <Nuevo :URL="'/NuevaReferencia'" :Nombre="'Nueva Referencia'" />
                <Nuevo :URL="'/NuevoPropietario'" :Nombre="'Nuevo Propietario'" />
            </a-col>
            <a-col :span="6">
                <a-input-search placeholder="Buscador" style="width: 100%;" @search="onSearch" />
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24">
                <div style="margin-bottom: 16px;margin-top: 16px;">
                    <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
                        Reload
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected">
                        {{ `Selected ${selectedRowKeys.length} items` }}
                        </template>
                    </span>
                </div>
                    <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns" :data-source="DatosTabla" />
            </a-col>
        </a-row>
    </div>
</template>
<script>
import Nuevo from "./Nuevo.vue";
export default {
    name: "Tabla",
    data() {
        return {
            DatosTabla:[],
            columns:[
                {
                    title: 'ID',
                    dataIndex: 'ID',
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