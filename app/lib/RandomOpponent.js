export default class RandomOpponent {
  constructor (gameBoard) {
    this.gameBoard = gameBoard
  }

  pickMove () {
    while (true) {
      // Find an index that is possible to move at
      const indexOfGroup = Math.floor(Math.random() * this.gameBoard.fullNum)
      const indexWithinGroup = Math.floor(Math.random() * this.gameBoard.fullNum)
      if (this.gameBoard.isIndexEmptyAndPossible([indexOfGroup, indexWithinGroup])) {
        while (true) {
          // Find a move that is possible
          const move = Math.ceil(Math.random() * this.gameBoard.fullNum)
          if (this.gameBoard.isMoveAtIndexPossible(move, [indexOfGroup, indexWithinGroup])) {
            return [indexOfGroup, indexWithinGroup, move]
          }
        }
      }
    }
  }
}
