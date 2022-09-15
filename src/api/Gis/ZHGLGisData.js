import BaseGisData from './BaseGisData'

// 综合概览
export default class ZHGLGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '企业':
      case '排污检测站点':
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
