import GisBase from './GisBase';
import Timer from '../common/Timer';
/* global _*/

/**轨迹图 */
export default class TrailLayer extends GisBase {
  constructor() {
    super('轨迹图');
  }
  static TimerList = {};
  config = {
    coordType: 0,
    coordTypeZ: 0,
    legends: [],
  };

  /**
   * 添加轨迹图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addHisLayer(layerConfig, data, callback) {
    layerConfig.Timer = new Timer();
    layerConfig.Timer.TimerInterval = layerConfig.delay || 1000;
    let index = 0;
    this.addLayer(layerConfig, data[0], (success) => {
      if (success) {
        callback && callback(success);
        layerConfig.Timer.TimerTick = () => {
          if (index >= data.length) {
            index = 0;
          }
          this.updateData(layerConfig, data[index++]);
        };
        layerConfig.Timer.Start();
      }
    });
  }

  /**
   * 添加轨迹图图层
   * @param {Object} layerConfig 图层配置
   * @param {Array} data 图层数据
   */
  addLayer(layerConfig, data, callBack) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'trackStyle',
      'trackDuration',
      'trackWidth',
      'objLife',
      'time',
    ]);
    super.dealLegends(item.legends, layerConfig);
    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'label',
      'type',
    ]);
    window.appInstance.uniCall('addTrailLayer', item, (res) => {
      callBack && callBack(res.result);
      console.log('添加轨迹图图层', res, layerConfig);
      this.setLayerClick(layerConfig);
    });
    return item;
  }

  /**
   * 更新轨迹图数据
   * @param {Array} data 图层数据
   */
  updateData(layerConfig, data) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    super.dealLegends(item.legends, layerConfig);
    item.isAppend = false; // true:  追加数据；false: 重建数据
    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'label',
      'type',
    ]);
    window.appInstance.uniCall('updateTrailLayerCoord', item, (res) => {
      //this.setLayerClick(layerConfig)
    });
  }

  /**
   * 更新轨迹图样式
   * @param {Object} layerConfig 图层配置
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'trackStyle',
      'trackDuration',
      'objLife',
    ]);
    super.dealLegends(item.legends, layerConfig);
    item.isAppend = true; // true:  追加数据；false: 重建数据
    window.appInstance.uniCall('updateTrailLayerStyle', item, (res) => {
      //this.setLayerClick(layerConfig)
    });
  }

  setLayerClick(layerConfig) {
    window.appInstance.uniCall(
      'pickOverlay',
      {
        overlayType: 'trailLayer',
        idLayer: layerConfig.id,
        type: 'click',
      },
      (result) => {
        window.appInstance.uniCall('onTrailLayerLClick', {}, (result) => {
          let item = { scatterType: '车辆' };
          console.log(
            'gzq',
            result,
            window.streamingConfig.panelURL + '/?' + JSON.stringify(item)
          );
          window.appInstance.uniCall(
            'addOverlayTip',
            {
              id: result.idObj,
              url:
                window.streamingConfig.panelURL + '/?' + JSON.stringify(item),
              // 分辨率原因 此处配置全部缩小2倍
              size: [400, 100],
              offset: [0, 0],
              overlayType: 'trailLayer',
              isShowClose: true,
            },
            (res) => {
              console.log('gzq', res);
            }
          );
        });
      }
    );
  }
}
