import BaseGisData from './BaseGisData'

// 综合概览
export default class PYQJGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '企业':
      case '排污检测站点':
      case '区县':
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
