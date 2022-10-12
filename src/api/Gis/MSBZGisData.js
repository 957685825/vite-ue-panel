import BaseGisData from './BaseGisData'

// 综合概览
export default class MSBZGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '公办养老机构':
      case '私营养老机构':
      case '低保户分布':
      case '特困人员分布':
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
