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
import ResetGame from './ResetGame.vue';
import ShowWinner from './ShowWinner.vue';
import { winningCombinations } from '../helpers/winningCombinations';

const playersFromLS = getFromLocalStorage();
const showContent = ref({ showGame: false, showInput: true, showBtn: false });

const game = ref<Game>({
  players: [],
  board: ['', '', '', '', '', '', '', '', ''],
  activePlayer: new Player('', '', [], 0),
  isGameDone: false,
});

if (playersFromLS.length === 2) {
  game.value.players.push(...playersFromLS);
  const playerToStart = randomizePlayer(
    game.value.players[0],
    game.value.players[1]
  );
  game.value.activePlayer = playerToStart;
  showContent.value.showGame = true;
  showContent.value.showBtn = true;
  showContent.value.showInput = false;
}

const newGame = (playAgain: boolean) => {
  game.value.isGameDone = playAgain;
  const playerToStart = randomizePlayer(
    game.value.players[0],
    game.value.players[1]
  );
  game.value.board = ['', '', '', '', '', '', '', '', ''];
  game.value.activePlayer = playerToStart;
  showContent.value.showGame = true;
};

const addPlayer = (playerName: string) => {
  if (game.value.players.length <= 1) {
    if (game.value.players.length === 0) {
      game.value.players.push(new Player('X', playerName, [], 0));
      savePlayerInLS(game.value.players);
    } else {
      game.value.players.push(new Player('O', playerName, [], 0));
      savePlayerInLS(game.value.players);
      showContent.value.showGame = true;
      showContent.value.showBtn = true;
      showContent.value.showInput = false;
      const playerToStart = randomizePlayer(
        game.value.players[0],
        game.value.players[1]
      );
      game.value.activePlayer = playerToStart;
    }
  }
};

const playerMove = (i: number) => {
  game.value.board[i] = game.value.activePlayer.symbol;
};

const addPositionForMove = () => {
  let position = 0;
  for (let i = 0; i < game.value.board.length; i++) {
    if (game.value.board[i] === game.value.activePlayer.symbol) {
      position = i;
      if (!game.value.activePlayer.checkForWin.includes(position)) {
        game.value.activePlayer.checkForWin.push(position);
        console.log(game.value);
      }
    }
  }
};

const winningCombos = () => {
  if (!game.value.isGameDone) {
    for (let i = 0; i < winningCombinations.length; i++) {
      let checkForWin = winningCombinations[i].every((element) =>
        game.value.activePlayer.checkForWin.includes(element)
      );

      if (checkForWin) {
        game.value.isGameDone = true;
        showContent.value.showGame = false;
        game.value.activePlayer.score += 1;
        for (let i = 0; i < game.value.players.length; i++) {
          game.value.players[i].checkForWin = [];
        }
        savePlayerInLS(game.value.players);
      }
    }
  }
};

const changePlayer = () => {
  if (!game.value.isGameDone) {
    if (game.value.activePlayer == game.value.players[1]) {
      game.value.activePlayer = game.value.players[0];
    } else {
      game.value.activePlayer = game.value.players[1];
    }
  }
};
</script>

<template>
  <AddPlayer @add-player="addPlayer" v-if="showContent.showInput"></AddPlayer>
  <div v-if="showContent.showGame" class="container">
    <h3>
      Player-{{ game.activePlayer.symbol }}:
      {{ game.activePlayer.name }}
    </h3>
    <div class="gameboard">
      <GameBoard
        :index="index"
        :game="game"
        v-for="(board, index) in game.board"
        :key="index"
        @markSquare="playerMove(index)"
        @check-for-win="addPositionForMove"
        @winning-combo="winningCombos"
        @change-player="changePlayer"
      ></GameBoard>
    </div>
  </div>
  <div class="container">
    <ShowWinner
      v-if="game.isGameDone"
      :winner="game.activePlayer"
      @new-game="newGame"
    >
    </ShowWinner>
    <ShowScore :score-players="game.players"></ShowScore>
    <ResetGame></ResetGame>
    <div v-if="showContent.showBtn" class="btn--container"></div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.btn--container {
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
