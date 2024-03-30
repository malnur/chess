<template>
  <!-- Chess Board -->
  <div class="h-screen container mx-auto flex justify-center items-center">
    <!-- Left Side -->
    <div class="w-4 h-96 bg-gray-500 flex flex-col justify-between">
      <div class="h-4"></div>
      <div
        class="flex-1 items-center text-white text-xs flex flex-col flex-col-reverse justify-around"
      >
        <div v-for="num in nums" :key="num">{{ num }}</div>
      </div>
      <div class="h-4"></div>
    </div>

    <!-- Middle -->
    <div class="w-96 h-96 flex flex-col">
      <!-- Top Side -->
      <div class="w-full h-4 bg-gray-500"></div>

      <!-- Main Content -->
      <div class="w-full h-96 grid grid-cols-8 gap-0">
        <board-field
          v-for="(field, index) in boardFields"
          :key="index"
          :field="field"
          @on-click="onPieceClick(field)"
        />
      </div>

      <!-- Bottom Side -->
      <div class="w-full h-4 bg-gray-500 flex justify-around text-white text-xs">
        <div v-for="alpha in alphas" :key="alpha">{{ alpha }}</div>
      </div>
    </div>

    <!-- Right Side -->
    <div class="w-4 h-96 bg-gray-500"></div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BoardField from '@/components/BoardField.vue'

const props = defineProps(['board'])

const nums = reactive([1, 2, 3, 4, 5, 6, 7, 8])
const alphas = reactive(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
const boardFields = reactive([])

watch(props.board, (current) => {
  for (let col = 7; col >= 0; col--) {
    for (let row = 0; row < 8; row++) {
      boardFields.push(current[8 * row + col])
    }
  }
})

const onPieceClick = (field) => {
  const piece = field.piece
  if (!piece) {
    return
  }
  console.log(piece.color + piece.rank, field.location)
}
</script>
