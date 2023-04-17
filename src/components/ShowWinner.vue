<script setup lang="ts">
import { Player } from '../models/Player';

interface IGameOver {
  moves: number;
  win: boolean;
  tie: boolean;
}

interface IWinner {
  winner: string;
  isGameOver: IGameOver;
  players: Player[];
}

const winner = defineProps<IWinner>();
const emits = defineEmits(['newGame']);

const newGame = () => {
  const newGame = false;
  emits('newGame', newGame);
};
</script>

<template>
  <h3 class="winner" v-if="winner.isGameOver.win">
    The winner is: {{ winner.winner }}!
  </h3>
  <h3 class="tie" v-if="winner.isGameOver.tie">It's a tie! Play Again!</h3>
  <table class="scoreboard">
    <tr>
      <th class="scoreboard__name">{{ players[0].name }}:</th>
      <th class="scoreboard__name">{{ players[0].score }}</th>
    </tr>
    <tr>
      <th class="scoreboard__score">{{ players[1].name }}:</th>
      <th class="scoreboard__score">{{ players[1].score }}</th>
    </tr>
  </table>
  <button @click="newGame" class="newgameBtn">New Game</button>
</template>

<style scoped lang="scss">
.winner,
.tie {
  padding: 20px;
  background-color: rgba(200, 134, 220, 0.781);
  border-radius: 10px;
  margin: 20px;
}
.scoreboard {
  font-size: 1.1rem;
  padding: 20px;
  background-color: rgb(210, 236, 126);
  margin: 20px;
  border-radius: 10px;
  &__name {
    padding: 10px;
    text-align: center;
  }
  &__score {
    padding: 10px;
    text-align: center;
  }
}

.newgameBtn {
  margin: 10px;
  padding: 10px;
  font-weight: 700;
  border: 2px solid black;
  border-radius: 10px 10px 10px 10px;
  background-color: rgb(137, 248, 140);
  &:hover {
    background-color: white;
  }
}
</style>
