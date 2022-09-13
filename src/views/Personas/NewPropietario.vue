<template>
    <div>
        <NuevoPropietario :current="current" @evento_siguiente="()=>next()" @evento_antes="()=>prev()" />
    </div>
</template>
<script>
import NuevoPropietario from './NuevoPropietario.vue';
export default {
    data() {
      return {
        current: 0,
      };
    },
    components:{NuevoPropietario},
    methods: {
      next() {
        this.current++;
      },
      prev() {
        this.current--;
      },
    },
    created(){
      if (localStorage.ID_REFERENCIA != null) {
        this.current = 2;
      }else{
        if (localStorage.ID_PROPIETARIO != null) {
          this.current = 1;
        }
      }
    }
};
</script>