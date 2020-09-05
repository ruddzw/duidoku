<template>
  <div class="game-status">
    <div v-if="gameStatusPre" class="pre">
      <ol>
        <li v-for="size in possibleSizes" :key="size">
          <label>
            <input
              :checked="size === $store.state.baseNum"
              type="radio"
              name="gridSize"
              @change="change(size)"
            />
            {{ gridSizeForBaseNum(size) }}
          </label>
        </li>
      </ol>
      <game-status-instructions />
    </div>
    <div v-if="gameStatusDuring" class="during">
      <game-status-instructions />
    </div>
    <div v-if="gameStatusPost" class="post">
      <h3 v-if="$store.getters.winnerIsPlayer">Victory! 🎉</h3>
      <h3 v-else>Defeat! 😭</h3>
      <button class="restart" @click="restart">Try Again</button>
    </div>
  </div>
</template>

<script>
import { GAME_STATE_PRE, GAME_STATE_DURING, GAME_STATE_POST } from '@/store'

import GameStatusInstructions from '@/components/GameStatusInstructions'

export default {
  components: {
    GameStatusInstructions
  },
  computed: {
    possibleSizes() {
      return [2, 3]
    },
    gameStatusPre() {
      return this.$store.state.gameState === GAME_STATE_PRE
    },
    gameStatusDuring() {
      return this.$store.state.gameState === GAME_STATE_DURING
    },
    gameStatusPost() {
      return this.$store.state.gameState === GAME_STATE_POST
    }
  },
  methods: {
    gridSizeForBaseNum(baseNum) {
      const fullNum = baseNum * baseNum
      return `${fullNum} × ${fullNum}`
    },
    change(size) {
      this.$store.commit('changeBoardSize', { size })
    },
    restart() {
      this.$store.commit('restart')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.game-status {
  background-color: #e8faff;
  border-radius: 4vh;
  color: $standardFontColor;
  margin-top: 2vh;
  max-width: 100%;
  padding: 1vh;
  text-align: center;
  width: 70vh;

  p {
    font-size: 2.25vh;
    line-height: 1.5em;
    margin: 0 1em;
  }

  .pre {
    ol {
      display: flex;
      justify-content: center;
    }

    li {
      $size: 2.5vh;
      font-family: $copyFont;
      font-size: $size;
      line-height: $size;
      padding: 0.25em 1em;

      input {
        vertical-align: $size * 0.15;
      }
    }
  }

  .post {
    h3 {
      font-family: $copyFont;
      font-size: 4vh;
      margin: 2vh 0;
    }

    button {
      background-color: white;
      border: 0.25vh solid $standardFontColor;
      border-radius: 100px;
      color: $standardFontColor;
      cursor: pointer;
      font-family: $copyFont;
      font-size: 2vh;
      padding: 1vh 2vh;

      &:hover {
        background-color: #eee;
      }

      &:active {
        background-color: #ddd;
      }
    }
  }
}
</style>
