<template>
  <div class="game-square-value-selector">
    <button v-for="move in gameBoard.possibleMoves"
            :key="move"
            :disabled="!possibles[move - 1]"
            class="move"
            @click="selectMove(move)">
      {{ move }}
    </button>
  </div>
</template>

<script>
import store from 'store'

export default {
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
  computed: {
    gameBoard () {
      return this.$store.getters.gameBoard
    },
    possibles () {
      return this.gameBoard.possibleMoves.map((move) => {
        return this.gameBoard.isMoveAtIndexPossible(move, [this.i, this.j])
      })
    }
  },
  methods: {
    selectMove (move) {
      if (this.possibles[move - 1]) {
        this.$emit('dismiss')
        store.dispatch('selectMove', {
          indexOfGroup: this.i,
          indexWithinGroup: this.j,
          move: move,
          player: 1
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variables';

$arrowSize: 1vh;
$backgroundColor: $gridBorderColor;
$borderColor: $gridBorderColor;
$borderWidth: 0.5vh;
$borderWidthAdjustment: $arrowSize + $borderWidth * $sqrt2;

.game-square-value-selector {
  align-items: center;
  background: $backgroundColor;
  border: $borderWidth solid $borderColor;
  border-radius: 500px;
  display: flex;
  justify-content: center;
  left: 50%;
  margin: 0 auto;
  padding: 0.5vh;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, calc(-100% - 15px));
  white-space: nowrap;
  z-index: 50;

  &:after, &:before {
    border: solid transparent;
    content: " ";
    height: 0;
    left: 50%;
    pointer-events: none;
    position: absolute;
    top: 100%;
    width: 0;
  }

  &:after {
    border-color: rgba($backgroundColor, 0);
    margin-left: -$arrowSize;
    border-top-color: $backgroundColor;
    border-width: $arrowSize;
  }

  &:before {
    border-color: rgba($borderColor, 0);
    margin-left: -$borderWidthAdjustment;
    border-top-color: $borderColor;
    border-width: $borderWidthAdjustment;
  }
}

button.move {
  $size: 4vh;
  $bgColor: #fdfdfd;

  background-color: $bgColor;
  border-radius: $size / 2;
  border: none;
  color: $standardFontColor;
  font-family: $gameValueFont;
  font-size: $size * 0.75;
  height: $size;
  line-height: $size;
  margin: 0 0.5vh;
  padding: 0; // Overrides iOS Safari default padding
  text-align: center;
  transition: all 200ms;
  width: $size;

  &:disabled {
    background-color: darken($bgColor, 60%);
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      background-color: darken($bgColor, 10%);
    }

    &:active {
      background-color: darken($bgColor, 20%)
    }
  }
}
</style>
