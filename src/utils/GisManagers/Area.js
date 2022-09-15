/* eslint-disable no-undef */
import GisBase from './GisBase'
import { AreaLayerClick } from './UeActionCallback'
/** 区域 */
export default class Area extends GisBase {
  constructor () {
    super('区域')
    this.ueAction = new AreaLayerClick()
  }

  config = {
    coordType: 0,
    coordTypeZ: 0
  }
  /**
   * 添加区域图层
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
    ]);
    item.points = data;
    // 设置回调
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('添加区域图层', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('addArea', item, cBack);
    return item;
  }

  /**
   * 更新区域数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ']);
    item.points = super.selectArray(data, ['coord']);
    window.appInstance.uniCall('updateAreaCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新区域数据', res, layerConfig);
    });
    this.updateStyle(layerConfig);
  }

  /**
   * 更新区域样式
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
    window.appInstance.uniCall('updateAreaStyle', item, (res) => {
      super.setCallBack('更新区域样式', res, layerConfig);
    });
  }

  /**
   * 添加Shp区域图层
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
      'fillArea',
      'shpPath',
    ]);
    window.appInstance.uniCall('addAreaShp', item, (res) => {
      super.setCallBack('添加区域图层', res, layerConfig);
    });
    return item;
  }

  /**
   * 移除区域图层
   * @param {String} name 图层名称
   */
  removeArea(name) {
    appInstance.uniCall('deleteArea', {
      id: name
    })
  }
}
