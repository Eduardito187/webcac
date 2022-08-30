
<template>
    <div>
        <div class="columna d-flex justify-content-center">
            <div class="col-md-12">
                <b-overlay :show="validacionR" rounded="sm">
                    <b-form-group label-cols-lg="12" label="Registro de Can" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0 col-md-12" >
                        <a-row>
                            <a-col :span="24">
                                <NewCanSteps />
                            </a-col>
                        </a-row>
                    </b-form-group>
                </b-overlay>
            </div>
        </div>
    </div>
</template>
<script>
import NewCanSteps from './Componentes/NewCanSteps.vue';
export default {
    data() {
        return {
            validacionR: false
        };
    },
    components:{ NewCanSteps },
    methods: {
    },
    async created() {
        if (localStorage.id_cuenta!=null) {
            this.validacionR = false;
        }
    }
};
</script>