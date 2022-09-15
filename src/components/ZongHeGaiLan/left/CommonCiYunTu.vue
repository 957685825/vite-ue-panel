<script setup>
import 'echarts-wordcloud'
import {
  getCurrentInstance,
  ref,
  onMounted,
  toRefs,
  onBeforeUnmount,
  reactive,
  watch
} from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  height: { type: String, default: '100%' }, // 高度
  width: { type: String, default: '100%' }, // 宽度
  world: {
    type: String,
    default: () => {
      return 'wordcloudID'
    }
  },
  rowData: {
    default: () => {
      return [
        {
          name: '景点特色',
          value: 30
        },
        {
          name: '工地扬尘',
          value: 28
        },
        {
          name: '流感',
          value: 24
        },
        {
          name: '景点特色小吃',
          value: 23
        },
        {
          name: '小区挪车',
          value: 22
        },
        {
          name: '医疗救助',
          value: 21
        }
      ]
    }
  },
  gridSize: {
    type: Number,
    default: () => {
      return 40
    }
  }
})

let worldchart = reactive(null)
const wordcloudID = ref(null)
const { gridSize, rowData } = toRefs(props)
const drawChart = () => {
  // 基于准备好的dom，初始化echarts实例
  const echarts = proxy.$echarts
  worldchart = echarts.init(wordcloudID.value)
  const option = {
    tooltip: {
      show: true,
      position: 'top',
      backgroundColor: '#00000006',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#13753c'
        }
      },
      textStyle: {
        fontSize: 20
      }
    },
    series: [
      {
        type: 'wordCloud',
        // 网格大小，各项之间间距
        gridSize: gridSize.value,
        // 形状 circle 圆，cardioid  心， diamond 菱形，
        // triangle-forward 、triangle 三角，star五角星
        shape: 'circle',
        // 字体大小范围
        sizeRange: [24, 34],
        // 文字旋转角度范围
        rotationRange: [0, 0],
        // 旋转步值
        // rotationStep: 90,
        // 自定义图形
        // maskImage: maskImage,
        left: 'center',
        top: 'center',
        right: null,
        bottom: null,
        // 画布宽
        width: '100%',
        // 画布高
        height: '100%',
        // 是否渲染超出画布的文字
        drawOutOfBound: false,
        textStyle: {
          normal: {
            color: function () {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 200 + 55),
                  Math.round(Math.random() * 200 + 55),
                  Math.round(Math.random() * 200 + 55)
                ].join(',') +
                ')'
              )
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#2ac'
          }
        },
        data: rowData.value
      }
    ]
  }
  worldchart.setOption(option)
}

let setTime = ref(null)
const tooltipShuffling = () => {
  clearInterval(setTime)
  let count = 0
  setTime = setInterval(() => {
    if (count === rowData.value.length) {
      count = 0
    }
    worldchart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: count
    })
    count++
  }, 1000)
}
onMounted(() => {
  drawChart()
  tooltipShuffling()
})
onBeforeUnmount(() => {
  setTime && clearInterval(setTime)
})
watch(
  () => rowData.value,
  (newVal) => {
    drawChart()
    tooltipShuffling()
  },
  {
    // immediate: true,
  }
)
</script>

<template>
  <div>
    <div
      ref="wordcloudID"
      class="positionloopecharts"
      :style="{ width: `${width}`, height: `${height}` }"
    ></div>
  </div>
</template>

<style lang="less" scoped>
.positionloopecharts {
  background-size: 100% 100%;
}
</style>
