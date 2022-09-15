<template>
  <div
    class="panelIndex"
    :style="`width: ${width}px;height: ${height}px;`"
  >
    <button @click="closePanel">关闭</button>
    <component :is="componentName" :data="layerConfig" />
  </div>
</template>
<script setup>
import { ref, toRefs, markRaw } from 'vue'
import panelContral from '../../utils/GisManagers/PanelContral'
import PWJCD from './components/PWJCD.vue'
const componentName = ref('')
const props = defineProps({
  size: { type: Array, default () { return [] } },
  layerConfig: { type: Object, default () { return [] } }
})
const { size, layerConfig } = toRefs(props)

const [width, height] = size.value
const componentsList = {
  排污检测站点: markRaw(PWJCD)
}
componentName.value = componentsList[layerConfig.value.scatterType]

const closePanel = () => {
  console.log(layerConfig.value)
  panelContral.removePanel(layerConfig.value)
}
</script>
<style lang="less">
  .panelIndex {
    position: absolute;
    background: red;
  }
</style>
