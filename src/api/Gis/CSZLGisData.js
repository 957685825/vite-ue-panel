import BaseGisData from './BaseGisData'

// 综合概览
export default class CSZLGisData {
  static getData = (layer, callback) => {
    switch (layer.scatterType) {
      case '平阳县网格':
      case '镇(街)道网格':
      case '村(社区)网格':
      case '全科网格':
      case '微网格':
      case '事件热力图':
      case '无人机':
      case '视频监控':
      case '城市部件':
      case 'AI摄像头':
      case '网格员':
      case '渣土车辆':
      case '告警点位':
      case '工单点位':
      case '菜市场':
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
