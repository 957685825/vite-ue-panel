import BaseGisData from './BaseGisData'

// 综合概览
export default class CSZLGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '公交车':
        BaseGisData.getTrailData(layer, callback)
        break
      case '104国道交通流量':
        BaseGisData.getPathData(layer, callback)
        break
      case '公交站点':
      case '客运站点':
      case '客运站布局':
      case '货运站布局':
      case '视频监控':
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
