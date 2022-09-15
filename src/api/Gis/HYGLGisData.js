import BaseGisData from './BaseGisData'

// 综合概览
export default class HYGLGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '水质检测站点':
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
