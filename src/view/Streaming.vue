<script setup>
import { onMounted, watch } from 'vue'
import { uesStore } from '../store'
const store = uesStore()
const init = () => {
  // eslint-disable-next-line no-undef
  const appInstance = new TGApp.App()
  window.appInstance = appInstance
  const streamingConfig = window.streamingConfig
  appInstance.initScene({
    container: document.getElementById('container'),
    mode: 'streaming3',
    token: streamingConfig.token,
    url: streamingConfig.url,
    resolution: [streamingConfig.width, streamingConfig.height],
    isShareToken: false
  })
}
onMounted(() => {
  init()
  registerMessage()
})

// 监听场景初次加载完成
const onSceneInit = () => {
  console.log('当前场景加载完成')
  store.setAppInstance(true)
  window.gisManager.camera.restrictCamera()
  window.gisManager.selectMenu(window.layerContral.defaultView)
  window.gisManager.addTopicDefault()
}

// 监听当前场景切换完成后设置相机位置
const onSceneSwitch = () => {
  store.setSceneName(window.layerContral.defaultView.sceneName)
  store.setAppInstance(true)
  console.log('场景切换完成')
  window.gisManager.camera.restrictCamera()
  const cameraInfo = window.layerContral.cameraList.get(window.layerContral.defaultView.cameraName)
  window.gisManager.camera.setCamera(cameraInfo)
  window.gisManager.addTopicDefault()
}
// ue事件监听
const registerMessage = () => {
  // 监听场景初始化完成
  window.appInstance.uniCall('addEventListener', {
    eventName: 'onSceneInit',
    callback: onSceneInit
  })
  // 监听场景切换事件
  window.appInstance.uniCall('addEventListener', {
    eventName: 'onSceneSwitch',
    callback: onSceneSwitch
  })
  window.appInstance.uniCall(
    'setLogMode',
    {
      mode: true
    })
}
watch(
  () => store.$state.topic,
  (val) => {
    if (val) {
      // setTimeout(() => {
      //   window.gisManager.selectMenu(window.layerContral.defaultView)
      // })
    }
  },
  { immediate: true, deep: true }
)
</script>
<template>
  <div id="container"></div>
</template>
<style lang="less">
#container {
  width: 7450px;
  height: 2160px;
}
</style>
