<template>
    <div>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
          <NuevoPropietario v-if="current == 0" />
          <NuevaReferencia v-else-if="current == 1" />
          <NuevoCan v-else />
      </div>
      <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
        <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">Done</a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
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