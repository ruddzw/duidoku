import { unique } from '@/lib/util'

export default class GameBoard {
  constructor(baseNum, board) {
    this.baseNum = baseNum
    this.board = board
  }

  static defaultBoard(baseNum) {
    return numRange(baseNum).map((_) => {
      return numRange(baseNum).map((_) => {
        return {
          move: 0,
          player: 0
        }
      })
    })
  }

  get fullNum() {
    return this.baseNum * this.baseNum
  }

  get numRange() {
    return [...Array(this.fullNum).keys()]
  }

  get possibleMoves() {
    return this.numRange.map((i) => i + 1)
  }

  indexToDoubleIndex(index) {
    return [Math.floor(index / this.fullNum), index % this.fullNum]
  }

  doubleIndexToIndex([indexOfGroup, indexWithinGroup]) {
    return indexOfGroup * this.fullNum + indexWithinGroup
  }

  isGameOver() {
    let noMovesLeft = true
    // For each index
    this.numRange.forEach((i) => {
      this.numRange.forEach((j) => {
        // If there is a possible move at this index
        if (!this.isIndexTaken([i, j]) && !this.isIndexImpossible([i, j])) {
          // Then the game is not over
          noMovesLeft = false
        }
      })
    })
    // No possible moves? Game is over
    return noMovesLeft
  }

  isIndexTaken([indexOfGroup, indexWithinGroup]) {
    return this.board[indexOfGroup][indexWithinGroup].move !== 0
  }

  isIndexImpossible([indexOfGroup, indexWithinGroup]) {
    if (this.isIndexTaken([indexOfGroup, indexWithinGroup])) {
      return false
    }
    return this.possibleMoves.every((move) => {
      return !this.isMoveAtIndexPossible(move, [indexOfGroup, indexWithinGroup])
    })
  }

  isIndexEmptyAndPossible([indexOfGroup, indexWithinGroup]) {
    if (this.isIndexTaken([indexOfGroup, indexWithinGroup])) {
      return false
    }
    return this.possibleMoves.some((move) => {
      return this.isMoveAtIndexPossible(move, [indexOfGroup, indexWithinGroup])
    })
  }

  isMoveAtIndexPossible(move, [indexOfGroup, indexWithinGroup]) {
    // Is the move one of the possible moves?
    if (!this.possibleMoves.includes(move)) {
      return false
    }
    // Is this square already set?
    if (this.board[indexOfGroup][indexWithinGroup].move !== 0) {
      return false
    }
    // Is this move already taken in any other considerable square?
    return this._indexesToConsider([indexOfGroup, indexWithinGroup]).every(
      ([i, j]) => {
        return this.board[i][j].move !== move
      }
    )
  }

  _indexesToConsider([indexOfGroup, indexWithinGroup]) {
    let toConsider = []
    const tests = [rowForIndex, columnForIndex, groupForIndex]
    tests.forEach((test) => {
      const toConsiderFromTest = this._indexesToConsiderForTest(
        [indexOfGroup, indexWithinGroup],
        test
      )
      toConsider = toConsider.concat(toConsiderFromTest)
    })

    const toConsiderUnique = unique(
      toConsider.map((i) => this.doubleIndexToIndex(i))
    )
    return toConsiderUnique.map((i) => this.indexToDoubleIndex(i))
  }

  _indexesToConsiderForTest([indexOfGroup, indexWithinGroup], test) {
    const valueForIndex = test(this.baseNum, [indexOfGroup, indexWithinGroup])

    const toConsider = []
    this.numRange.forEach((i) => {
      this.numRange.forEach((j) => {
        const valueForOtherIndex = test(this.baseNum, [i, j])
        if (
          valueForOtherIndex === valueForIndex &&
          (i !== indexOfGroup || j !== indexWithinGroup)
        ) {
          toConsider.push([i, j])
        }
      })
    })
    return toConsider
  }
}
window.GameBoard = GameBoard

// Helper functions

function fullNum(baseNum) {
  return baseNum * baseNum
}

function numRange(baseNum) {
  return [...Array(fullNum(baseNum)).keys()]
}

function rowForIndex(baseNum, [indexOfGroup, indexWithinGroup]) {
  const baseRowForGroup = Math.floor(indexOfGroup / baseNum) * baseNum
  const rowForIndexWithinGroup = Math.floor(indexWithinGroup / baseNum)
  return baseRowForGroup + rowForIndexWithinGroup
}

function columnForIndex(baseNum, [indexOfGroup, indexWithinGroup]) {
  const baseColumnForGroup = (indexOfGroup % baseNum) * baseNum
  const columnForIndexWithinGroup = indexWithinGroup % baseNum
  return baseColumnForGroup + columnForIndexWithinGroup
}

function groupForIndex(baseNum, [indexOfGroup, indexWithinGroup]) {
  return indexOfGroup
}
