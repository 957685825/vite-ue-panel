import GisBase from './GisBase';
/* global _ */

/**相机 */
export default class Camera extends GisBase {
  constructor() {
    super('相机');
  }

  /**
   * 设置场景镜头视界
   * @param {string} cameraName 配置
   * @param {number} duration 配置 数值飞行秒数
   */
  setCameraByName(cameraName, duration, callback) {
    // if (window.layerConfigs.currentCameraName == cameraName) {
    //   return;
    // }
    let cameraInfo = window.layerConfigs.cameraInfos.get(cameraName).info;
    let temp = _.clone(cameraInfo);
    if (duration) {
      temp.fly = true;
      temp.duration = duration;
    }
    if (cameraInfo) {
      window.appInstance.uniCall('setCamera', temp, (res) => {
        super.setCallBack('设置场景镜头视界', cameraName, res);
        callback && callback(res.result);
        window.layerConfigs.currentCameraName = cameraName;
      });
    }
  }

  /**
   * 设置场景镜头视界
   * @param {Object} config 配置
   */
  setCamera(config, callback) {
    let temp = {
      centerCoord: [113.880928, 22.881271],
      coordType: 0,
      coordTypeZ: 0,
      coordZ: 36,
      distance: 269,
      heading: 133,
      pitch: 18,
    };
    if (config) {
      temp = config;
    } else {
      if (this.currentView) {
        temp = this.currentView;
      }
    }
    window.appInstance.uniCall('setCamera', temp, (res) => {
      super.setCallBack('设置场景镜头视界', res);
      callback && callback(res.result);
    });
  }

  /**递归设置场景直至成功 */
  setCameraSuccess(config, callback) {
    window.appInstance.uniCall('setCamera', config, (res) => {
      if (res.result) {
        super.setCallBack('设置场景镜头视界', res);
        callback && callback(res.result);
      } else {
        this.setCameraSuccess(config, callback);
      }
    });
  }

  currentView = '';
  /**获取当前视角 */
  getCameraInfo(callback) {
    this.currentView = '';
    return window.appInstance.uniCall('getCameraInfo', {}, (res) => {
      let config = {
        coordType: 0,
        coordTypeZ: 0,
      };
      super.copyObject(res, config, [
        'centerCoord',
        'coordZ',
        'distance',
        'heading',
        'pitch',
      ]);
      this.currentView = config;
      super.setCallBack('获取当前视角', res);
    });
  }

  /**
   * 聚焦建筑
   * @param {Object} config 配置
   */
  focusBuilding(config) {
    let temp = { buildingId: 'building0001', distance: 100 };
    if (config) {
      temp = config;
    }
    window.appInstance.uniCall('focusBuilding', temp, (res) => {
      super.setCallBack('聚焦建筑', res);
    });
  }

  /**
   * 聚焦楼层
   * @param {Object} config 配置
   */
  focusFloor(config) {
    let temp = { buildingId: 'building0001', floor: 3, distance: 100 };
    if (config) {
      temp = config;
    }
    window.appInstance.uniCall('focusFloor', temp, (res) => {
      super.info('聚焦楼层', res);
    });
  }

  /**
   * 聚焦房间
   * @param {Object} config 配置
   */
  focusRoom(config) {
    let temp = {
      buildingId: 'building0001',
      floor: 3,
      room: 'room0001',
      distance: 100,
    };
    if (config) {
      temp = config;
    }
    window.appInstance.uniCall('focusRoom', temp, (res) => {
      super.setCallBack('聚焦房间', res);
    });
  }

  /**
   * 相机环绕
   * @param {Object} config 配置
   */
  setCameraRotate(config) {
    let jsonData = {
      enabled: true, // 是否启用相机围绕目标飞行
      duration: 10, // 飞行一周所需要的秒数，数值越大飞行越慢
      direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
    };
    if (config) {
      jsonData = config;
    }
    window.appInstance.uniCall('rotateCamera', jsonData, (result) => {
      super.log('环绕:', result.message);
    });
  }

  restrictCamera(callback) {
    window.appInstance.uniCall('getBaseCenter', {}, (res) => {
      if (res.result == 1) {
        let jsonData = {
          center: [res.originLon, res.originLat],
          coordType: 0,
          coordTypeZ: 0,
          limitYaw: [0, 359],
          limitPitch: [5, 89],
          limitCoordZ: [10, 1000000],
          limitDistance: [1600, 1000000],
          radius: 1000000,
        };
        window.appInstance.uniCall('restrictCamera', jsonData, (res1) => {
          window.appInstance.uniCall(
            'setCameraRestrictionState',
            {
              state: 'restricted',
            },
            (res2) => {
              super.log('限制:', res2.message);
              callback && callback(res2.result);
            }
          );
        });
      }
    });
  }
  restrictCameraInfo(info) {
    window.appInstance.uniCall('restrictCamera', info, (res1) => {
      window.appInstance.uniCall(
        'setCameraRestrictionState',
        {
          state: 'restricted',
        },
        (res2) => {
          super.log('限制:', res2.message);
        }
      );
    });
  }
}
