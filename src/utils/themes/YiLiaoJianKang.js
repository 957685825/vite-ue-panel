export default {
  topic: '医疗健康',
  defaultView: {
    sceneName: 'DXWZPY-L2',
    cameraName: '医疗健康'
  },
  cardNames: {
    医疗健康: {
      cardShowLegends: ['核酸检测点', '隔离酒店', '公立医疗机构', '私立医疗机构', '防控区', '封控区', '管控区'],
      cardShowLayers: []
    }
  },
  allLayers: {
    核酸检测点: [
      {
        id: '散点-核酸检测点',
        layerType: '地标图',
        scatterType: '核酸检测点',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/平阳县网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    隔离酒店: [
      {
        id: '散点-隔离酒店',
        layerType: '地标图',
        scatterType: '隔离酒店',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/街道网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    公立医疗机构: [
      {
        id: '散点-公立医疗机构',
        layerType: '地标图',
        scatterType: '公立医疗机构',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/无人机.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-无人机'
        }
      }
    ],
    私立医疗机构: [
      {
        id: '散点-私立医疗机构',
        layerType: '地标图',
        scatterType: '私立医疗机构',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/视频监控.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ],
    防控区: [
      {
        id: '数值区域图-防控区',
        name: '数值区域图',
        layerType: '数值区域图',
        scatterType: '防控区',
        jsonPath: './data/YiLiaoJianKang/防控区.json',
        coordZ: 50,
        alpha: 0.5,
        type: 'Grid01',
        areaHeight: 10,
        fillArea: 'none',
        colorMax: '#12c912',
        colorMin: '#12c912'
      }
    ],
    封控区: [
      {
        id: '数值区域图-封控区',
        name: '数值区域图',
        layerType: '数值区域图',
        scatterType: '封控区',
        jsonPath: './data/YiLiaoJianKang/封控区.json',
        coordZ: 50,
        alpha: 0.5,
        type: 'Grid01',
        areaHeight: 10,
        fillArea: 'none',
        colorMax: '#ff0000',
        colorMin: '#ff0000'
      }
    ],
    管控区: [
      {
        id: '数值区域图-管控区',
        name: '数值区域图',
        layerType: '数值区域图',
        scatterType: '管控区',
        jsonPath: './data/YiLiaoJianKang/管控区.json',
        coordZ: 50,
        alpha: 0.5,
        type: 'Grid01',
        areaHeight: 10,
        fillArea: 'none',
        colorMax: '#ff0000',
        colorMin: '#ffff00'
      }
    ]
  }
}
