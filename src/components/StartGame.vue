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

const winner = ref(false);

const players = ref<Player[]>([]);

const game = ref<Game>({
  board: ['', '', '', '', '', '', '', '', ''],
  activePlayer: new ActivePlayer({ symbol: '', name: '', score: 0 }, []),
  isGameDone: false,
});

if (playersFromLS.length === 2) {
  players.value.push(...playersFromLS);
  const playerToStart = randomizePlayer(players.value[0], players.value[1]);
  game.value.activePlayer.player = playerToStart;
  showContent.value.showGame = true;
  showContent.value.showInput = false;
}

const addPlayer = (playerName: string) => {
  if (players.value.length <= 1) {
    if (players.value.length === 0) {
      players.value.push(new Player('X', playerName, 0));
      savePlayerInLS(players.value);
    } else {
      players.value.push(new Player('O', playerName, 0));
      savePlayerInLS(players.value);
      showContent.value.showGame = true;
      showContent.value.showInput = false;
      const playerToStart = randomizePlayer(players.value[0], players.value[1]);
      game.value.activePlayer.player = playerToStart;
    }
  }
};

const playerMove = (i: number) => {
  if (game.value.activePlayer.player == players.value[0]) {
    game.value.board[i] = game.value.activePlayer.player.symbol;
    console.log(game.value.activePlayer);
    game.value.activePlayer.player = players.value[1];
  } else {
    game.value.board[i] = game.value.activePlayer.player.symbol;
    console.log(game.value.activePlayer);
    game.value.activePlayer.player = players.value[0];
  }
};

const checkForWinner = () => {};
</script>

<template>
  <AddPlayer @add-player="addPlayer" v-if="showContent.showInput"></AddPlayer>
  <div v-if="showContent.showGame" class="container">
    <h3>
      Player-{{ game.activePlayer.player.symbol }}:
      {{ game.activePlayer.player.name }}
    </h3>
    <div class="gameboard">
      <GameBoard
        :index="index"
        :game="game"
        v-for="(board, index) in game.board"
        :key="index"
        @player-move="playerMove(index)"
      ></GameBoard>
    </div>
    <ShowScore></ShowScore>
    <ResetGame></ResetGame>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.X {
  background-color: green;
}

.O {
  background-color: blueviolet;
}
.gameboard {
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
