import GisBase from './GisBase';
import { PathLayerClick } from './UeActionCallback';
/* global _*/

/**路径 */
export default class Path extends GisBase {
  constructor() {
    super('路径');
    this.ueAction = new PathLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * 添加路径图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'type',
      'color',
      'colorPass',
      'width',
    ]);
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('添加路径图层', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    item.points = super.selectArray(data, ['coord', 'coordZ']);
    window.appInstance.uniCall('addPath', item, cBack);
    return item;
  }

  /**
   * 更新路径数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    item.isAppend = false; // true: 追加路径数据(注意顺序); false: 重建路径数据
    item.points = super.selectArray(data, ['coord', 'coordZ']);
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('更新路径数据', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('updatePathCoord', item, cBack);
  }

  /**
   * 更新路径样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = {};
    super.copyObject(layerConfig, item, [
      'id',
      'type',
      'color',
      'colorPass',
      'width',
    ]);
    window.appInstance.uniCall('updatePathStyle', item, (res) => {
      super.setCallBack('更新路径样式', res, layerConfig);
    });
  }

  /**
   * 添加Shp路径图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayerShp(layerConfig, data) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'type',
      'color',
      'colorPass',
      'width',
      'shpPath',
    ]);
    window.appInstance.uniCall('addPathShp', item, (res) => {
      super.setCallBack('添加Shp路径图层', res, layerConfig);
    });
    return item;
  }
}
