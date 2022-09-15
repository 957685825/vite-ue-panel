import GisBase from './GisBase';
/**Gis基础图层 */
export default class GisBaseLayer extends GisBase {
  constructor() {
    super('Gis基础图层');
  }
  /**
   * 添加3DTile倾斜摄影
   * @param {object} config 配置
   */
  add3DTile(config) {
    let item = {
      id: '3dTileBase',
      name: '3dTileBaseLayer',
      url: 'http://mapserver/beijing/tileset.json',
      type: 'b3dm',
      token: 'ABCDEFG',
      visible: true,
      alpha: 0.5,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('add3DTile', item, (res) => {
      super.info('添加3DTile倾斜摄影', res);
    });
    return item;
  }

  /**
   * 更新3DTile倾斜摄影
   * @param {object} config 配置
   */
  update3DTile(config) {
    let item = {
      id: '3dTileBase',
      name: '3dTileBaseLayer',
      url: 'http://mapserver/beijing/tileset.json',
      token: 'ABCDEFG',
      visible: true,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('update3DTile', item, (res) => {
      super.info('更新3DTile倾斜摄影', res);
    });
    return item;
  }

  /**
   * 更新3DTile倾斜摄影样式
   * @param {object} config 配置
   */
  update3DTileStyle(config) {
    let item = {
      id: '3dTileBase',
      visible: true,
      alpha: 0.1,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('update3DTileStyle', item, (res) => {
      super.info('更新3DTile倾斜摄影样式', res);
    });
    return item;
  }

  /**
   * 添加GIS地图
   * @param {object} config 配置
   */
  addGISMap(config) {
    let item = {
      id: 'gisMapBase',
      name: 'gisMapBaseLayer',
      mapUrl: 'http://mapserver/beijing/tileset.json',
      mapType: 'TMS',
      mapToken: 'ABCDEFG',
      terrainUrl: 'http://mapserver/beijing/tileset.json',
      terrainType: 'TMS',
      terrainToken: 'ABCDEFG',
      visible: true,
      alpha: 0.5,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('addGISMap', item, (res) => {
      super.info('添加GIS地图', res);
    });
    return item;
  }

  /**
   * 更新GIS地图数据
   * @param {object} config 配置
   */
  updateGISMap(config) {
    let item = {
      id: 'gisMapBase',
      name: 'gisMapBaseLayer',
      mapUrl: 'http://mapserver/beijing/tileset.json',
      mapType: 'TMS',
      mapToken: 'ABCDEFG',
      terrainUrl: 'http://mapserver/beijing/tileset.json',
      terrainType: 'TMS',
      terrainToken: 'ABCDEFG',
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('updateGISMap', item, (res) => {
      super.info('更新GIS地图数据', res);
    });
    return item;
  }

  /**
   * 更新GIS地图样式
   * @param {object} config 配置
   */
  updateGISMapStyle(config) {
    let item = {
      id: 'gisMapBase',
      visible: true,
      alpha: 0.1,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('updateGISMapStyle', item, (res) => {
      super.info('更新GIS地图样式', res);
    });
    return item;
  }

  //#region 添加TMS地图  3Dtile
  /**
   * @param {Object} layerConfig 图层配置
   * 需要设置地图中心点
   */
  addTMS(layerConfig, callback) {
    let tmsjsonData = {
      id: layerConfig.id || 'tmslayer', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      name: layerConfig.name || 'tmslayer', // 图层名称，支持为图层自定义名称
      mapUrl:
        layerConfig.mapUrl || 'http://172.16.1.75:8089/zixiazaiTif/tms.xml ', // 地表瓦片入口描述文件地址
      mapType: 'TMS', // WMTS 的地图数据格式类别，目前仅支持 "TMS"
      mapToken: 'ABCDEFG', // 预留字段
      terrainUrl:
        layerConfig.terrainUrl || 'http://172.16.1.75:9997/layer.json', // 高程瓦片入口描述文件地址
      terrainType: 'TMS', // WMTS 的高程数据格式类别，目前仅支持 "TMS"
      terrainToken: 'ABCDEFG', // 预留字段
      visible: true, // 显隐控制，true：显示；false：隐藏
      alpha: 0.5, // 透明度，0：完全透明；1：完全不透明
    };
    appInstance.uniCall('addGISMap', tmsjsonData, (result) => {
      if (result) {
        callback && callback(result);
      }
    });
  }

  add3DTile(layerConfig, callback) {
    let tilesJsonData = {
      id: layerConfig.id || '3Dtileslayer',
      name: layerConfig.URL.name || '3Dtileslayer',
      url: layerConfig.URL || 'http://172.16.1.75:9968/tileset.json',
      type: 'b3dm',
      token: 'ABCDEFG',
      visible: true,
      alpha: 1,
    };
    appInstance.uniCall('addGISMap', tilesJsonData, (result) => {
      if (result) {
        callback && callback(result);
      }
    });
  }

  removeTMS(callback) {
    window.appInstance.uniCall(
      'clearOverlayType',
      {
        overlayType: 'gisMap',
      },
      (res) => {
        callback && callback(res.result);
      }
    );
  }
  remove3DTile(callback) {
    window.appInstance.uniCall(
      'clearOverlayType',
      {
        overlayType: '3DTile',
      },
      (res) => {
        callback && callback(res.result);
      }
    );
  }
  //#endregion
}
