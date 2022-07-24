<template>
    <div class="ListaRol">
        <a-row>
            <a-col :span="18">
                <NewRol />
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
                    <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    :columns="columns"
                    :data-source="roles"
                    />
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
            roles:[],
            columns:[
                {
                    title: 'ID',
                    dataIndex: 'ID',
                },
                {
                    title: 'Rango',
                    dataIndex: 'Rango',
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
    components:{NewRol},
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
            alert(ID);
        }
    },
    created() {
        this.GetRolesAPI();
    },
};
</script>