<script setup lang="ts">
import { ref } from 'vue';
import { Game } from '../models/Game';

interface IGame {
  index: number;
  game: Game;
}
const props = defineProps<IGame>();
const emits = defineEmits(['toggleSquare']);
const game = ref<IGame>(props);
</script>

<template>
  <div class="gameboard__square" @click.once="() => emits('toggleSquare')">
    {{ props.game.board[index] }}
  </div>
</template>

<style scoped>
.gameboard__square {
  width: 50px;
  height: 50px;
  font-size: 1.7rem;
  background-color: rgba(27, 27, 27, 0.584);
  border: 1px solid rgba(255, 255, 255, 0.555);
}
</style>
