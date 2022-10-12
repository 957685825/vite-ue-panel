import BaseGisData from './BaseGisData'

// 综合概览
export default class ZHJYGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '高中':
      case '特殊教育':
      case '小学':
      case '中职':
      case '初中':
      case '幼儿园':
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
