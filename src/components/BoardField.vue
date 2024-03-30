<template>
  <div class="relative" :class="{ 'bg-gray-200': isBlack }">
    <span
      class="absolute inset-0 leading-tight text-center text-4xl piece cursor-pointer"
      @click="$emit('onClick', field)"
    >
      {{ pieceFace(field.piece) }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['field'])
defineEmits(['onClick'])

const isBlack = computed(
  () => (parseInt(props.field.location[0]) + parseInt(props.field.location[1])) % 2 === 0
)
const pieceFace = (piece) => {
  if (!piece?.color) {
    return undefined
  }

  return piece.color === 'w'
    ? piece.rank === 'p'
      ? '♙'
      : piece.rank === 'R'
        ? '♖'
        : piece.rank === 'N'
          ? '♘'
          : piece.rank === 'B'
            ? '♗'
            : piece.rank === 'Q'
              ? '♕'
              : '♔'
    : piece.rank === 'p'
      ? '♟︎'
      : piece.rank === 'R'
        ? '♜'
        : piece.rank === 'N'
          ? '♞'
          : piece.rank === 'B'
            ? '♝'
            : piece.rank === 'Q'
              ? '♛'
              : '♚'
}
</script>

<style>
.piece {
  font-family: 'FreeSerif', sans-serif;
}
</style>
