export default {
  topic: '城市治理',
  defaultView: {
    sceneName: 'DXWZPY-L2',
    cameraName: '城市治理'
  },
  cardNames: {
    城市治理: {
      cardShowLegends: ['平阳县网格', '镇(街)道网格', '村(社区)网格', '全科网格', '微网格', '事件热力图', '无人机', '视频监控', '城市部件', 'AI摄像头', '工单点位', '告警点位'],
      cardShowLayers: []
    }
  },
  allLayers: {
    平阳县网格: [
      {
        id: '散点-平阳县网格',
        layerType: '地标图',
        scatterType: '平阳县网格',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/平阳县网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-平阳县网格'
        }
      }
    ],
    '镇(街)道网格': [
      {
        id: '散点-街道网格',
        layerType: '地标图',
        scatterType: '镇(街)道网格',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/街道网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-街道网格'
        }
      }
    ],
    '村(社区)网格': [
      {
        id: '散点-村社区网格',
        layerType: '地标图',
        scatterType: '村(社区)网格',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/村社区网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-村社网格'
        }
      }
    ],
    全科网格: [
      {
        id: '散点-全科网格',
        layerType: '地标图',
        scatterType: '全科网格',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/全科网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-全科网格'
        }
      }
    ],
    微网格: [
      {
        id: '散点-微网格',
        layerType: '地标图',
        scatterType: '微网格',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/微网格.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-微网格'
        }
      }
    ],
    事件热力图: [
      {
        id: '热力-事件热力图',
        name: '热力-事件热力图',
        layerType: '热力图',
        scatterType: '事件热力图',
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
    无人机: [
      {
        id: '散点-无人机',
        layerType: '地标图',
        scatterType: '无人机',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/无人机.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-无人机'
        }
      }
    ],
    视频监控: [
      {
        id: '散点-视频监控',
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
    ],
    AI摄像头: [
      {
        id: '散点-AI摄像头',
        layerType: '地标图',
        scatterType: 'AI摄像头',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/AI摄像头.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-AI摄像头'
        }
      }
    ],
    工单点位: [
      {
        id: '散点-工单点位',
        layerType: '地标图',
        scatterType: '工单点位',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/工单点位.json',
        legend: {
          name: 'chezha',
          color: '#ffff',
          iconName: 'custom-工单点位'
        }
      }
    ],
    告警点位: [
      {
        id: '散点-告警点位',
        layerType: '地标图',
        scatterType: '告警点位',
        jsonPath: './data/ChengShiZhiLi/告警点位.json',
        isClick: true,
        coordZ: 0,
        legend: {
          name: 'gaojing',
          color: '#ffff',
          iconName: 'custom-告警点位'
        }
      },
      {
        id: '气泡-告警点位',
        layerType: '气泡图',
        scatterType: '告警点位',
        coordZ: 0,
        jsonPath: './data/ChengShiZhiLi/告警点位.json',
        layerName: '气泡-告警点位',
        speed: 200,
        radiusMax: 200,
        radiusMin: 100,
        legend: {
          name: 'legend01',
          color: '#ff0000'
        }
      }
    ],
    渣土车辆: [
      {
        id: '轨迹图-重点车辆',
        name: '轨迹图-重点车辆',
        layerType: '轨迹图',
        scatterType: '渣土车辆',
        jsonPath: './data/ChengShiZhiLi/渣土车辆.json',
        trackStyle: 'style001',
        trackWidth: 10,
        objLife: 500,
        trackDuration: 5,
        delay: 1000,
        coordZ: 0,
        legend: {
          name: '渣土车辆',
          trackColor: '#ff00',
          iconName: 'custom-渣土车辆'
        }
      }
    ]
  }
}
