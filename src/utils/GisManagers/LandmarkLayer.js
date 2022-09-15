import GisBase from './GisBase';
import { LandmarkLayerClick } from './UeActionCallback';
/* global _*/

/**地标图 */
export default class LandmarkLayer extends GisBase {
  constructor() {
    super('地标图');
    this.ueAction = new LandmarkLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
    legends: [],
  };
  /**
   * 添加地标图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    item.coordType = layerConfig.coordType || 0;
    super.copyObject(layerConfig, item, ['id', 'name']);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('添加地标图图层', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };

    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'label',
      'type',
    ]);
    window.appInstance.uniCall('addLandmarkLayer', item, cBack);
    return item;
  }

  /**
   * 追加更新分组数据
   * @param {Object} layerConfig 图层配置
   * @param {Array} group 数据分组
   * @param {int} index 序号
   */
  updateGroup(layerConfig, group, index = 0) {
    if (index < group.length) {
      this.updateData(
        layerConfig,
        group[index],
        () => {
          this.updateGroup(layerConfig, group, ++index);
        },
        true
      );
    }
  }

  /**
   * 更新地标图数据
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   * @param {Boolean} isAppend 默认false
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    item.isAppend = isAppend; // true:  全部指定legend为追加数据；false: 后续全部指定legend为重建
    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'label',
      'type',
    ]);

    window.appInstance.uniCall('updateLandmarkLayerCoord', item, (res) => {
      super.setCallBack('更新地标图数据', res, layerConfig);
      callback && callback(res.result);
    });
  }

  /**
   * 更新地标图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    item.isAppend = true;
    window.appInstance.uniCall('updateLandmarkLayerStyle', item, (res) => {
      super.setCallBack('更新地标图样式', res, layerConfig);
    });
  }
}
