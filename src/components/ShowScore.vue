<script setup lang="ts">
import { Player } from '../models/Player';

interface IShowContent {
  showGame: boolean;
  showInput: boolean;
  showBtn: boolean;
}

interface IPlayer {
  scorePlayers: Player[];
  showContent: IShowContent;
}

//const players = defineProps<IPlayer>();
//const emits = defineEmits(['hideGame']);

const showScore = () => {
  console.log(1);
};
</script>

<template>
  <table></table>

  <button @click="showScore">Show Score</button>
</template>

<style scoped lang="scss"></style>
