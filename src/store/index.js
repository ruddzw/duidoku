import Vue from 'vue'
import Vuex from 'vuex'

import GameBoard from '@/lib/GameBoard'
import RandomOpponent from '@/lib/RandomOpponent'

Vue.use(Vuex)

const START_BASE_NUM = 2

export const GAME_STATE_PRE = 0
export const GAME_STATE_DURING = 1
export const GAME_STATE_POST = 2

export default new Vuex.Store({
  state: {
    gameState: GAME_STATE_PRE,
    baseNum: START_BASE_NUM,
    board: GameBoard.defaultBoard(START_BASE_NUM),
    winner: 1
  },
  getters: {
    gameBoard(state) {
      return new GameBoard(state.baseNum, state.board)
    },
    winnerIsPlayer(state) {
      return state.winner === 1
    }
  },
  mutations: {
    changeBoardSize(state, payload) {
      state.baseNum = payload.size
      state.board = GameBoard.defaultBoard(state.baseNum)
    },
    move(state, payload) {
      state.gameState = GAME_STATE_DURING
      Vue.set(state.board[payload.indexOfGroup], payload.indexWithinGroup, {
        move: payload.move,
        player: payload.player
      })
    },
    finishGame(state, payload) {
      state.winner = payload.winner
      state.gameState = GAME_STATE_POST
    },
    restart(state) {
      state.gameState = GAME_STATE_PRE
      state.board = GameBoard.defaultBoard(state.baseNum)
    }
  },
  actions: {
    selectMove(context, payload) {
      context.commit('move', payload)
      if (context.getters.gameBoard.isGameOver()) {
        context.commit('finishGame', { winner: payload.player })
      } else if (payload.player === 1) {
        // Computer opponent makes a move after player 1
        const opponent = new RandomOpponent(context.getters.gameBoard)
        const [i, j, move] = opponent.pickMove()
        context.dispatch('selectMove', {
          indexOfGroup: i,
          indexWithinGroup: j,
          move: move,
          player: 2
        })
      }
    }
  }
})
