<script setup lang="ts">
import { ref } from 'vue';
import { Gameboard } from '../models/Gameboard';

interface IGame {
  board: number;
  player: number;
}
const props = defineProps<IGame>();
const emits = defineEmits(['toggleSquare']);
const game = ref<IGame>(props);
</script>

<template>
  <div
    class="gameboard__square"
    @click.once="() => emits('toggleSquare')"
    :class="game.player === 1 ? 'X' : '' || game.player === 2 ? 'O' : ''"
  ></div>
</template>

<style scoped>
.gameboard__square {
  width: 50px;
  height: 50px;
  background-color: red;
  border: 1px solid white;
}
</style>
