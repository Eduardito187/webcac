<template>
    <div>
        <NuevaReferencia :current="current" @evento_siguiente="()=>next()" @evento_antes="()=>prev()" />
    </div>
</template>
<script>
import NuevaReferencia from './NuevaReferencia.vue';
export default {
    data() {
        return {
            current: 0,
        };
    },
    components:{NuevaReferencia},
    methods: {
        next() {
            this.current++;
        },
        prev() {
            this.current--;
        },
    },
    created(){
    }
};
</script>