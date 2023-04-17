<script setup lang="ts">
import { Player } from '../models/Player';

interface IGameOver {
  moves: number;
  win: boolean;
  tie: boolean;
}

interface IWinner {
  winner: string;
  isGameOver: IGameOver;
  players: Player[];
}

const winner = defineProps<IWinner>();
const emits = defineEmits(['newGame']);

const newGame = () => {
  const newGame = false;
  emits('newGame', newGame);
};
</script>

<template>
  <h2 v-if="winner.isGameOver.win">The winner is: {{ winner.winner }}!</h2>
  <h2 v-if="winner.isGameOver.tie">It's a tie! Play Again!</h2>
  <table>
    <tr>
      <th>{{ players[0].name }}</th>
      <th>{{ players[1].name }}</th>
    </tr>

    <tr>
      <td>{{ players[0].score }}</td>
      <td>{{ players[1].score }}</td>
    </tr>
  </table>
  <button @click="newGame">New Game</button>
</template>

<style scoped lang="scss"></style>
