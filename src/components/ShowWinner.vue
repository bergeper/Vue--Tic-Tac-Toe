<script setup lang="ts">
import { Player } from '../models/Player';

interface IWinner {
  winner: Player;
}

const winner = defineProps<IWinner>();
</script>

<template>
  <h2>The winner is: {{ winner.winner.name }}!</h2>
  <button>New Game</button>
</template>

<style scoped lang="scss"></style>
