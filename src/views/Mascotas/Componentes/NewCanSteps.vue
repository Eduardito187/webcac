<template>
    <div>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
          <NuevoPropietario :current="current" @evento_siguiente="()=>next()" @evento_antes="()=>prev()" v-if="current == 0" />
          <NuevaReferencia :current="current" @evento_siguiente="()=>next()" @evento_antes="()=>prev()" v-else-if="current == 1" />
          <NuevoCan :current="current" @evento_siguiente="()=>next()" @evento_antes="()=>prev()" v-else />
      </div>
    </div>
</template>
<script>
import NuevoCan from './NuevoCan.vue';
import NuevaReferencia from '../../Personas/NuevaReferencia.vue';
import NuevoPropietario from '../../Personas/NuevoPropietario.vue';
export default {
    data() {
      return {
        current: 0,
        steps: [
          {
            title: 'Propietario',
            content: 'Propietario',
          },
          {
            title: 'Referencia',
            content: 'Referencia-content',
          },
          {
            title: 'Can',
            content: 'CAN',
          },
        ],
      };
    },
    components:{NuevoCan,NuevaReferencia,NuevoPropietario},
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
  <style scoped>
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  
  .steps-action {
    margin-top: 24px;
  }
  </style>