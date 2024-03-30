<template>
  <chess-board :board="board" />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import ChessBoard from '@/components/ChessBoard.vue'

import { ChessGame } from '@/services/main'

const board = reactive([])

onMounted(() => {
  const game = new ChessGame()
  game.reset()
  //console.log(game.board.display())
  //console.log(game)
  console.log(game.board.fields[1].getMoves())

  /*for (let col = 1; col <= 8; col++) {
    for (let row = 1; row <= 8; row++) {
      const color = row === 1 || row === 2 ? 'w' : row === 7 || row === 8 ? 'b' : undefined
      const rank =
        row === 2 || row === 7
          ? 'p'
          : row > 1 && row < 7
            ? undefined
            : col === 1 || col === 8
              ? 'R'
              : col === 2 || col === 7
                ? 'N'
                : col === 3 || col === 6
                  ? 'B'
                  : col === 4
                    ? 'Q'
                    : 'K'
      const count = board.push({
        location: `${col}${row}`
      })
      if (color) {
        board[count - 1].piece = { color, rank }
      }
    }
  }*/
})
</script>
