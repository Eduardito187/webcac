<template>
    <div class="HeaderLista">
        <a-row>
            <a-col :span="18">
                <a-button type="primary" icon="user" size="large">
                    Nuevo Usuario
                </a-button>
                <a-button type="primary" style="margin-left:10px;" icon="branches" size="large">
                    Nuevo Rol
                </a-button>
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
                    :data-source="data"
                    />
            </a-col>
        </a-row>
    </div>
</template>
<script>
const columns = [
  {
    title: 'Grado',
    dataIndex: 'Grado',
  },
  {
    title: 'Nombre',
    dataIndex: 'Nombre',
  },
  {
    title: 'Apellidos',
    dataIndex: 'Apellidos',
  },
  {
    title: 'Escalafon',
    dataIndex: 'Escalafon',
  },
  {
    title: 'Telefono',
    dataIndex: 'Telefono',
  },
  {
    title: 'Rango',
    dataIndex: 'Rango',
  },
  {
    title: 'Estado',
    dataIndex: 'Estado',
  }
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
import gql from "graphql-tag";
export default {
    name: "HeaderLista",
    data() {
        return {
            data,
            columns,
            selectedRowKeys: [],
            loading: false,
        }
    },
    components:{},
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
    },
    created() {
    },
};
</script>
</script>