<script setup lang="ts">
import ShowScore from './ShowScore.vue';
import AddPlayer from './AddPlayer.vue';
import { Player } from '../models/Player';
import { ref } from 'vue';
import GameBoard from './GameBoard.vue';

// showGame blir true om man hämtar data från localstorage och det finns två spelare
const players = ref<Player[]>(
  JSON.parse(localStorage.getItem('players') || '[]')
);

let showGame = false;
let showInput = true;

const addPlayer = (playerName: string) => {
  let id = 1;
  if (players.value.length === 0) {
    players.value.push(new Player(id, playerName, 0));
    savePlayerInLS(players.value);
  } else {
    id++;
    players.value.push(new Player(id, playerName, 0));
    savePlayerInLS(players.value);
  }
};

const savePlayerInLS = (boys: Player[]) => {
  localStorage.setItem('players', JSON.stringify(boys));
};

// defineProps;
</script>

<template>
  <AddPlayer @add-player="addPlayer" v-if="showInput"></AddPlayer>
  <GameBoard v-if="showGame"></GameBoard>
  <!-- Samma ska här ? -->
  <ShowScore></ShowScore>
</template>
<style scoped></style>
