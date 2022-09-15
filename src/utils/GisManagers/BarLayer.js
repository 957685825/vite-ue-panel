import GisBase from './GisBase';
import { BarLayerClick } from './UeActionCallback';
/**柱状图 */
export default class BarLayer extends GisBase {
  constructor() {
    super('柱状图');
    this.ueAction = new BarLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * 添加柱状图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'columnType',
      'columnMinHeight',
      'columnMaxHeight',
      'columnAlpha',
      'columnPaint',
      'columnGap',
      'columnWidth',
      'colorMax',
      'colorMin',
      'labelColor',
      'labelBackgroundColor',
    ]);
    item.data = super.selectArray(data, ['id', 'coord', 'value']);
    item.valueMax = _.max(data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);

    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('添加柱状图图层', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('add3DColumnLayer', item, cBack);
    return item;
  }

  /**
   * 更新柱状图数据
   * @param {Array} data 图层数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ']);
    item.isAppend = isAppend; // true: 追加数据; false: 重建数据
    item.data = super.selectArray(data, ['id', 'coord', 'value']);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('更新柱状图数据', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('update3DColumnLayerCoord', item, cBack);
    this.updateStyle(layerConfig, cBack);
  }

  /**
   * 更新柱状图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'columnType',
      'columnMinHeight',
      'columnMaxHeight',
      'columnAlpha',
      'columnPaint',
      'columnGap',
      'columnWidth',
      'colorMax',
      'colorMin',
      'valueMax',
      'valueMin',
      'labelColor',
      'labelBackgroundColor',
    ]);
    item.isAppend = false;
    window.appInstance.uniCall('update3DColumnLayerStyle', item, (res) => {
      super.setCallBack('更新柱状图样式', res, layerConfig);
      callback && callback(res.result);
    });
  }
}
