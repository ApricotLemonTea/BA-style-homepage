<template>
  <div ref="chartRef" class="echart-box" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  option: { type: Object, required: true },
  theme: { type: String, default: 'light' }, // 可选：light 或 dark
  autoResize: { type: Boolean, default: true }
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return

  // 如果已经初始化过，先 dispose
  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = echarts.init(chartRef.value, props.theme)
  chartInstance.setOption(props.option)
}

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      initChart()
    }, 100) // 延迟一点，确保 DOM 尺寸正常
  })

  if (props.autoResize) {
    window.addEventListener('resize', resizeChart)
  }
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('resize', resizeChart)
})

watch(
  () => props.option,
  (newOption) => {
    if (chartInstance && newOption) {
      chartInstance.setOption(newOption)
    }
  },
  { deep: true }
)
</script>

<style scoped>
.echart-box {
  width: 100%;
  height: 100%;
  min-height: 100px;
}
</style>
