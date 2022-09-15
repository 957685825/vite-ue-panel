import GisBase from './GisBase';
/* global _ */
/**栅格图 */
export default class GridLayer extends GisBase {
  constructor() {
    super('栅格图');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * 添加栅格图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'gridType',
      'gridHeight',
      'gridAlpha',
      'gridGap',
      'gridWidth',
      'colorMax',
      'colorMin',
    ]);
    item.data = super.selectArray(data, ['id', 'coord', 'value']);
    item.valueMax = _.max(data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    window.appInstance.uniCall('add3DGridLayer', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('添加栅格图图层', res, layerConfig);
    });
    return item;
  }

  /**
   * 更新栅格图数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data,callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ']);
    item.isAppend = isAppend; // true: 追加数据; false: 重建数据
    item.data = super.selectArray(data, ['id', 'coord', 'value']);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('update3DGridLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新栅格图数据', res, layerConfig);
    });
    this.updateStyle(layerConfig);
  }

  /**
   * 更新栅格图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'gridType',
      'gridHeight',
      'gridAlpha',
      'gridGap',
      'gridWidth',
      'colorMax',
      'colorMin',
      'valueMax',
      'valueMin',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('update3DGridLayerStyle', item, (res) => {
      super.setCallBack('更新栅格图样式', res, layerConfig);
    });
  }
}
