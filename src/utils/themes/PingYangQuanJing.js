export default {
  topic: '平阳全景',
  defaultView: {
    sceneName: 'DXWZPY-L0',
    cameraName: '平阳全景'
  },
  defaultLayer: {
    id: '散点-区县',
    layerType: '地标图',
    scatterType: '区县',
    coordZ: 1400,
    isShowLabel: false,
    jsonPath: './data/common/区县.json'
  },
  // 3D特效
  defaultMarkers: {
    coordType: 0,
    coordTypeZ: 0,
    alpha: 1,
    scale: 600,
    type: 'Spread08',
    titleColor: '#ffffff',
    coordZ: 850,
    jsonPath: './data/common/区县.json'
  },
  cardNames: {
    平阳全景: {
      cardShowLegends: [],
      cardShowLayers: []
    },
    全省GDP排名: {
      cardShowLegends: [],
      cardShowLayers: ['全省GDP排名柱图']
    }
  },
  allLayers: {
    全省GDP排名柱图: [
      {
        id: '全省GDP排名-柱图',
        name: '柱图',
        layerType: '柱状图',
        scatterType: '全省GDP排名柱图',
        isClick: true,
        jsonPath: './data/ZongTiTaiShi/安保人员.json',
        coordZ: 0,
        columnType: 'cylinder',
        columnMinHeight: 1,
        columnMaxHeight: 100,
        columnAlpha: 0.6,
        columnPaint: 'solid',
        columnGap: 0,
        columnWidth: 10,
        colorMax: '#ff0000',
        colorMin: '#ffff00',
        labelColor: '#333',
        labelBackgroundColor: '#ffffff00'
      }
    ],
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
