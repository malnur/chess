export class ChessGame {
  board
  constructor() {
    this.board = new Board()
  }

  reset() {
    this.board.reset()
    this.board.init()
  }
}

const files = 8
const ranks = 8

class Board {
  fields = []
  constructor() {
    for (let file = 1; file <= files; file++) {
      for (let rank = 1; rank <= ranks; rank++) {
        const field = new Field(this, file, rank)
        this.fields.push(field)
      }
    }
  }

  reset() {
    this.fields.forEach((field) => field.empty())
  }

  init() {
    this.fields.forEach((field) => {
      if (field.rank === 2) {
        new Pawn(field, Color.White)
      }
      if (field.rank === 7) {
        new Pawn(field, Color.Black)
      }
      if (field.rank === 1 || field.rank === 8) {
        const color = field.rank === 1 ? Color.White : Color.Black
        if (field.file === 1 || field.file === 8) {
          new Rook(field, color)
        } else if (field.file === 2 || field.file === 7) {
          new Knight(field, color)
        } else if (field.file === 3 || field.file === 6) {
          new Bishop(field, color)
        } else if (field.file === 4) {
          new Queen(field, color)
        } else {
          new King(field, color)
        }
      }
    })
  }

  display() {
    let result = ''
    for (let file = files; file >= 1; file--) {
      for (let rank = 1; rank <= ranks; rank++) {
        result += `${this.fields[8 * (rank - 1) + (file - 1)].iccf()} `
      }
      result += '\n'
    }
    return result
  }
}

class Field {
  file
  rank
  piece
  board
  constructor(board, file, rank) {
    this.board = board
    this.file = file
    this.rank = rank
  }

  dark() {
    return (this.file + this.rank) % 2 === 0
  }

  iccf() {
    return `${this.file}${this.rank}`
  }

  setPiece(piece) {
    this.piece = piece
  }

  empty() {
    if (this.piece) {
      this.piece.field = null
    }
    this.piece = null
  }

  getMoves() {
    if (!this.piece) return []
    return this.piece.getMoves()
  }
}

class Color {
  static White = new Color('w')
  static Black = new Color('b')

  constructor(color) {
    this.color = color
  }
  toString() {
    return this.color
  }
}

class Piece {
  field
  color
  moved = false
  constructor(field, color) {
    this.field = field
    this.color = color
    field.setPiece(this)
  }

  display() {}

  getMoves() {
    return []
  }
}

class Pawn extends Piece {
  constructor(field, color) {
    super(field, color)
  }

  display() {
    return this.color === Color.White ? '♙' : '♟︎'
  }

  getMoves() {
    const result = []
    const direction = this.color === Color.White ? 1 : -1
    const file = this.field.file
    const board = this.field.board.fields
    let index = board.indexOf(this.field)

    for (let i = 0; i < 2; i++) {
      if (i > 0 && this.moved) {
        break
      }
      index += direction
      const nextField = board[index]
      if (nextField.file !== file) {
        break
      }
      result.push(nextField.iccf())
    }
    return result
  }
}

class King extends Piece {
  constructor(field, color) {
    super(field, color)
  }

  display() {
    return this.color === Color.White ? '♔' : '♚'
  }
}

class Queen extends Piece {
  constructor(field, color) {
    super(field, color)
  }

  display() {
    return this.color === Color.White ? '♕' : '♛'
  }
}

class Rook extends Piece {
  constructor(field, color) {
    super(field, color)
  }

  display() {
    return this.color === Color.White ? '♖' : '♜'
  }
}

class Bishop extends Piece {
  constructor(field, color) {
    super(field, color)
  }

  display() {
    return this.color === Color.White ? '♗' : '♝'
  }
}

class Knight extends Piece {
  constructor(field, color) {
    super(field, color)
  }

  display() {
    return this.color === Color.White ? '♘' : '♞'
  }
}
