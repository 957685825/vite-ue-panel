import GisBase from './GisBase';
import { ODLineLayerClick } from './UeActionCallback';
/* global _*/

/**关系图 */
export default class ODLineLayer extends GisBase {
  constructor() {
    super('关系图');
    this.ueAction = new ODLineLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
    legends: [],
  };

  /**
   * 添加关系图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'bubbleRadiusMax',
      'bubbleRadiusMin',
      'bubbleSpeed',
      'lineWidthMax',
      'lineWidthMin',
      'lineSpeed',
      'curvature',
      'legend',
    ]);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    item.data = super.selectArray(data, [
      'id',
      'startCoord',
      'startCoordZ',
      'targetCoord',
      'targetCoordZ',
      'value',
      'type',
    ]);
    item.valueMax = _.max(data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('添加关系图图层', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('addODLineLayer', item, cBack);
    return item;
  }

  /**
   * 更新关系图数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    item.isAppend = isAppend; // true:  追加数据，并不会清除现有其他数据，如果名称相同，则替换该数据；false: 重建数据，数据全部清空；add：在重名的现有数据上累加值
    item.data = super.selectArray(data, [
      'id',
      'startCoord',
      'startCoordZ',
      'targetCoord',
      'targetCoordZ',
      'value',
      'type',
    ]);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('更新关系图数据', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('updateODLineLayerCoord', item, cBack);
    this.updateStyle(layerConfig);
  }

  /**
   * 更新关系图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'valueMax',
      'valueMin',
      'bubbleRadiusMax',
      'bubbleRadiusMin',
      'bubbleSpeed',
      'lineWidthMax',
      'lineWidthMin',
      'lineSpeed',
      'curvature',
      'legend',
    ]);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    item.isAppend = true;
    window.appInstance.uniCall('updateODLineLayerStyle', item, (res) => {
      super.setCallBack('更新关系图样式', res, layerConfig);
    });
  }
}
