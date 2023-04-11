<script setup lang="ts">
import ShowScore from './ShowScore.vue';
import StartGame from './StartGame.vue';

// showGame blir true om man hämtar data från localstorage och det finns två spelare
let showGame = false;
</script>

<template>
  <StartGame>
    <!-- 
      ifall det inte finns två spelare ska show är vara false 
      om ingen spelare finns blir denna true så den syns.
    -->
  </StartGame>

  <div v-show="showGame">
    <!-- Om två spelare hämtas från localstorage så ska showGame bli true. -->
    Här är spelet
  </div>

  <!-- Samma ska här ?-->
  <ShowScore></ShowScore>
</template>
<style scoped></style>
