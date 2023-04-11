<script setup lang="ts">
import ShowScore from './ShowScore.vue';
import AddPlayer from './AddPlayer.vue';
import { Player } from '../models/Player';
import { ref } from 'vue';
import GameBoard from './GameBoard.vue';
import { getFromLocalStorage } from '../helpers/getPlayersFromLS';
import { savePlayerInLS } from '../helpers/saveToLS';

const playersFromLS = getFromLocalStorage();
const players = ref<Player[]>(playersFromLS);
const showContent = ref({ showGame: false, showInput: true });

const addPlayer = (playerName: string) => {
  let id = 1;
  if (players.value.length <= 1) {
    if (players.value.length === 0) {
      players.value.push(new Player(id, playerName, 0));
      savePlayerInLS(players.value);
    } else {
      id++;
      players.value.push(new Player(id, playerName, 0));
      savePlayerInLS(players.value);
      showContent.value.showGame = true;
      showContent.value.showInput = false;
    }
  }
};

if (players.value.length === 2) {
  showContent.value.showGame = true;
  showContent.value.showInput = false;
}
</script>

<template>
  <AddPlayer @add-player="addPlayer" v-if="showContent.showInput"></AddPlayer>
  <GameBoard v-if="showContent.showGame"></GameBoard>
  <ShowScore></ShowScore>
</template>
<style scoped></style>
