<template>
  <div :style="gridStyle" class="game-board">
    <div v-for="i in gameBoard.numRange"
         :key="i"
         :style="gridStyle"
         class="square-group">
      <game-square v-for="j in gameBoard.numRange"
                   :key="j"
                   :style="squareStyle"
                   :i="i"
                   :j="j" />
    </div>
  </div>
</template>

<script>
import GameSquare from 'components/GameSquare'

export default {
  components: {
    GameSquare
  },
  computed: {
    gameBoard () {
      return this.$store.getters.gameBoard
    },
    gridSize () {
      return 80
    },
    gridStyle () {
      return {
        'grid-template-columns': `repeat(${this.gameBoard.baseNum}, 1fr)`
      }
    },
    squareStyle () {
      const size = this.gridSize / this.gameBoard.fullNum
      const cssSize = `${size}vw`
      return {
        'width': cssSize,
        'height': cssSize
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variables';

$gridSeparation: 3px;

.game-board {
  background-color: $gridBorderColor;
  border: $gridSeparation solid $gridBorderColor;
  display: grid;
  grid-gap: $gridSeparation * 2;
  user-select: none;

  .square-group {
    display: grid;
    grid-gap: $gridSeparation;

    .game-square {
      max-height: 50px;
      max-width: 50px;
    }
  }
}
</style>
