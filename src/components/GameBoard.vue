<script setup lang="ts">
import { ref } from 'vue';
import { Game } from '../models/Game';

interface IGame {
  index: number;
  game: Game;
}
const props = defineProps<IGame>();
const emits = defineEmits([
  'changePlayer',
  'markSquare',
  'checkForWin',
  'winningCombo',
  'checkForTie',
]);
</script>

<template>
  <div
    class="gameboard__square"
    @click.once="
      emits('markSquare'),
        emits('checkForWin'),
        emits('winningCombo'),
        emits('changePlayer');
      emits('checkForTie');
    "
  >
    {{ props.game.board[index] }}
  </div>
</template>

<style scoped lang="scss">
.gameboard__square {
  width: 50px;
  height: 50px;
  font-size: 1.7rem;
  background-color: rgba(251, 251, 251, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.555);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
