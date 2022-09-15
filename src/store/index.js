import { defineStore } from 'pinia'
export const uesStore = defineStore({
  id: 'index',
  state: () => ({
    highLight: '', // 设置当前卡片的高亮
    isAppInstance: false, // 存储当前场景是否加载完成
    topic: '', // 记录当前主题
    sceneName: 'LiJiang-L0' // 记录当前场景
  }),
  getters: {

  },
  actions: {
    setHighLight (val) {
      this.highLight = val
    },
    setAppInstance (val) {
      this.isAppInstance = val
    },
    setTopic (val) {
      this.topic = val
    },
    setSceneName (val) {
      this.sceneName = val
    }
  }
})
