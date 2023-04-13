<script setup lang="ts">
import ShowScore from './ShowScore.vue';
import AddPlayer from './AddPlayer.vue';
import { Player } from '../models/Player';
import { ref } from 'vue';
import GameBoard from './GameBoard.vue';
import { getFromLocalStorage } from '../helpers/getPlayersFromLS';
import { savePlayerInLS } from '../helpers/saveToLS';
import { Game } from '../models/Game';

const playersFromLS = getFromLocalStorage();

const game = ref<Game>({
  players: playersFromLS,
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  isGameDone: false,
});

const changeTurn = ref(true);
const showContent = ref({ showGame: false, showInput: true });

const addPlayer = (playerName: string) => {
  let id = 1;
  if (game.value.players.length <= 1) {
    if (game.value.players.length === 0) {
      game.value.players.push(new Player(id, playerName, 0));
      savePlayerInLS(game.value.players);
    } else {
      id++;
      game.value.players.push(new Player(id, playerName, 0));
      savePlayerInLS(game.value.players);
      showContent.value.showGame = true;
      showContent.value.showInput = false;
    }
  }
};

if (playersFromLS.length === 2) {
  showContent.value.showGame = true;
  showContent.value.showInput = false;
}

const toggleSquare = (i: number) => {
  if (changeTurn.value === true) {
    game.value.board[i] = 1;
    changeTurn.value = false;
  } else {
    game.value.board[i] = 2;
    changeTurn.value = true;
  }
  console.log(game.value.board);
};

const winnerwinnerchickendinner = () => {};
</script>

<template>
  <AddPlayer @add-player="addPlayer" v-if="showContent.showInput"></AddPlayer>
  <div class="gameboard">
    <GameBoard
      :player="game.board[index]"
      :board="board"
      v-for="(board, index) in game.board"
      :key="index"
      v-if="showContent.showGame"
      @toggle-square="toggleSquare(index)"
    ></GameBoard>
  </div>
  <ShowScore></ShowScore>
</template>
<style scoped>
.X {
  background-color: green;
}

.O {
  background-color: blueviolet;
}
.gameboard {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
