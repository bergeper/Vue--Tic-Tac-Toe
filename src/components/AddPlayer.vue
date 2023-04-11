<script setup lang="ts">
import { ref } from 'vue';

const player = ref('');
const playerSymbol = ref(['X', 'O']);

const addPlayer = () => {
  emits('addPlayer', player);
  player.value = '';
};

const emits = defineEmits(['addPlayer']);
</script>

<template>
  <form @submit.prevent="addPlayer">
    <label>Spelare {{ playerSymbol }}: </label>
    <input placeholder="Playername" v-model="player" type="text" />
    <button type="submit">Add Player</button>
  </form>
</template>

<style scoped></style>
