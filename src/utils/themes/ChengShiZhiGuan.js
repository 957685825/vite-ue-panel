export default {
  topic: '城市智管',
  defaultView: {
    sceneName: 'DXWZPY-L2',
    cameraName: '城市智管'
  },
  cardNames: {
    城市智管: {
      cardShowLegends: ['水库', '降雨检测点', '加油站', '露天矿山数', '烟花爆竹经营点', '化工及危化品企业', '非煤矿山', '自来水厂', '城市部件'],
      cardShowLayers: []
    }
  },
  allLayers: {
    水库: [
      {
        id: '散点-水库',
        layerType: '地标图',
        scatterType: '水库',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/平阳县网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    降雨监测点: [
      {
        id: '散点-降雨监测点',
        layerType: '地标图',
        scatterType: '降雨监测点',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/街道网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-街道网格'
        }
      }
    ],
    加油站: [
      {
        id: '散点-加油站',
        layerType: '地标图',
        scatterType: '加油站',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/村社区网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-村社网格'
        }
      }
    ],
    露天矿山数: [
      {
        id: '散点-露天矿山数',
        layerType: '地标图',
        scatterType: '露天矿山数',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/全科网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-全科网格'
        }
      }
    ],
    烟花爆竹经营点: [
      {
        id: '散点-烟花爆竹经营点',
        layerType: '地标图',
        scatterType: '烟花爆竹经营点',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/微网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-微网格'
        }
      }
    ],
    化工及危化品企业: [
      {
        id: '散点-化工及危化品企业',
        layerType: '地标图',
        scatterType: '化工及危化品企业',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/菜市场.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-菜市场'
        }
      }
    ],
    非煤矿山: [
      {
        id: '散点-非煤矿山',
        layerType: '地标图',
        scatterType: '非煤矿山',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/无人机.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-无人机'
        }
      }
    ],
    自来水厂: [
      {
        id: '散点-自来水厂',
        layerType: '地标图',
        scatterType: '自来水厂',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/视频监控.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ],
    城市部件: [
      {
        id: '散点-城市部件',
        layerType: '地标图',
        scatterType: '城市部件',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/城市部件.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-城市部件'
        }
      }
    ]
  }
}
