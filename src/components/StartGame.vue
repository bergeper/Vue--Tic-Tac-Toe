<script setup lang="ts">
import ShowScore from './ShowScore.vue';
import AddPlayer from './AddPlayer.vue';
import { Player } from '../models/Player';
import { reactive, ref } from 'vue';
import GameBoard from './GameBoard.vue';
import { getFromLocalStorage } from '../helpers/getPlayersFromLS';
import { savePlayerInLS } from '../helpers/saveToLS';
import { Game } from '../models/Game';
import { randomizePlayer } from '../helpers/randomizeStart';
import ResetGame from './ResetGame.vue';
import ShowWinner from './ShowWinner.vue';
import { winningCombinations } from '../helpers/winningCombinations';

const playersFromLS = getFromLocalStorage();

const showContent = reactive({
  showGame: false,
  showInput: true,
  showBtn: false,
});
const isGameOver = reactive({ moves: 0, win: false, tie: false });

const game = ref<Game>({
  players: [],
  board: ['', '', '', '', '', '', '', '', ''],
  activePlayer: new Player('', '', [], 0),
});

if (playersFromLS.length === 2) {
  game.value.players.push(...playersFromLS);
  const playerToStart = randomizePlayer(
    game.value.players[0],
    game.value.players[1]
  );
  game.value.activePlayer = playerToStart;
  showContent.showGame = true;
  showContent.showBtn = true;
  showContent.showInput = false;
}

const newGame = (playAgain: boolean) => {
  isGameOver.win = playAgain;
  const playerToStart = randomizePlayer(
    game.value.players[0],
    game.value.players[1]
  );
  game.value.board = ['', '', '', '', '', '', '', '', ''];
  isGameOver.moves = 0;
  game.value.activePlayer = playerToStart;
  showContent.showGame = true;
};

const addPlayer = (playerName: string) => {
  if (game.value.players.length <= 1) {
    if (game.value.players.length === 0) {
      game.value.players.push(new Player('X', playerName, [], 0));
      savePlayerInLS(game.value.players);
    } else {
      game.value.players.push(new Player('O', playerName, [], 0));
      savePlayerInLS(game.value.players);
      showContent.showGame = true;
      showContent.showBtn = true;
      showContent.showInput = false;
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
  isGameOver.moves += 1;
};

const addPositionForMove = () => {
  let position = 0;
  for (let i = 0; i < game.value.board.length; i++) {
    if (game.value.board[i] === game.value.activePlayer.symbol) {
      position = i;
      if (!game.value.activePlayer.checkForWin.includes(position)) {
        game.value.activePlayer.checkForWin.push(position);
      }
    }
  }
};

const winningCombos = () => {
  if (!isGameOver.win && isGameOver.moves <= 9) {
    console.log(isGameOver.moves);
    for (let i = 0; i < winningCombinations.length; i++) {
      let checkForWin = winningCombinations[i].every((element) =>
        game.value.activePlayer.checkForWin.includes(element)
      );

      if (checkForWin) {
        isGameOver.win = true;
        showContent.showGame = false;
        game.value.activePlayer.score += 1;
        for (let i = 0; i < game.value.players.length; i++) {
          game.value.players[i].checkForWin = [];
        }
        savePlayerInLS(game.value.players);
      } else {
        isGameOver.tie = true;
      }
    }
  }
};

const changePlayer = () => {
  if (!isGameOver.win) {
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
      v-if="isGameOver.win"
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
