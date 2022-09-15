import GisBase from './GisBase';
/* global _*/

/**热力图 */
export default class HeatLayer extends GisBase {
  constructor() {
    super('热力图');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * 添加热力图图层
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
      'alpha',
      'colorMax',
      'colorMin',
      'radius',
    ]);
    let scatterData = super.selectArray(data, ['coord', 'value']);
    item.valueMax = _.max(data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);

    //散点多时分批添加
    let group = _.chunk(scatterData, 200);

    item.data = group[0];
    window.appInstance.uniCall('addHeatMapLayer', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('添加热力图图层', res, layerConfig);
      this.updateGroup(layerConfig, group);
    });
    //todo 有回调时删除
    setTimeout(() => {
      this.updateGroup(layerConfig, group);
    }, 3000);
    return item;
  }

  /**
   * 追加更新分组数据
   * @param {Object} layerConfig 图层配置
   * @param {Array} group 数据分组
   * @param {int} index 序号
   */
  updateGroup(layerConfig, group, index = 1) {
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
   * 更新热力图数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ']);
    item.isAppend = isAppend; //true:  追加 绝对数值 数据，不会清除其他数据，名称相同，则替换数据；    //add: 追加 相对变化 数据，不会清除其他数据，名称相同，则累加数据；    //false: 重建 绝对数值 数据，数据全部清空；
    item.data = super.selectArray(data, ['coord', 'value']);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('updateHeatMapLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('更新热力图数据', res, layerConfig);
    });
  }

  /**
   * 更新热力图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDezep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'type',
      'alpha',
      'colorMax',
      'colorMin',
      'valueMax',
      'valueMin',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('updateHeatMapLayerStyle', item, (res) => {
      super.setCallBack('更新热力图样式', res, layerConfig);
    });
  }
}
