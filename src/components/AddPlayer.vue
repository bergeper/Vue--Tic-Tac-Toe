<script setup lang="ts">
import { ref } from 'vue';

const player = ref('');

const playerSymbol = ref(['X', 'O']);

const emits = defineEmits(['addPlayer']);

const addPlayer = (newPlayer: string) => {
  emits('addPlayer', newPlayer);
  player.value = '';
};
</script>

<template>
  <form @submit.prevent="addPlayer(player)">
    <label>Spelare {{ playerSymbol }}: </label>
    <input placeholder="Playername" v-model="player" type="text" />
    <button type="submit">Add Player</button>
  </form>
</template>

<style scoped></style>
