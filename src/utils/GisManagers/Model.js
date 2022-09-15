import GisBase from './GisBase';
/**模型 */
export default class Model extends GisBase {
  constructor() {
    super('模型');
  }

  defaultConfig = {
    coordType: 0,
    coordTypeZ: 0,
  };

  //#region 基础控制

  /**
   * 设置模型基础变换
   * @param {Object} modelConfig 配置
   */
  setModelTransform(modelConfig) {
    let config = {
      id: 'modelId',
      coordType: 0,
      coordTypeZ: 0,
      coord: [114.560257, 37.09079],
      coordZ: 10,
      rotation: [20, 80, 90],
      scale: [0.1, 1, 10],
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('setModelTransform', config, (res) => {
      super.setCallBack('设置模型基础变换', res);
    });
  }

  /**
   * 设置模型数据
   * @param {Object} modelConfig 配置
   */
  setModelCoord(modelConfig) {
    let config = {
      id: 'modelId',
      coordType: 0,
      coordTypeZ: 0,
      coord: [114.560257, 37.09079],
      coordZ: 10,
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('setModelCoord', config, (res) => {
      super.setCallBack('设置模型数据', res);
    });
  }

  /**
   * 设置模型样式
   * @param {string} id 配置
   * @param {string} isShow 配置
   */
  setModelVisible(id, isShow) {
    let config = {
      id: id, // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      alpha: isShow ? 1 : 0, // 模型透明度，0：完全透明；1：完全不透明
    };
    window.appInstance.uniCall('setModelStyle', config, (res) => {
      super.setCallBack('设置模型样式' + config.id, res);
    });
  }

  /**
   * 设置模型样式
   * @param {Object} modelConfig 配置
   */
  setModelStyle(modelConfig) {
    let config = {
      id: 'modelId', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      alpha: 1, // 模型透明度，0：完全透明；1：完全不透明
      scale: 1, // 模型整体放缩倍数（单位：倍）
      maskType: 'none', // 模型遮罩样式类别，color：颜色遮罩；picture：图片遮罩；none：无遮罩
      maskAlpha: 1, // 遮罩透明度，0：完全透明；1：完全不透明
      maskColor: '#ff0000', // 遮罩颜色（HEX 颜色值）
      maskPicture: 'arrow', //内置遮罩样式；或根据项目，在场景中预置好的图片 URL   './scene/texture/backgroundImage.png',
      maskPictureScale: 1.0, // 遮罩贴图的比例系数
      maskFlowSpeed: 1.0, // 遮罩贴图的流动速度系数
      maskFlowDirection: 90, // 遮罩贴图 UV 流动方向角度， 0-360 度
      xRay: 'off', // X 光样式（半透明效果，且不会被前方物体遮挡）开关，on：开启 X 光效果；off：关闭 X 光效果
    };
    let resConfig = Object.assign({}, config, modelConfig);
    window.appInstance.uniCall('setModelStyle', resConfig, (res) => {
      super.setCallBack('设置模型样式' + resConfig.id, res);
    });
  }

  /**
   * 设置模型关节数据
   * @param {Object} modelConfig 配置
   */
  setModelArticulation(modelConfig) {
    let config = {
      id: 'modelId',
      isAppend: true,
      data: [
        {
          articulation: 'articulationName01',
          type: 'float',
          value: '15',
        },
        {
          articulation: 'articulationName02',
          type: 'enum',
          value: 'String001',
        },
        {
          articulation: 'articulationName03',
          type: 'bool',
          value: 'false',
        },
      ],
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('setModelArticulation', config, (res) => {
      super.setCallBack('设置模型关节数据', res);
    });
  }

  /**
   * 添加模型Tip
   * @param {Object} modelConfig 配置
   */
  addModelTip(modelConfig) {
    let config = {
      id: 'modelId',
      url: 'http://www.tuguan.net/testdlg.html',
      size: [500, 300],
      offset: [100, -30],
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('addModelTip', config, (res) => {
      super.setCallBack('添加模型Tip', res);
    });
  }

  /**
   * 设置模型数据
   */
  getModelsByType(callback) {
    let config = { modelType: 'model' };
    window.appInstance.uniCall('getModelsByType', config, (res) => {
      super.setCallBack('设置模型数据', res);
      callback && callback(res.result);
    });
  }

  /**
   * 设置模型数据
   * @param {string} type 配置
   * @param {boolean} isVisble 配置
   */
  setModelsVisibleByType(type, isVisble) {
    let config = { modelType: type };
    window.appInstance.uniCall('getModelsByType', config, (res) => {
      if (res.result && res.data) {
        res.data.forEach((item) => {
          this.setModelVisible(item.id, isVisble);
        });
      }
    });
  }

  //#endregion

  //#region 模型选择

  /**
   * 开始框选模型
   * @param {Object} modelConfig 配置
   */
  selectModel(modelConfig) {
    let config = { modelType: 'model', type: 'rect' };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('selectModel', config, (res) => {
      super.setCallBack('开始框选模型', res);
    });
  }

  /**
   * 结束框选模型
   */
  endSelectModel() {
    window.appInstance.uniCall('endSelectModel', {}, (res) => {
      super.setCallBack('结束框选模型', res);
    });
  }

  /**
   ;* 设置模型可点击
   * @param {string} type 配置
   */
  setModelClick(type, callback) {
    window.appInstance.uniCall(
      'pickModel',
      { modelType: type, type: 'click' },
      (res) => {
        window.appInstance.uniCall('onModelClick', {}, (res) => {
          callback && callback(res.result);
        });
      }
    );
  }

  /**
   * 开始单选模型
   * @param {Object} modelConfig 配置
   */
  pickModel(modelConfig) {
    let config = { modelType: 'model', type: 'click' };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('pickModel', config, (res) => {
      super.setCallBack('开始单选模型', res);
    });
  }

  /**
   * 结束单选模型
   */
  endPickModel() {
    window.appInstance.uniCall('endPickModel', {}, (res) => {
      super.setCallBack('结束单选模型', res);
    });
  }

  /**
   * 点击模型
   * @param {Object} modelConfig 配置
   */
  clickModel(modelConfig) {
    let config = { id: 'modeljId', modelType: 'model', selected: true };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('clickModel', config, (res) => {
      super.setCallBack('点击模型', res);
    });
  }

  /**
   * 点击模型类别
   * @param {Object} modelConfig 配置
   */
  clickModelType(modelConfig) {
    let config = { modelType: 'model', selected: true };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('clickModelType', config, (res) => {
      super.setCallBack('点击模型类别', res);
    });
  }

  /**
   * 清除模型选择状态
   * @param {Object} modelConfig 配置
   */
  clearModelSelected() {
    window.appInstance.uniCall('clearModelSelected', {}, (res) => {
      super.setCallBack('清除模型选择状态', res);
    });
  }

  //#endregion

  //#region 模型行为

  /**
   * 持续旋转模型
   * @param {Object} modelConfig 配置
   */
  rotatingModel(modelConfig) {
    let config = {
      id: 'modelId',
      durationX: 20,
      durationY: 0,
      durationZ: 0,
      directionX: 'clockwise',
      directionY: 'clockwise',
      directionZ: 'clockwise',
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('rotatingModel', config, (res) => {
      super.setCallBack('持续旋转模型', res);
    });
  }

  /**
   * 设置模型持续旋转状态
   * @param {Object} modelConfig 配置
   */
  setModelRotationState(modelConfig) {
    let config = { id: 'idObj', state: 'stop' };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('setModelRotationState', config, (res) => {
      super.setCallBack('设置模型持续旋转状态', res);
    });
  }

  /**
   * 持续闪烁模型
   * @param {Object} modelConfig 配置
   */
  blinkingModel(modelConfig) {
    let config = {
      id: 'modelId',
      duration: 0.5,
      color: '#ff0000',
      type: 'type01',
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('blinkingModel', config, (res) => {
      super.setCallBack('持续闪烁模型', res);
    });
  }

  /**
   * 设置模型持续闪烁状态
   * @param {Object} modelConfig 配置
   */
  setModelBlinkState(modelConfig) {
    let config = { id: 'modelId', state: 'stop' };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('setModelBlinkState', config, (res) => {
      super.setCallBack('设置模型持续闪烁状态', res);
    });
  }

  /**
   * 持续移动模型
   * @param {Object} modelConfig 配置
   */
  movingModel(modelConfig) {
    let config = {
      id: 'modelId',
      coordType: 0,
      coordTypeZ: 0,
      loopMode: 'round',
      reverse: false,
      direction: 'path',
      offset: [100, -30, 900],
      points: [
        {
          coord: [134.55, 34.577],
          coordZ: 1,
        },
        {
          coord: [134.59, 33.577],
          coordZ: 2,
          speed: 2,
        },
      ],
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('movingModel', config, (res) => {
      super.setCallBack('持续移动模型', res);
    });
  }

  /**
   * 设置模型持续移动状态
   * @param {Object} modelConfig 配置
   */
  setModelMoveState(modelConfig) {
    let config = { id: 'modelId', state: 'stop' };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('setModelMoveState', config, (res) => {
      super.setCallBack('设置模型持续移动状态', res);
    });
  }

  /**
   * 持续路径移动模型
   * @param {Object} modelConfig 配置
   */
  pathingModel(modelConfig) {
    let config = {
      id: 'modelId',
      pathId: 'pathId',
      loopMode: 'round',
      reverse: false,
      direction: 'path',
      offset: [100, -30, 900],
      speed: 2,
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('pathingModel', config, (res) => {
      super.setCallBack('持续路径移动模型', res);
    });
  }

  /**
   * 设置模型持续路径移动状态
   * @param {Object} modelConfig 配置
   */
  setModelPathingState(modelConfig) {
    let config = { state: 'stop' };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('setModelPathingState', config, (res) => {
      super.setCallBack('设置模型持续路径移动状态', res);
    });
  }

  //#endregion

  //#region 模型：建筑

  /**
   * 拆解建筑楼层
   * @param {Object} modelConfig 配置
   */
  showBuildingFloor(modelConfig) {
    let config = { id: 'buildingId', floor: 1, animation: 1 };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('showBuildingFloor', config, (res) => {
      super.setCallBack('拆解建筑楼层', res);
    });
  }

  /**
   * 恢复建筑外观
   * @param {Object} modelConfig 配置
   */
  resetBuildingFloor(modelConfig, callback) {
    let config = { id: 'buildingId', animation: 1 };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('resetBuildingFloor', config, (res) => {
      super.setCallBack('恢复建筑外观', res);
      callback && callback(res.result);
    });
  }

  /**
   * 高亮建筑
   * @param {Object} modelConfig 配置
   */
  highlightBuilding(modelConfig) {
    let config = { id: 'buildingId', type: 'style1' };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('highlightBuilding', config, (res) => {
      super.setCallBack('高亮建筑', res);
    });
  }

  /**
   * 高亮楼层
   * @param {Object} modelConfig 配置
   */
  highlightFloor(modelConfig) {
    let config = { id: 'buildingId', floor: 1, type: 'style1' };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('highlightFloor', config, (res) => {
      super.setCallBack('高亮楼层', res);
    });
  }

  /**
   * 高亮房间
   * @param {Object} modelConfig 配置
   */
  highlightRoom(modelConfig) {
    let config = {
      id: 'buildingId',
      floor: 1,
      room: 'roomName',
      type: 'style1',
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall('highlightRoom', config, (res) => {
      super.setCallBack('高亮房间', res);
    });
  }

  /**
   * 获取建筑信息
   */
  getBuilding() {
    window.appInstance.uniCall('getBuilding', {}, (res) => {
      super.setCallBack('获取建筑信息', res);
    });
  }

  /**
   * 根据建筑信息获取模型ID
   */
  getModelIdBuilding() {
    window.appInstance.uniCall('getModelIdBuilding', {}, (res) => {
      super.setCallBack('根据建筑信息获取模型ID', res);
    });
  }

  //#endregion

  //#region 模型:特殊

  /**
   * 设置3dmarker显隐
   * @param {string} id 3dmarkerid
   * @param {bool} isVisible 是否显示
   */
  set3DMarkerVisible(id, isVisible) {
    appInstance.uniCall('setOverlayVisibility', {
      id: id,
      overlayType: '3DMarker',
      visible: isVisible,
    });
  }

  /**
   * 删除3dmarker
   * @param {string} id 3dmarkerid
   */
  remove3DMarker(id) {
    appInstance.uniCall('removeOverlay', {
      id: id,
      overlayType: '3DMarker',
    });
  }

  /**
   * 添加场景特效
   * @param {Object} modelConfig 配置
   * @param {Function} callback 回调函数
   */
  add3DMarker(modelConfig, callback) {
    let config = {
      id: '3DMarker',
      coordType: 0,
      coordTypeZ: 0,
      alpha: 0.8,
      scale: 25,
      type: 'Spread04',
      titleText: '',
      coord: [114.560257, 37.09079],
      coordZ: 10,
    };
    super.copyObject(modelConfig, config, [
      'id',
      'alpha',
      'scale',
      'type',
      'titleText',
      'coord',
      'coordZ',
    ]);
    window.appInstance.uniCall('add3DMarker', config, (res) => {
      super.setCallBack('添加场景特效' + config.id, res);
      if (callback) {
        callback(res.result != 0);
      }
    });
  }

  /**
   * 更新场景特效数据点
   * @param {Object} modelConfig 配置
   */
  update3DMarkerCoord(modelConfig) {
    let config = {
      id: '3DMarker',
      coordType: 0,
      coordTypeZ: 0,
      coord: [114.560257, 37.09079],
      coordZ: 10,
    };
    super.copyObject(modelConfig, config, ['id', 'coord', 'coordZ']);
    window.appInstance.uniCall('update3DMarkerCoord', config, (res) => {
      // 无回调
    });
  }

  /**
   * 更新场景特效样式
   * @param {Object} modelConfig 配置
   */
  update3DMarkerStyle(modelConfig) {
    let config = {
      id: '3DMarkerId',
      alpha: 0.5,
      scale: 25,
      type: 'Spread04',
      titleText: '告警',
    };
    super.copyObject(modelConfig, config, [
      'id',
      'alpha',
      'scale',
      'type',
      'titleText',
    ]);
    window.appInstance.uniCall('update3DMarkerStyle', config, (res) => {
      super.setCallBack('更新场景特效样式' + config.id, res);
    });
  }

  //#endregion

  /**
   *
   * @param {string} animationName 动画名称
   * @param {string} state 动画状态
   */
  playAnimation(animationName, state) {
    let config = {
      animationName: animationName,
      state: state,
    };
    window.appInstance.uniCall('playAnimation', config, (res) => {
      super.setCallBack('播放动画' + config.animationName);
    });
  }
}
