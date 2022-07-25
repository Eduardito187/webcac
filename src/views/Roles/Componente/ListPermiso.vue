<template>
  <div>
    <a-button type="primary" @click="showDrawer" style="margin-left:10px;" icon="branches" size="large">
        Lista Permisos
    </a-button>
    <a-drawer title="Permisos" :width="400" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
        <a-row>
            <a-table :columns="columns" :data-source="Permisos" >
                <div slot="filterDropdown" slot-scope="{setSelectedKeys,selectedKeys,confirm,clearFilters,column}" style="padding: 8px" >
                    <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`Filtrar por ${column.dataIndex}`" :value="selectedKeys[0]" style="width: 188px; margin-bottom: 8px; display: block;" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)" />
                    <a-button type="primary" icon="search" size="small" style="width: 90px; margin-right: 8px" @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)" >Buscar</a-button>
                    <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)" >Limpiar</a-button>
                </div>
                <a-icon slot="filterIcon" slot-scope="filtered" type="search" :style="{ color: filtered ? '#108ee9' : undefined }" />
                <template slot="customRender" slot-scope="text, record, index, column">
                    <span v-if="searchText && searchedColumn === column.dataIndex">
                        <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))" >
                            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{ fragment }}</mark>
                            <template v-else>{{ fragment }}</template>
                        </template>
                    </span>
                    <template v-else>{{ text }}</template>
                </template>
            </a-table>
        </a-row>
        <div :style="{position: 'absolute',right: 0,bottom: 0,width: '100%',borderTop: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',textAlign: 'right',zIndex: 1}" >
            <a-button :style="{ marginRight: '8px' }" @click="onClose">
                Cerrar
            </a-button>
        </div>
    </a-drawer>
  </div>
</template>
<script>
import {GetPermisos} from "./../../../gql/variables";
export default {
    data() {
        return {
            searchText: "",
            searchInput: null,
            searchedColumn: "",
            visible: false,
            Permisos:[],
            columns:[
                {
                    title: 'ID',
                    dataIndex: 'ID',
                    key: 'ID+"_ID"'
                },
                {
                    title: 'Permiso',
                    dataIndex: 'Permiso',
                    key: 'ID+"_Permiso"',
                    scopedSlots: {
                        filterDropdown: "filterDropdown",
                        filterIcon: "filterIcon",
                        customRender: "customRender"
                    },
                    onFilter: (value, record) => record.Permiso.toString().toLowerCase().includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            });
                        }
                    }
                }
            ],
        };
    },
    props: {
        FechaUpdate: {
            type: Number
        }
    },
    watch: {
        FechaUpdate: {
            immediate: true,
            handler(val, oldVal) {
                //nuevo--anterior
                if (val != null && oldVal != null) {
                    if (val != oldVal) {
                        this.GetPermisosAPI();
                    }
                }
            }
        }
    },
    methods: {
        handleSearch(selectedKeys, confirm, dataIndex) {
            confirm();
            this.searchText = selectedKeys[0];
            this.searchedColumn = dataIndex;
        },
        handleReset(clearFilters) {
            clearFilters();
            this.searchText = "";
        },
        showDrawer() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
        },
        async GetPermisosAPI(){
            await this.$apollo.query({
                query: GetPermisos,
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Permisos != null) {
                    this.Permisos=result.data.Permisos;
                }
            });
        }
    },
    created(){
        this.GetPermisosAPI();
    }
};
</script>