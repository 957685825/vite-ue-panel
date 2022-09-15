import GisBase from './GisBase';
import { TypeAreaLayerClick } from './UeActionCallback';
/* global _*/

/**类型区域图 */
export default class TypeAreaLayer extends GisBase {
  constructor() {
    super('类型区域图');
    this.ueAction = new TypeAreaLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * 添加类型区域图图层
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
      'legends',
    ]);
    super.copyObject(data, item, ['areas', 'data']);
    // 设置回调
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('添加类型区域图图层', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('addTypeAreaLayer', item, cBack);
    return item;
  }

  /**
   * 更新类型区域图数据
   * @param {Array} data 图层数据
   */
  updateDataCoord(layerConfig, data, callback, isAppend = false) {
    let item = {};
    super.copyObject(layerConfig, item, ['id', 'name']);
    item.isAppend = isAppend; //true:  追加 绝对数值 数据，不会清除其他数据，名称相同，则替换数据；    //add: 追加 相对变化 数据，不会清除其他数据，名称相同，则累加数据；    //false: 重建 绝对数值 数据，数据全部清空；
    item.data = data;
    window.appInstance.uniCall('updateTypeAreaLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新类型区域图数据', res, layerConfig);
    });
  }

  /**
   * 更新类型区域图
   * @param {Array} data 图层数据
   */
  updateDataArea(layerConfig, areas, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'coordZ']);
    item.isAppend = isAppend; //true:  追加 绝对数值 数据，不会清除其他数据，名称相同，则替换数据；    //add: 追加 相对变化 数据，不会清除其他数据，名称相同，则累加数据；    //false: 重建 绝对数值 数据，数据全部清空；
    item.areas = areas;
    window.appInstance.uniCall('updateTypeAreaLayerArea', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新类型区域图数据', res, layerConfig);
    });
  }

  /**
   * 更新类型区域图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'alpha', 'legends']);
    item.isAppend = true;
    window.appInstance.uniCall('updateTypeAreaLayerStyle', item, (res) => {
      super.setCallBack('更新类型区域图样式', res, layerConfig);
    });
  }
}
