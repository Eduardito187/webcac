<template>
    <div class="FotoCircular">
        <div style="width:auto;">
            <img :style="{width: ancho + 'px',height: ancho + 'px',borderRadius: ancho / 2 + 'px'}" :src="foto"/>
        </div>
    </div>
</template>
<script>
export default {
    name: "FotoCircular",
    props: {
        foto: {
            type: String
        },
        ancho: {
            type: Number
        }
    },
};
</script>