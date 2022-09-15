import GisBase from './GisBase';
/* global _*/

/**路径段热力图 */
export default class RoadSgHeatLayer extends GisBase {
  constructor() {
    super('路径段热力图');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * 添加路径段热力图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'alpha',
      'width',
      'colorMax',
      'colorMin',
    ]);

    item.valueMax = _.max(data.data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    super.copyObject(data, item, ['segments', 'data']);

    window.appInstance.uniCall('addRoadSgHeatLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('添加路径段热力图图层', res, layerConfig);
    });
    return item;
  }

  /**
   * 更新路径段热力图数据
   * @param {Array} data 图层数据
   */
  updateDataCoord(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ']);
    item.isAppend = isAppend; //true:  追加 绝对数值 数据，不会清除其他数据，名称相同，则替换数据；    //add: 追加 相对变化 数据，不会清除其他数据，名称相同，则累加数据；    //false: 重建 绝对数值 数据，数据全部清空；
    item.data = data;
    if (!isAppend) {
      item.valueMax = _.max(data.data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('updateRoadSgHeatLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新路径段热力图数据', res, layerConfig);
    });
  }

  /**
   * 更新路径段热力图路段
   * @param {Array} data 图层数据
   */
  updateDataSegment(layerConfig, segments, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    item.isAppend = isAppend; //true:  追加 绝对数值 数据，不会清除其他数据，名称相同，则替换数据；    //add: 追加 相对变化 数据，不会清除其他数据，名称相同，则累加数据；    //false: 重建 绝对数值 数据，数据全部清空；
    item.segments = segments;
    window.appInstance.uniCall('updateRoadSgHeatLayerSegment', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新路径段热力图数据', res, layerConfig);
    });
  }

  /**
   * 更新路径段热力图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'alpha',
      'width',
      'colorMax',
      'colorMin',
      'valueMax',
      'valueMin',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('updateRoadSgHeatLayerStyle', item, (res) => {
      super.setCallBack('更新路径段热力图样式', res, layerConfig);
    });
  }
}
