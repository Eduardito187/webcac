<template>
    <div class="ListaRol">
        <a-row :style="{marginBottom:'10px'}">
            <a-col :span="24">
                <NewRol @actualizar_roles="UpdateRol" />
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24">
                <a-table :columns="columns" :data-source="roles" >
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
            </a-col>
        </a-row>
    </div>
</template>
<script>
import {GetRoles} from "./../../../gql/variables";
import NewRol from "./NewRol.vue";
export default {
    name: "ListaRol",
    data() {
        return {
            searchText: "",
            searchInput: null,
            searchedColumn: "",
            roles:[],
            columns:[
                {
                    title: 'ID',
                    dataIndex: 'ID',
                    key: 'ID+"_ID"'
                },
                {
                    title: 'Rango',
                    dataIndex: 'Rango',
                    key: 'ID+"_Rango"',
                    scopedSlots: {
                        filterDropdown: "filterDropdown",
                        filterIcon: "filterIcon",
                        customRender: "customRender"
                    },
                    onFilter: (value, record) => record.Rango.toString().toLowerCase().includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            });
                        }
                    }
                },
                {
                    title: 'Accion',
                    dataIndex: 'ID',
                    key: 'ID+"_Accion"',
                    customRender: (text, row, index) => {
                        return (
                            <a-button type="primary" icon="edit" onClick={()=>this.AccionEdit(text)}>
                                Editar
                            </a-button>
                        );
                    }
                }
            ]
        }
    },
    components:{NewRol},
    methods:{
        handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
        },
        handleReset(clearFilters) {
        clearFilters();
        this.searchText = "";
        },
        UpdateRol(a){
            if (a) {
                this.GetRolesAPI();
            }
        },
        async GetRolesAPI(){
            await this.$apollo.query({
                query: GetRoles,
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Rangos != null) {
                    this.roles=result.data.Rangos;
                }
            });
        },
        AccionEdit(ID){
            this.$router.push("/VistaRol/"+ID);
        }
    },
    created() {
        this.GetRolesAPI();
    },
};
</script>