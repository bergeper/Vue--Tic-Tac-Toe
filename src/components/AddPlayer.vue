<script setup lang="ts">
import { ref } from 'vue';

const player = ref('');

const playerSymbol = ref('X');

const emits = defineEmits(['addPlayer']);

const addPlayer = (playerName: string) => {
  emits('addPlayer', playerName);
  playerSymbol.value = 'O';
  player.value = '';
};
</script>

<template>
  <form @submit.prevent="addPlayer(player)">
    <label>Spelare {{ playerSymbol }}: </label>
    <input
      class="playerInput"
      placeholder="Playername"
      v-model="player"
      type="text"
    />
    <button type="submit">Add Player</button>
  </form>
</template>

<style scoped>
.playerInput {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

label {
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
}
</style>
