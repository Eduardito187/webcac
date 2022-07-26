<template>
    <div class="RangosUser">
        <div style="width:auto;">
            <template v-for="i in Rangos">
                <a-tag color="#000">
                    {{i.Rango.Rango}}
                </a-tag>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: "RangosUser",
    props: {
        Rangos: {
            type: Array
        }
    },
};
</script>