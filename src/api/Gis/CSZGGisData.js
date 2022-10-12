import BaseGisData from './BaseGisData'

// 综合概览
export default class CSZGGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '水库':
      case '降雨监测点':
      case '加油站':
      case '露天矿山数':
      case '烟花爆竹经营点':
      case '化工及危化品企业':
      case '非煤矿山':
      case '自来水厂':
      case '城市部件':
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
