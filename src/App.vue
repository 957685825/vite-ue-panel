<script setup>
import { ref, onMounted, watch } from 'vue'
import Nav from './components/common/Nav.vue'
// import Header from '@/components/common/Header.vue'
import Streaming from '@/view/Streaming.vue'
import Legend from './components/common/Legend.vue'
import LayerContral from './utils/configs/layerContral'
import GisManager from './utils/GisManagers/GisManager'
import { useRouter } from 'vue-router'
import { uesStore } from './store'
import IframeHooks from './utils/hooks/iframeHooks'
const scale = ref(0)
const store = uesStore()
const layerContral = new LayerContral()
// 页面分辨率
const resolvingPower = {
  width: 3840,
  height: 1080
}

/**
 * 动态计算缩放值
 * scale 页面缩放值
 */
const setScreen = () => {
  const visibleWidth = window.innerWidth
  const visibleHeight = window.innerHeight
  const widthPercentage = (1.0 * visibleWidth) / resolvingPower.width
  const heightPercentage = (1.0 * visibleHeight) / resolvingPower.height
  scale.value = Math.min(widthPercentage, heightPercentage)
}
onMounted(() => {
  setScreen()
  window.addEventListener('resize', setScreen.bind(this))
  document.oncontextmenu = function (ev) {
    ev.preventDefault()
  }
  window.gisManager = new GisManager()
  // window.onmessage = (e) => {
  //   console.log(e.data)
  //   if (e.data.addlayer === '散点') {
  //     store.setHighLight('吃在丽江')
  //   }
  // }
  const hooks = new IframeHooks()
  hooks.init()
})

/**
 * 监听到路由变化后初始化地图图层
 * 根据主题拿到对应的图层配置
 */
const router = useRouter()
// console.log(router)
watch(
  () => router.currentRoute.value,
  (val) => {
    console.log(val)
    initMap(val.meta.cname)
  },
  { deep: true }
)
// 地图图层初始化
const initMap = (val) => {
  window.layerContral = layerContral.modules.filter(item => item.topic === val)[0]
  window.layerContral.cameraList = layerContral.cameraList
  store.setTopic(window.layerContral.topic)
}
</script>

<template>
  <div
    class="gis-container"
    :style="{
      transform:
        'translateX(-50%) translateY(-50%) translateZ(0) scale(' + scale + ')',
    }"
  >
    <Streaming></Streaming>
  </div>
  <div
    class="screen"
    :style="{
      transform:
        'translateX(-50%) translateY(-50%) translateZ(0) scale(' + scale + ')',
    }"
  >
    <Nav></Nav>
    <!-- <Header></Header> -->
    <div class="legend_pos">
      <Legend></Legend>
    </div>
    <!-- <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__bounceInLeft"
      leave-active-class="animate__bounceOutLeft"
      appear
      mode="out-in"
    >
      <router-view name="left"></router-view>
    </transition>
    <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut"
      appear
      mode="out-in"
    >
      <router-view name="center"></router-view>
    </transition>
    <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__bounceInRight"
      leave-active-class="animate__bounceOutRight"
      appear
      mode="out-in"
    >
      <router-view name="right"></router-view>
    </transition> -->
  </div>
</template>

<style scoped lang="less">
@appWidht: 3840px;
@appHeight: 1080px;
.gis-container {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  left: 50%;
  top: 50%;
  width: @appWidht;
  height: @appHeight;
}
.screen {
  position: absolute;
  // background: url(./assets/img/layout/mask.png) no-repeat center center;
  left: 50%;
  top: 50%;
  z-index: 2;
  width: @appWidht;
  height: @appHeight;
  pointer-events: none;
  overflow: hidden;
  .conation {
    width: 100%;
    height: 100%;
    // background: green;
  }
  .legend_pos {
    position: absolute;
    bottom: 20px;
    right: 850px;
    z-index: 100;
  }
}
</style>
