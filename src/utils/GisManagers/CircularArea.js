import GisBase from './GisBase';
/* global _*/

/**圆形 */
export default class CircularArea extends GisBase {
  constructor() {
    super('圆形');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /*
   * 添加圆形图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'type',
      'color',
      'areaHeight',
      'fillArea',
      'radius',
    ]);
    if (data) {
      item.center = data;
    } else {
      item.center = layerConfig.center;
    }
    window.appInstance.uniCall('addCircularArea', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('添加圆形图层', res, layerConfig);
    });
    return item;
  }

  /**
   * 更新圆形数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ', 'radius']);
    if (data) {
      item.center = data;
    } else {
      item.center = layerConfig.center;
    }
    window.appInstance.uniCall('updateCircularAreaCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新圆形数据', res, layerConfig);
    });
  }

  /**
   * 更新圆形样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'type',
      'color',
      'areaHeight',
      'fillArea',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('updateCircularAreaStyle', item, (res) => {
      super.setCallBack('更新圆形样式', res, layerConfig);
    });
  }

  /**
   * 添加Shp圆形图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayerShp(layerConfig, data) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'type',
      'color',
      'areaHeight',
      'fillCircularArea',
      'shpPath',
    ]);
    window.appInstance.uniCall('addCircularAreaShp', item, (res) => {
      super.setCallBack('添加圆形图层', res, layerConfig);
    });
    return item;
  }

  /**
   * 移除圆形图层
   * @param {String} name 图层名称
   */
  removeCircularArea(name) {
    window.appInstance.uniCall('deleteCircularArea', {
      id: name,
    });
  }
}
