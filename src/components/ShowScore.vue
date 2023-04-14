<script setup lang="ts">
import { Player } from '../models/Player';

interface IPlayer {
  scorePlayers: Player[];
}

const props = defineProps<IPlayer>();
</script>

<template>
  <div>{{}}</div>
  <button>Show Score</button>
</template>

<style scoped lang="scss"></style>
