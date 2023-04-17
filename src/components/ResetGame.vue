<script setup lang="ts">
const emits = defineEmits(['resetGame']);
</script>

<template>
  <button @click="emits('resetGame')" class="resetBtn">Reset Game</button>
</template>

<style scoped lang="scss">
.resetBtn {
  padding: 10px;
  font-weight: 700;
  border: 2px solid black;
  border-radius: 10px 10px 10px 10px;
  margin: 2px 2px 2px 0px;
  background-color: rgb(255, 96, 96);
  &:hover {
    background-color: white;
  }
}
</style>
