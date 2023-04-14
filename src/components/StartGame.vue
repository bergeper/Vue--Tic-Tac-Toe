<script setup lang="ts">
import ShowScore from './ShowScore.vue';
import AddPlayer from './AddPlayer.vue';
import { Player } from '../models/Player';
import { ref } from 'vue';
import GameBoard from './GameBoard.vue';
import { getFromLocalStorage } from '../helpers/getPlayersFromLS';
import { savePlayerInLS } from '../helpers/saveToLS';
import { Game } from '../models/Game';
import { randomizePlayer } from '../helpers/randomizeStart';
import { ActivePlayer } from '../models/ActivePlayer';
import ResetGame from './ResetGame.vue';

const playersFromLS = getFromLocalStorage();
const showContent = ref({ showGame: false, showInput: true });

const game = ref<Game>({
  players: [],
  board: ['', '', '', '', '', '', '', '', ''],
  activePlayer: new ActivePlayer('', ''),
  isGameDone: false,
});

if (playersFromLS.length === 2) {
  game.value.players.push(...playersFromLS);
  const playerToStart = randomizePlayer(
    game.value.players[0],
    game.value.players[1]
  );
  game.value.activePlayer = playerToStart;
  console.log(playerToStart);

  showContent.value.showGame = true;
  showContent.value.showInput = false;
}

const addPlayer = (playerName: string) => {
  if (game.value.players.length <= 1) {
    if (game.value.players.length === 0) {
      game.value.players.push(new Player('X', playerName, 0));
      savePlayerInLS(game.value.players);
    } else {
      game.value.players.push(new Player('O', playerName, 0));
      savePlayerInLS(game.value.players);
      showContent.value.showGame = true;
      showContent.value.showInput = false;
      const playerToStart = randomizePlayer(
        game.value.players[0],
        game.value.players[1]
      );
      game.value.activePlayer = playerToStart;
    }
  }
};

const markSquare = (i: number) => {
  if (game.value.activePlayer == game.value.players[0]) {
    game.value.board[i] = game.value.activePlayer.symbol;
    game.value.activePlayer = game.value.players[1];
  } else {
    game.value.board[i] = game.value.activePlayer.symbol;
    game.value.activePlayer = game.value.players[0];
  }
};
</script>

<template>
  <AddPlayer @add-player="addPlayer" v-if="showContent.showInput"></AddPlayer>
  <div v-if="showContent.showGame">
    <h3>Player-{{ game.activePlayer.symbol }}: {{ game.activePlayer.name }}</h3>
    <div class="gameboard">
      <GameBoard
        :index="index"
        :game="game"
        v-for="(board, index) in game.board"
        :key="index"
        @toggle-square="markSquare(index)"
      ></GameBoard>
    </div>
    <ResetGame></ResetGame>
    <ShowScore></ShowScore>
  </div>
</template>
<style scoped lang="scss">
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
