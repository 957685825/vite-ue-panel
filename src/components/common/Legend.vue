<script setup>
import { reactive, ref, watch } from 'vue'
import legends from '@/utils/configs/legends.js'
import { uesStore } from '../../store'

const store = uesStore()
defineProps({
  topicLegends: {
    type: String,
    default: '测试代码'
  }
})
// 当前主题配置的图例
const legendList = reactive([])
// 当前主题已经勾选显示的图层
let showLayerList = []

// 勾选图例
const select = (item) => {
  item.highlight = !item.highlight
  ctrlLayer(item.name, item.highlight)
}
// 当前主题配置默认显示图例
const showLegendList = ref([])

// 初始化当前主题的图层
const initTopicLayerList = async (val = store.$state.topic) => {
  legendList.value.forEach((item) => (item.highlight = false))
  showLayerList = []
  console.log(window.layerContral.cardNames[val].cardShowLegends)
  showLegendList.value = window.layerContral.cardNames[val].cardShowLegends
  legendList.value.forEach(item => {
    showLegendList.value.forEach(showLayer => {
      if (item.name === showLayer) {
        item.highlight = true
        ctrlLayer(showLayer, true)
      }
    })
  })
}

// 散点勾选后根据散点状态控制图层显隐
const ctrlLayer = (key, isShow) => {
  const layers = window.layerContral.allLayers[key]
  showLayerList.push(layers)
  layers && layers.forEach(layer => {
    if (isShow) {
      if (layer.status === 'false') {
        window.gisManager.addLayer(layer)
      } else if (layer.status === 'hide') {
        window.gisManager.showLayer(layer)
      }
    } else {
      window.gisManager.hideLayer(layer)
    }
  })
}

// 当主题切换的时候初始化图层
const InitLayer = async () => {
  if (store.$state.isAppInstance) {
    if (!showLayerList || showLayerList.length < 1) return
    showLayerList.forEach(layerList => {
      layerList.forEach(layer => {
        window.gisManager.hideLayer(layer)
      })
    })
    // 初始化这里需要异步操作---由于无法监听所有的散点隐藏回调，目前采用setTimeout异步方式
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 400)
    })
  }
}

// 设置卡片
const cardChange = async (cardName) => {
  const cardShowLayers = window.layerContral.cardNames[cardName].cardShowLayers
  if (cardShowLayers) {
    legendList.value.forEach(item => {
      cardShowLayers.forEach(showLayer => {
        if (item.name === showLayer) {
          ctrlLayer(showLayer, true)
        }
      })
    })
  }
}

// 监听场景是否加载完成
watch(
  () => store.$state.isAppInstance,
  async (val) => {
    if (val) {
      await InitLayer()
      initTopicLayerList()
      cardChange(store.$state.topic)
    }
  },
  { immediate: true, deep: true }
)

// 监听当前主题根据主题查找当前主题的图例
watch(
  () => store.$state.topic,
  async (val) => {
    if (val) {
      legendList.value = legends[store.$state.topic]
      if (store.$state.highLight) {
        store.setHighLight(val)
      }
      console.log(store.sceneName, window.layerContral.defaultView.sceneName)
      if (store.sceneName !== window.layerContral.defaultView.sceneName) {
        InitLayer().then(() => {
          window.gisManager.selectMenu(window.layerContral.defaultView)
        })
      } else {
        if (store.$state.isAppInstance) {
          InitLayer().then(() => {
            initTopicLayerList()
            cardChange(store.$state.topic)
          })
          console.log('初始化图层')
        }
      }
    }
  },
  { immediate: true, deep: true }
)
// 监听当前卡片高亮
watch(
  () => store.$state.highLight,
  async (val) => {
    if (val) {
      if (store.sceneName === window.layerContral.defaultView.sceneName) {
        await InitLayer().then(() => {
          initTopicLayerList(val)
        })
        await cardChange(val)
      }
    }
  },
  { immediate: true, deep: true }
)
</script>
<template>
  <div class="legend_warper" v-show="legendList?.value?.length > 0">
    <div class="legend_list">
      <div
        class="legned_item"
        v-for="(item, index) of legendList.value"
        :key="index"
        @click="select(item)"
      >
        <div class="icon">
          <img :src="item.imgUrl" alt />
        </div>
        <div class="txt">{{ item.name }}</div>
        <div class="checkbox">
          <div :class="item.highlight ? 'active' : ''"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.legend_warper {
  display: flex;
  justify-content: space-between;
  background: rgba(102, 76, 0, 0.6);
  border-top: solid 1px #F5BE43;
  padding: 10px 20px 1px;
  .legend_list {
    width: 320px;
    box-sizing: border-box;
    pointer-events: all;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .legned_item {
      width: 150px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .icon {
        width: 30px;
        margin-right: 5px;
        & > img {
          max-width: 30px;
        }
      }
      .txt {
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
        background-image: -webkit-linear-gradient(top, #fff, #c5fbfc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: 'PingFang SC';
      }
      .checkbox {
        width: 20px;
        height: 20px;
        border: solid 1px rgba(255, 255, 255, 0.85);
        box-sizing: border-box;
        // background: rgba(26, 53, 81, 0.85);
        cursor: pointer;
        .active {
          width: 13px;
          height: 13px;
          background: url('../../../public/img/legend/legend_checked.png')
            no-repeat;
          background-size: 10px 10px;
          background-position: 2px 4px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
