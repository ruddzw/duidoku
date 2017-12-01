<template>
  <main>
    <game-board />
    <game-status />
  </main>
</template>

<script>
import GameBoard from 'components/GameBoard'
import GameStatus from 'components/GameStatus'

export default {
  components: {
    GameBoard,
    GameStatus
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variables';

main {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 1vh;
}
</style>
