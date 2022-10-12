import BaseGisData from './BaseGisData'

// 综合概览
export default class YLJKGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '核酸检测点':
      case '隔离酒店':
      case '公立医疗机构':
      case '私立医疗机构':
        BaseGisData.getLocal(layer, callback)
        break
      case '封控区':
      case '管控区':
      case '防控区':
        BaseGisData.getNumAreaData(layer, callback)
        break
    }
  }
}
