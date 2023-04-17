<script setup lang="ts">
const emits = defineEmits(['resetGame']);
</script>

<template>
  <button @click="emits('resetGame')">Reset Game</button>
</template>

<style scoped lang="scss"></style>
