export default {
  topic: '民生保障',
  defaultView: {
    sceneName: 'DXWZPY-L2',
    cameraName: '民生保障'
  },
  cardNames: {
    民生保障: {
      cardShowLegends: [],
      cardShowLayers: []
    }
  },
  allLayers: {
    公办养老机构: [
      {
        id: '散点-公办养老机构',
        layerType: '地标图',
        scatterType: '公办养老机构',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/平阳县网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    私营养老机构: [
      {
        id: '散点-私营养老机构',
        layerType: '地标图',
        scatterType: '私营养老机构',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/街道网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    低保户分布: [
      {
        id: '热力-低保户分布',
        name: '热力-低保户分布',
        layerType: '热力图',
        scatterType: '低保户分布',
        jsonPath: './data/ChengShiZhiLi/事件热力图.json',
        coordZ: 0,
        type: 'default',
        alpha: 0.3,
        // valueMax: 100,
        // valueMin: 20,
        colorMax: '#ff0000',
        colorMin: '#ffff00',
        radius: 180
      }
    ],
    特困人员分布: [
      {
        id: '热力-特困人员分布',
        name: '热力-特困人员分布',
        layerType: '热力图',
        scatterType: '特困人员分布',
        jsonPath: './data/ChengShiZhiLi/事件热力图.json',
        coordZ: 0,
        type: 'default',
        alpha: 0.3,
        // valueMax: 100,
        // valueMin: 20,
        colorMax: '#ff0000',
        colorMin: '#ffff00',
        radius: 180
      }
    ]
  }
}
