import GisBase from './GisBase';
/* global _*/

/**气泡图 */
export default class Bubble extends GisBase {
  constructor() {
    super('气泡图');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
    fillArea: 'none',
    legends: [],
  };

  /**
   * 添加气泡图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'layerName',
      'speed',
      'radiusMax',
      'radiusMin',
      'legend',
      'fillArea',
    ]);
    super.dealLegends(item.legends, layerConfig);
    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'value',
      'type',
      'legend',
    ]);
    item.valueMax = _.max(data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    window.appInstance.uniCall('addBubbleLayer', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('添加气泡图图层', res, layerConfig);
    });
    return item;
  }

  /**
   * 更新气泡图数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'layerName',
      'speed',
      'radiusMax',
      'radiusMin',
    ]);
    super.dealLegends(item.legends, layerConfig);
    item.isAppend = isAppend; // true:  追加数据，并不会清除现有其他数据，如果名称相同，则替换该数据；false: 重建数据，数据全部清空；add：在重名的现有数据上累加值
    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'value',
      'type',
    ]);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('updateBubbleLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新气泡图数据', res, layerConfig);
    });
    this.updateStyle(layerConfig);
  }

  /**
   * 更新气泡图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'layerName',
      'speed',
      'radiusMax',
      'radiusMin',
      'valueMax',
      'valueMin',
    ]);
    super.dealLegends(item.legends, layerConfig);
    item.isAppend = true;
    window.appInstance.uniCall('updateBubbleLayerStyle', item, (res) => {
      super.setCallBack('更新气泡图样式', res, layerConfig);
    });
  }
}
