<script setup lang="ts">
// Get two player names write in names.
// Clear input after first player
// Second player puts in name, length of list 2 send to ShowGame?

let player = ['X', 'O'];
</script>

<template>
  <div>
    <p>Skriv ditt namn</p>
    <label>Spelare {{ player[0] }}: </label>
    <input placeholder="Ditt namn" />
  </div>
</template>

<style scoped></style>
