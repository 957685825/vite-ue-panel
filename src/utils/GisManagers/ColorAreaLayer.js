import GisBase from './GisBase';
/* global _*/

/**数值区域图 */
export default class ColorAreaLayer extends GisBase {
  constructor() {
    super('数值区域图');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * 添加数值区域图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'alpha',
      'type',
      'areaHeight',
      'fillArea',
      'colorMax',
      'colorMin',
    ]);
    super.copyObject(data, item, ['areas', 'data']);
    item.valueMax = _.max(data.data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    window.appInstance.uniCall('addColorAreaLayer', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('添加数值区域图图层', res, layerConfig);
    });
    return item;
  }

  /**
   * 更新数值区域图数据
   * @param {Array} data 图层数据
   */
  updateDataCoord(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    item.isAppend = isAppend; //true:  追加 绝对数值 数据，不会清除其他数据，名称相同，则替换数据；    //add: 追加 相对变化 数据，不会清除其他数据，名称相同，则累加数据；    //false: 重建 绝对数值 数据，数据全部清空；
    item.data = data;
    if (!isAppend) {
      item.valueMax = _.max(data.data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('updateColorAreaLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新数值区域图数据', res, layerConfig);
    });
  }

  /**
   * 更新数值区域图路段
   * @param {Array} data 图层数据
   */
  updateDataArea(layerConfig, data, callback, isAppend = false, areas) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'coordZ']);
    item.isAppend = isAppend; //true:  追加 绝对数值 数据，不会清除其他数据，名称相同，则替换数据；    //add: 追加 相对变化 数据，不会清除其他数据，名称相同，则累加数据；    //false: 重建 绝对数值 数据，数据全部清空；
    item.areas = areas;
    window.appInstance.uniCall('updateColorAreaLayerArea', item, (res) => {
      super.setCallBack('更新数值区域图数据', res, layerConfig);
      callback && callback(res.result);
    });
  }

  /**
   * 更新数值区域图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'alpha',
      'type',
      'areaHeight',
      'fillArea',
      'colorMax',
      'colorMin',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('updateColorAreaLayerStyle', item, (res) => {
      super.setCallBack('更新数值区域图样式', res, layerConfig);
    });
  }
}
