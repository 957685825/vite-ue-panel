import apiGet from '../Api'
import PYQJGisData from './PYQJGisData'
import CSZLGisData from './CSZLGisData'
import JJYXGisData from './JJYXGisData'
import CSZGGisData from './CSZGGisData'
import MSBZGisData from './MSBZGisData'
import YLJKGisData from './YLJKGisData'
import ZHJYGisData from './ZHJYGisData'
import { uesStore } from '../../store'
export default class GisDataManager {
  static getJsonData = async (url, callback) => {
    const data = apiGet(url)
    data.then(res => {
      callback && callback(res)
    })
  }

  static getData = async (layer, callback) => {
    // 获取主题数据
    this.getTopicData(layer, callback)
  }

  // 根据主题加载对应主题的图层数据
  static getTopicData = async (layer, callback) => {
    const store = uesStore()
    switch (store.$state.topic) {
      case '平阳全景':
        PYQJGisData.getData(layer, callback)
        break
      case '城市治理':
        CSZLGisData.getData(layer, callback)
        break
      case '经济运行':
        JJYXGisData.getData(layer, callback)
        break
      case '城市智管':
        CSZGGisData.getData(layer, callback)
        break
      case '民生保障':
        MSBZGisData.getData(layer, callback)
        break
      case '医疗健康':
        YLJKGisData.getData(layer, callback)
        break
      case '智慧教育':
        ZHJYGisData.getData(layer, callback)
        break
    }
  }
}
