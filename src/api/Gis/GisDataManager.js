// import apiGet from '../Api'
import ZHGLGisData from './ZHGLGisData'
import HYGLGisData from './HYGLGisData'
import { uesStore } from '../../store'
export default class GisDataManager {
  static getData = async (layer, callback) => {
    // 获取主题数据
    this.getTopicData(layer, callback)
  }

  // 根据主题加载对应主题的图层数据
  static getTopicData = async (layer, callback) => {
    const store = uesStore()
    switch (store.$state.topic) {
      case '综合概览':
        ZHGLGisData.getData(layer, callback)
        break
      case '行业管理':
        HYGLGisData.getData(layer, callback)
        break
    }
  }
}
