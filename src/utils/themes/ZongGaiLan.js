export default {
  topic: '综合概览',
  defaultView: {
    sceneName: 'LiJiang-L0',
    cameraName: '综合概览'
  },
  cardNames: {
    综合概览: {
      cardShowLegends: ['企业', '执法人员'],
      cardShowLayers: []
    },
    吃在丽江: {
      cardShowLegends: ['企业'],
      cardShowLayers: ['排污检测站点']
    }
  },
  allLayers: {
    企业: [
      {
        id: '散点-车闸',
        layerType: '地标图',
        scatterType: '企业',
        coordZ: 0,
        jsonPath: './data/ZongHeGaiLan/企业.json',
        legend: {
          name: '摄像头',
          color: '#ffff',
          iconName: 'custom-视频'
        }
      }
    ],
    执法人员: [
      {
        id: '散点-执法人员',
        layerType: '地标图',
        scatterType: '企业',
        coordZ: 0,
        jsonPath: './data/ZongHeGaiLan/酒吧.json',
        legend: {
          name: '摄像头',
          color: '#ffff',
          iconName: 'custom-停车场'
        }
      }
    ],
    排污检测站点: [
      {
        id: '散点-排污检测站点',
        layerType: '地标图',
        scatterType: '排污检测站点',
        coordZ: 0,
        jsonPath: './data/ZongHeGaiLan/景区.json',
        isClick: true,
        legend: {
          name: '排污检测站点',
          color: '#ffff',
          iconName: 'custom-宁蒗彝族自治县'
        }
      }
    ]
  }
}
