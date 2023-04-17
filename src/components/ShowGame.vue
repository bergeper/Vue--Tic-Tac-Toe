<script setup lang="ts">
import AddPlayer from './AddPlayer.vue';
import { Player } from '../models/Player';
import { reactive, ref } from 'vue';
import GameBoard from './GameBoard.vue';
import { gameToLS } from '../helpers/saveToLS';
import { Game } from '../models/Game';
import { randomizePlayer } from '../helpers/randomizeStart';
import ResetGame from './ResetGame.vue';
import ShowWinner from './ShowWinner.vue';
import { winningCombinations } from '../helpers/winningCombinations';
import { getGameLocalStorage } from '../helpers/getGameFromLS';

const gameFromLS = getGameLocalStorage();

const showContent = reactive({
  showGame: false,
  showInput: true,
  showBtn: false,
});

const game = ref<Game>(getGameLocalStorage());

if (gameFromLS.players.length === 2) {
  showContent.showGame = true;
  showContent.showBtn = true;
  showContent.showInput = false;
  if (
    game.value.players[0].checkForWin.length <
    game.value.players[1].checkForWin.length
  ) {
    game.value.activePlayer = game.value.players[0];
  } else {
    game.value.activePlayer = game.value.players[1];
  }
}

const newGame = (playAgain: boolean) => {
  game.value.win = playAgain;
  game.value.tie = playAgain;
  game.value.moves = 0;
  game.value.board = ['', '', '', '', '', '', '', '', ''];
  game.value.activePlayer = new Player('', '', [], 0);
  const playerToStart = randomizePlayer(
    game.value.players[0],
    game.value.players[1]
  );
  game.value.activePlayer = playerToStart;
  showContent.showGame = true;
  gameToLS(game.value);
};

const addPlayer = (playerName: string) => {
  if (game.value.players.length <= 1) {
    if (game.value.players.length === 0) {
      game.value.players.push(new Player('X', playerName, [], 0));
    } else {
      game.value.players.push(new Player('O', playerName, [], 0));
      showContent.showGame = true;
      showContent.showBtn = true;
      showContent.showInput = false;
      const playerToStart = randomizePlayer(
        game.value.players[0],
        game.value.players[1]
      );
      game.value.activePlayer = playerToStart;
    }
    gameToLS(game.value);
  }
};

const playerMove = (i: number) => {
  game.value.board[i] = game.value.activePlayer.symbol;
  game.value.moves += 1;
  gameToLS(game.value);
};

const addPositionForMove = () => {
  let position = 0;
  for (let i = 0; i < game.value.board.length; i++) {
    if (game.value.board[i] === game.value.activePlayer.symbol) {
      position = i;
      if (!game.value.activePlayer.checkForWin.includes(position)) {
        game.value.activePlayer.checkForWin.push(position);
        gameToLS(game.value);
      }
    }
  }
};

const winningCombos = () => {
  if (!game.value.win && game.value.moves <= 9) {
    for (let i = 0; i < winningCombinations.length; i++) {
      let checkForWin = winningCombinations[i].every((element) =>
        game.value.activePlayer.checkForWin.includes(element)
      );

      if (checkForWin) {
        game.value.win = true;
        showContent.showGame = false;
        game.value.activePlayer.score += 1;
        for (let i = 0; i < game.value.players.length; i++) {
          game.value.players[i].checkForWin = [];
        }
        gameToLS(game.value);
      }
    }
  }
};

const checkForTie = () => {
  if (game.value.moves === 9 && game.value.win === false) {
    game.value.tie = true;
    showContent.showGame = false;
    for (let i = 0; i < game.value.players.length; i++) {
      game.value.players[i].checkForWin = [];
    }
    gameToLS(game.value);
  }
};

const changePlayer = () => {
  if (!game.value.win) {
    if (
      game.value.players[0].checkForWin.length >
      game.value.players[1].checkForWin.length
    ) {
      game.value.activePlayer = game.value.players[1];
    } else {
      game.value.activePlayer = game.value.players[0];
    }
    gameToLS(game.value);
  }
};

const resetGame = () => {
  localStorage.clear();
  game.value.activePlayer = new Player('', '', [], 0);
  game.value.players = [];
  game.value.board = game.value.board = ['', '', '', '', '', '', '', '', ''];
  game.value.moves = 0;
  game.value.tie = false;
  game.value.win = false;
  showContent.showGame = false;
  showContent.showInput = true;
  showContent.showBtn = false;
};
</script>

<template>
  <AddPlayer @add-player="addPlayer" v-if="showContent.showInput"></AddPlayer>
  <div v-if="showContent.showGame" class="container">
    <h3 class="player">
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
        @check-for-tie="checkForTie"
        @change-player="changePlayer"
      ></GameBoard>
    </div>
  </div>
  <div class="container" v-if="game.win || game.tie">
    <ShowWinner
      :winner="game.activePlayer.name"
      :is-game-over="game"
      :players="game.players"
      @new-game="newGame"
    >
    </ShowWinner>
  </div>
  <div v-if="showContent.showBtn" class="btn--container">
    <ResetGame @reset-game="resetGame"></ResetGame>
  </div>
</template>
<style scoped lang="scss">
.player {
  padding: 20px;
  background-color: rgba(200, 134, 220, 0.781);
  border-radius: 10px;
  margin: 20px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(80, 104, 200);
  border-radius: 20px;
  padding: 20px;
  min-width: 300px;
}

.btn--container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.gameboard {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
}
</style>
