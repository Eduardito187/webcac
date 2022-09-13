<template>
    <div>
        <NuevoCan :current="current" @evento_siguiente="()=>next()" @evento_antes="()=>prev()"/>
    </div>
</template>
<script>
import NuevoCan from './NuevoCan.vue';
export default {
    data() {
      return {
        current: 0
      };
    },
    components:{NuevoCan},
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