<script setup lang="ts">
import { ref } from 'vue';

const player = ref('');

const playerSymbol = ref('X');

const emits = defineEmits(['addPlayer']);

const addPlayer = (playerName: string) => {
  emits('addPlayer', playerName);
  playerSymbol.value = 'O';
  player.value = '';
};
</script>

<template>
  <form @submit.prevent="addPlayer(player)" class="form">
    <h3 class="form__heading">Enter your names to begin!</h3>
    <div class="form__container">
      <label class="form__label">{{ playerSymbol }}: </label>
      <input
        class="form__input"
        placeholder="Playername"
        v-model="player"
        type="text"
      />
      <button class="form__btn" type="submit">Add Player</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(80, 104, 200);
  border-radius: 20px;
  padding: 20px;
  &__container {
    display: flex;
    align-items: center;
  }
  &__heading {
    font-size: 1.5rem;
    padding: 5px;
    margin: 2px;
  }
  &__label {
    font-size: 1.2rem;
    font-weight: 900;
    margin: 2px;
  }
  &__input {
    padding: 5px;
    border-top: 3px solid black;
    border-left: 3px solid black;
    border-bottom: 3px solid black;
    border-right: 3px solid black;
    background-color: white;
    border-radius: 10px 0px 0px 10px;
    margin: 2px 0px 2px 2px;
    font-weight: 700;
    background-color: rgb(207, 234, 124);
    &:hover {
      background-color: rgb(162, 179, 249);
    }
  }

  &__btn {
    padding: 5px;
    font-weight: 700;
    border-top: 3px solid black;
    border-right: 3px solid black;
    border-bottom: 3px solid black;
    border-left: none;
    background-color: white;
    border-radius: 0 10px 10px 0;
    margin: 2px 2px 2px 0px;
    background-color: rgb(207, 234, 124);

    &:hover {
      background-color: rgb(162, 179, 249);
    }
  }
}
</style>
