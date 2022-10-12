export default {
  topic: '经济运行',
  defaultView: {
    sceneName: 'DXWZPY-L2',
    cameraName: '经济运行'
  },
  cardNames: {
    经济运行: {
      cardShowLegends: ['公交站点', '客运站点', '104国道交通流量', '视频监控', '客运站布局', '货运站布局'],
      cardShowLayers: []
    }
  },
  allLayers: {
    // 公交车: [
    //   {
    //     id: '轨迹图-重点车辆',
    //     name: '轨迹图-重点车辆',
    //     layerType: '轨迹图',
    //     scatterType: '公交车',
    //     jsonPath: './data/JingJiYunXing/公交车.json',
    //     trackStyle: 'style001',
    //     trackWidth: 10,
    //     objLife: 500,
    //     trackDuration: 5,
    //     delay: 1000,
    //     coordZ: 0,
    //     legend: {
    //       name: '公交车',
    //       trackColor: '#ff00',
    //       iconName: 'custom-渣土车辆'
    //     }
    //   }
    // ],
    公交站点: [
      {
        id: '散点-公交站点',
        layerType: '地标图',
        scatterType: '公交站点',
        coordZ: 0,
        jsonPath: './data/JingJiYunXing/公交站.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    客运站点: [
      {
        id: '散点-客运站',
        layerType: '地标图',
        scatterType: '客运站点',
        coordZ: 0,
        jsonPath: './data/JingJiYunXing/客运站.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    '104国道交通流量': [
      {
        id: '路径-104国道交通流量',
        name: '路径-104国道交通流量',
        layerType: '路径',
        scatterType: '104国道交通流量',
        coordZ: 0,
        jsonPath: './data/JingJiYunXing/线路.json',
        type: 'Arrow02',
        color: '#00B285',
        colorPass: '#00B285',
        width: 20
      }
    ],
    视频监控: [
      {
        id: '散点-视频监控-经济运行',
        layerType: '地标图',
        scatterType: '视频监控',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/视频监控.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ],
    客运站布局: [
      {
        id: '散点-客运站布局-经济运行',
        layerType: '地标图',
        scatterType: '客运站布局',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/视频监控.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ],
    货运站布局: [
      {
        id: '散点-货运站布局-经济运行',
        layerType: '地标图',
        scatterType: '货运站布局',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/视频监控.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-视频监控'
        }
      }
    ]
  }
}
