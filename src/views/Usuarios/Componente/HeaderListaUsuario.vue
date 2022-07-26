<template>
    <div class="HeaderLista">
        <a-row>
            <a-col :span="18">
                <NewUser />
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
                    :data-source="Usuarios"
                    />
            </a-col>
        </a-row>
    </div>
</template>
<script>
import {GetUserList} from "./../../../gql/variables";
import FotoCircular from "./../../../components/FotoCircular.vue";
import RangosUser from "./../../../components/RangosUser.vue";
import NewUser from "./../Componente/NewUser.vue";
export default {
    name: "HeaderLista",
    data() {
        return {
            Usuarios:[],
            columns:[
                {
                    title: 'ID',
                    dataIndex: 'ID',
                },
                {
                    title: 'Perfil',
                    dataIndex: 'FotoR',
                    key: 'FotoR.ID+"_Foto"',
                    customRender: (text, row, index) => {
                        if (text!=null) {
                            return <FotoCircular foto={text.URL} ancho={50} />;
                        }else{
                            return null;
                        }
                    }
                },
                {
                    title: 'Nombre',
                    dataIndex: 'PoliciaR',
                    key: 'PoliciaR.ID+"_Nombre"',
                    customRender: (text, row, index) => {
                        if (text!=null) {
                            return <b>{text.Nombre+" "+text.Paterno+" "+text.Materno}</b>;
                        }else{
                            return null;
                        }
                    }
                },
                {
                    title: 'Jerarquia',
                    dataIndex: 'JerarquiaR.Grado',
                    key: 'PoliciaR.ID+"_JerarquiaR"'
                },
                {
                    title: 'Estado',
                    dataIndex: 'Estado',
                    key: 'ID+"_Estado"',
                    customRender: (text, row, index) => {
                        if (text) {
                            return (
                                <a-tag color={"green"}>
                                    Activado
                                </a-tag>
                            );
                        }else{
                            return (
                                <a-tag color={"red"}>
                                    Bloqueado
                                </a-tag>
                            );
                        }
                    }
                },
                {
                    title: 'Escalafon',
                    dataIndex: 'Escalafon',
                    key: 'Escalafon+"_Escalafon"',
                    customRender: (text, row, index) => {
                        return (
                            <a-tag color={"#108ee9"}>
                                {text}
                            </a-tag>
                        );
                    }
                },
                {
                    title: 'Correo Electronico',
                    dataIndex: 'PoliciaR.Correo',
                    key: 'PoliciaR.ID+"_Correo"'
                },
                {
                    title: 'CI',
                    dataIndex: 'PoliciaR.CI',
                    key: 'PoliciaR.ID+"_CI"'
                },
                {
                    title: 'Roles',
                    dataIndex: 'RangoUsuario',
                    key: 'ID+"_ListaRangos"',
                    customRender: (text, row, index) => {
                        return <RangosUser Rangos={text} />;
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
    components:{NewUser},
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
                query: GetUserList,
                variables:{
                    ID_CUENTA:parseInt(localStorage.id_cuenta)
                    },
                fetchPolicy: "network-only"
            }).then(result => {
                if (result.data.Usuarios != null) {
                    this.Usuarios=result.data.Usuarios;
                }
            });
        },
        AccionEdit(ID){
            this.$router.push("/VistaUsuario/"+ID);
        }
    },
    created() {
        this.GetUserAPI();
    },
};
</script>