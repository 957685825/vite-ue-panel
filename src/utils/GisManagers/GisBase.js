import { CommonClick } from './UeActionCallback';

/**基类 */
export default class GisBase {
  /**
   * 构造函数
   * @param {String} cname 中文名
   */
  constructor(cname) {
    this.cname = cname == undefined || cname == '' ? '基类' : cname;
    this.layerType = GisBase.layerType[cname];
  }

  //#region 基类属性

  con = console;
  //static的属性和方法子类不会继承
  static layerType = {
    地标点: 'landmark',
    路径: 'path',
    区域: 'area',
    圆形: 'circularArea',
    倾斜摄影: '3DTile',
    瓦片: 'gisMap',
    地标图: 'landmarkLayer',
    柱状图: '3DColumnLayer',
    栅格图: '3DGridLayer',
    热力图: 'heatMapLayer',
    气泡图: 'bubbleLayer',
    事件图: 'eventBubbleLayer',
    轨迹图: 'trailLayer',
    点迹图: 'pointTrackLayer',
    关系图: 'ODLineLayer',
    类型区域图: 'typeAreaLayer',
    数值区域图: 'colorAreaLayer',
    路径点热力图: 'roadPtHeatLayer',
    路径段热力图: 'roadSgHeatLayer',
    特效: '3DMarker',
  };

  //#endregion

  //#region 日志，回调

  /**
   * 日志log
   * @param {String} msg 信息
   */
  log(msg) {
    this.con.log(this.cname, ':', msg);
  }

  /**
   * 日志info
   * @param {String} msg 信息
   */
  info(...params) {
    this.con.info(this.cname, ...params);
  }

  /**
   * 回调函数
   * @param {Object} res 回调参数
   */
  callback(res) {
    this.info(['失败', '成功'][res.result] + res.message);
  }

  /**
   * 设置回调
   * @param {String} action 操作
   * @param {Object} res 回调参数
   * @param {Object} layerConfig 图层配置
   */
  setCallBack(action, res, layerConfig) {
    let temp = '';
    if (layerConfig) {
      temp = '\r\n图层:' + layerConfig.id + '';
    }
    this.info(
      temp,
      '\r\n操作-',
      action,
      ':',
      ['失败', '成功'][res.result],
      res.message,
      res.ErrorData
    );
  }

  /**
   * 设置图层可点击
   * @param {Object} layerConfig 图层配置
   * @param {function} callback 回调函数
   */
  setLayerClick(layerConfig, callback) {
    let that = this;
    that.callback = callback;
    window.appInstance.uniCall(
      'pickOverlay',
      {
        overlayType: GisBase.layerType[layerConfig.layerType],
        idLayer: layerConfig.id,
        type: 'click',
      },
      (clickResult) => {
        if (clickResult.result == 0 || layerConfig.isPickOverlay) {
          return;
        }
        layerConfig.isPickOverlay = true;
        this.setCallBack('pickOverlay-click', clickResult, layerConfig);
        let type = GisBase.layerType[layerConfig.layerType];
        type = type.charAt(0).toUpperCase() + type.slice(1);
        let action = 'on' + type + 'Click';
        window.appInstance.uniCall(action, {}, (pickResult) => {
          that.callback && that.callback(pickResult);
        });
      }
    );
  }
  //#endregion

  //#region 基类方法

  /**
   * 处理图例
   * @param {Array} legends 配置图例集合
   * @param {Object} layerConfig 图层图例（单个图例）
   */
  dealLegends(legends, layerConfig) {
    let index = legends.findIndex((t) => t.name == layerConfig.legend.name);
    if (index === -1) {
      legends.push(layerConfig.legend);
    } else {
      legends[index] = layerConfig.legend;
    }
  }

  /**
   * 处理数据，减少数据传输
   * @param {Array} array 数组
   * @param {Array} props 属性集合
   */
  selectArray(array, props) {
    let temp = [];
    array.forEach((t) => {
      let item = {};
      props.forEach((d) => (item[d] = t[d]));
      temp.push(item);
    });
    return temp;
  }

  /**
   * 处理数据，减少数据传输
   * @param {Object} source 源对象
   * @param {Object} target 目标对象
   * @param {Array} props 属性集合
   */
  copyObject(source, target, props) {
    if (props) {
      props.forEach((d) => {
        if (source[d]) {
          target[d] = source[d];
        }
      });
    } else {
      for (const key in source) {
        target[key] = source[key];
      }
    }
  }

  //#endregion

  //#region 静态方法

  /**
   * 设置覆盖物显隐
   * @param {Object} layer 图层配置
   * @param {Boolean} layer 是否显示
   */
  static setLayerVisible(layer, isVisible, callback) {
    let type = GisBase.layerType[layer.layerType];
    if (type) {
      window.appInstance.uniCall(
        'setOverlayVisibility',
        {
          id: layer.id,
          overlayType: type,
          visible: isVisible,
        },
        (res) => {
          callback && callback(res.result);
          console.info(
            layer.id,
            '设置覆盖物显隐',
            isVisible,
            ':',
            ['失败', '成功'][res.result],
            res.message
          );
        }
      );
    }
  }

  /**
   * 设置覆盖物类型显隐
   * @param {string} type 覆盖物类型
   */
  static setLayerVisibleType(type) {
    if (type) {
      window.appInstance.uniCall(
        'setOverlayTypeVisibility',
        {
          overlayType: type,
          visible: true,
        },
        (res) => {
          console.info(
            type,
            '按类型删除覆盖物',
            ':',
            ['失败', '成功'][res.result],
            res.message
          );
        }
      );
    }
  }

  /**
   * 停止单选图层
   * @param {Object} layer 图层配置
   */
  static endPickOverlay(layer) {
    let type = GisBase.layerType[layer.layerType];
    if (type) {
      window.appInstance.uniCall(
        'endPickOverlay',
        {
          id: layer.id,
          overlayType: type,
          type: 'click',
        },
        (res) => {
          GisBase.removeLayer(layer);
          layer.isAddClick = false;
          layer.isPickOverlay = false;
        }
      );
    }
  }

  /**
   * 根据图层配置（名称+类型）移除覆盖物
   * @param {Object} layer 图层配置
   */
  static removeLayer(layer) {
    let type = GisBase.layerType[layer.layerType];
    if (type) {
      window.appInstance.uniCall(
        'removeOverlay',
        {
          id: layer.id,
          overlayType: type,
        },
        (res) => {
          console.info(
            layer.id,
            '按图层名称删除覆盖物',
            ':',
            ['失败', '成功'][res.result],
            res.message
          );
        }
      );
    }
  }

  /**
   * 根据覆盖物类型移除覆盖物
   * @param {string} type 覆盖物类型
   */
  static removeLayerType(type) {
    if (type) {
      window.appInstance.uniCall(
        'clearOverlayType',
        {
          overlayType: type,
        },
        (res) => {
          console.info(
            type,
            '按类型删除覆盖物',
            ':',
            ['失败', '成功'][res.result],
            res.message
          );
        }
      );
    }
  }

  /**
   * 根据覆盖物类型移除覆盖物弹框
   * @param {string} type 覆盖物类型
   */
  static removeOverlayTip(layerType) {
    if (layerType) {
      let type = GisBase.layerType[layerType];
      window.appInstance.uniCall('removeOverlayTip', {
        overlayType: type,
      });
    } else {
      CommonClick.removeTipByType();
    }
  }

  /** 取消覆盖物选中态 */
  static clearSelected() {
    window.appInstance.uniCall('clearOverlaySelected', {});
  }

  /**
   * 移除覆盖物选中态
   */
  static clearOverlaySelected() {
    window.appInstance.uniCall('clearOverlaySelected', {});
  }

  /**
   * 聚焦 覆盖物
   * @param {string} id 覆盖物id，可以是图层id，也可以是对象id
   * @param {string} type 图层类型，中文
   * @param {string} distance 覆盖物类型
   */
  static focusById(id, type, distance) {
    let overlayType = GisBase.layerType[type];
    appInstance.uniCall('focusById', {
      id: id,
      overlayType: overlayType,
      distance: distance,
    });
  }

  //#endregion
}
