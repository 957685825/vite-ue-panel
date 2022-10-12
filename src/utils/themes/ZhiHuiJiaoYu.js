export default {
  topic: '智慧教育',
  defaultView: {
    sceneName: 'DXWZPY-L2',
    cameraName: '智慧教育'
  },
  cardNames: {
    智慧教育: {
      cardShowLegends: ['初中', '高中', '中职', '小学', '幼儿园', '特殊教育'],
      cardShowLayers: []
    }
  },
  allLayers: {
    高中: [
      {
        id: '散点-高中',
        layerType: '地标图',
        scatterType: '高中',
        coordZ: 0,
        jsonPath: './data/JingJiYunXing/公交站.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    初中: [
      {
        id: '散点-初中',
        layerType: '地标图',
        scatterType: '初中',
        coordZ: 0,
        jsonPath: './data/JingJiYunXing/客运站.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    小学: [
      {
        id: '散点-视频监控-小学',
        layerType: '地标图',
        scatterType: '小学',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/视频监控.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ],
    幼儿园: [
      {
        id: '散点-幼儿园',
        layerType: '地标图',
        scatterType: '幼儿园',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/视频监控.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ],
    中职: [
      {
        id: '散点-中职',
        layerType: '地标图',
        scatterType: '中职',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/视频监控.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ],
    特殊教育: [
      {
        id: '散点-特殊教育',
        layerType: '地标图',
        scatterType: '特殊教育',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/微网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ]
  }
}
