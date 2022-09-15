export default {
  topic: '行业管理',
  defaultView: {
    sceneName: 'LiJiang-L1',
    cameraName: '行业管理'
  },
  cardNames: {
    行业管理: {
      cardShowLegends: ['水质检测站点'],
      cardShowLayers: []
    }
  },
  allLayers: {
    水质检测站点: [
      {
        id: '散点-水质检测站点',
        layerType: '地标图',
        scatterType: '水质检测站点',
        coordZ: 0,
        jsonPath: './data/HangYeGuanLi/水质监测点.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-丽江市'
        }
      }
    ]
  }
}
