<script setup lang="ts">
import { Player } from '../models/Player';

interface IWinner {
  winner: Player;
}

const winner = defineProps<IWinner>();
const emits = defineEmits(['newGame']);

const newGame = () => {
  const newGame = false;
  emits('newGame', newGame);
};
</script>

<template>
  <h2>The winner is: {{ winner.winner.name }}!</h2>
  <button @click="newGame">New Game</button>
</template>

<style scoped lang="scss"></style>
