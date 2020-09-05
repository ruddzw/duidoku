<template>
  <div :class="squareClasses" class="game-square">
    <button v-if="!isTaken && !isImpossible" class="game-square-button" @click="onSquareClick" />
    <div v-if="isTaken" class="game-square-inside">{{ gameBoard.board[i][j].move }}</div>
    <game-square-value-selector
      v-click-outside="dismissSelector"
      v-if="isValueSelectorShown"
      :i="i"
      :j="j"
      @dismiss="dismissSelector"
    />
  </div>
</template>

<script>
import GameSquareValueSelector from '@/components/GameSquareValueSelector'

export default {
  components: {
    GameSquareValueSelector
  },
  props: {
    i: {
      type: Number,
      required: true
    },
    j: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isValueSelectorShown: false
    }
  },
  computed: {
    gameBoard() {
      return this.$store.getters.gameBoard
    },
    isTaken() {
      return this.gameBoard.isIndexTaken([this.i, this.j])
    },
    isImpossible() {
      return this.gameBoard.isIndexImpossible([this.i, this.j])
    },
    isPlayer() {
      return this.gameBoard.board[this.i][this.j].player === 1
    },
    isOpponent() {
      return this.gameBoard.board[this.i][this.j].player === 2
    },
    squareClasses() {
      return [
        this.isImpossible ? 'impossible' : '',
        this.isPlayer ? 'player' : '',
        this.isOpponent ? 'opponent' : ''
      ]
    }
  },
  methods: {
    onSquareClick() {
      if (!this.isTaken) {
        this.isValueSelectorShown = true
      }
    },
    dismissSelector() {
      this.isValueSelectorShown = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.game-square {
  background-color: $gridOpenColor;
  position: relative;
  transition: background-color 1000ms;

  &.impossible {
    background-color: $gridImpossibleColor;
  }

  &.player {
    background-color: $gridPlayerColor;
    // Seems to avoid a weird Safari bug where sometimes, the value selector leaves visual artifacts
    // outside the grid after a value is selected
    overflow: hidden;
  }

  &.opponent {
    background-color: $gridOpponentColor;
  }
}

button.game-square-button {
  background-color: $gridOpenColor;
  border: none;
  cursor: pointer;
  height: 100%;
  width: 100%;

  &:active {
    background-color: darken($gridOpenColor, 10%);
  }
}

.game-square-inside {
  align-items: center;
  display: flex;
  font-family: $gameValueFont;
  font-size: 24px;
  height: 100%;
  justify-content: center;
  text-align: center;
  width: 100%;
}
</style>
