<template>
<div class="title">
  <h3 v-if="title.isError" id="error">Error :3</h3>
  <h3 v-else>~~</h3>
</div>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue';
    const title = defineProps<{isError: boolean}>();
</script>
<style scoped>
.title h3 {
    border: solid 1px black;
}

#error {
    background-color: rgb(240, 102, 102);
}
</style>