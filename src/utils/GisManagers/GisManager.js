import HeatLayer from './HeatLayer';
import GisBase from './GisBase';
import LandmarkLayer from './LandmarkLayer';
import Bubble from './Bubble';
import BarLayer from './BarLayer';
import Area from './Area';
import Path from './Path';
import Camera from './Camera';
import CircularArea from './CircularArea';
import ODLineLayer from './ODLineLayer';
import TrailLayer from './TrailLayer';
import GisBaseLayer from './GisBaseLayer';
import RoadSgHeatLayer from './RoadSgHeatLayer';
import TypeAreaLayer from './TypeAreaLayer';
import ColorAreaLayer from './ColorAreaLayer';
import GridLayer from './GridLayer';

import Environment from './Environment';
import Model from './Model';
// import store from '@/store/index';
import GisDataManager from '@/api/Gis/gisDataManager';
import { uesStore } from '../../store';

class gisManager {
  /**当前视野 */
  currentView = '松山湖';

  /**
   * 构造函数
   */
  constructor() {
    this.gisBase = GisBase;
    this.landmarkLayer = new LandmarkLayer();
    this.heatLayer = new HeatLayer();
    this.bubble = new Bubble();
    this.barLayer = new BarLayer();
    this.path = new Path();
    this.area = new Area();
    this.circularArea = new CircularArea();
    this.oDLineLayer = new ODLineLayer();
    this.trail = new TrailLayer();
    this.gisBaseLayer = new GisBaseLayer();
    this.roadSgHeatLayer = new RoadSgHeatLayer();
    this.typeAreaLayer = new TypeAreaLayer();
    this.colorAreaLayer = new ColorAreaLayer();
    this.gridLayer = new GridLayer();

    this.model = new Model();
    this.camera = new Camera();
    this.environment = new Environment();
    this.store = uesStore()
  }

  //#region 图层

  /**
   * 添加图层
   * @param {object} layer 图层配置
   */
  addLayer(layer, callback) {
    let cBack = (success) => {
      if (success) {
        layer.status = 'show';
        callback && callback();
      }
    };
    switch (layer.layerType) {
      case '地标图':
        GisDataManager.getData(layer, (data) => {
          if (data.children && layer.children) {
            data.children.forEach((item, index) => {
              let temp = layer.children[index];
              temp.mapData = this.landmarkLayer.addLayer(
                temp,
                item.landmarks,
                cBack
              );
            });
          } else {
            layer.mapData = this.landmarkLayer.addLayer(layer, data, cBack);
          }
        });
        break;
      case '气泡图':
        GisDataManager.getData(layer, (data) => {
          // data.forEach((t) => {
          //   t.value = 10;
          // });
          layer.mapData = this.bubble.addLayer(layer, data, cBack);
        });
        break;
      case '热力图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.heatLayer.addLayer(layer, data, cBack);
        });
        break;
      case '圆形':
        layer.mapData = this.circularArea.addLayer(layer, null, cBack);
        break;
      case '区域':
        GisDataManager.getData(layer, (data) => {
          if (data.children && layer.children) {
            data.children.forEach((item, index) => {
              let temp = layer.children[index];
              temp.mapData = this.area.addLayer(temp, item.path.points, cBack);
            });
          } else {
            temp.mapData = this.area.addLayer(layer, data, cBack);
          }
        });
        break;
      case '路径':
        GisDataManager.getData(layer, (data) => {
          if (data.children && layer.children) {
            data.children.forEach((item, index) => {
              let temp = layer.children[index];
              temp.mapData = this.path.addLayer(temp, item.path.points, cBack);
            });
          } else {
            layer.mapData = this.path.addLayer(layer, data, cBack);
          }
        });
        break;
      case '关系图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.oDLineLayer.addLayer(layer, data, cBack);
        });
        break;

      case '柱状图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.barLayer.addLayer(layer, data, cBack);
        });
        break;
      case '路径段热力图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.roadSgHeatLayer.addLayer(layer, data, cBack);
        });
        break;
      case '类型区域图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.typeAreaLayer.addLayer(layer, data, cBack);
        });
        break;
      case '数值区域图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.colorAreaLayer.addLayer(layer, data, cBack);
        });
        break;
      case '轨迹图':
        GisDataManager.getData(layer, (data) => {
          this.trail.addHisLayer(layer, data, cBack);
        });
        break;
      case '栅格图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.gridLayer.addLayer(layer, data, cBack);
        });
        break;
    }
  }

  /**更新数据 */
  updateData(layer, callback) {
    let cBack = (success) => {
      if (success) {
        callback && callback();
      }
    };
    switch (layer.layerType) {
      case '地标图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.landmarkLayer.updateData(layer, data, cBack);
        });
        break;
      case '气泡图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.bubble.updateData(layer, data, cBack);
        });
        break;
      case '圆形':
        this.circularArea.updateData(layer);
        break;
      case '区域':
        break;
      case '柱状图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.barLayer.updateData(layer, data, cBack);
        });
        break;
      case '关系图':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.oDLineLayer.updateData(layer, data, cBack);
        });
        break;
      case '路径':
        GisDataManager.getData(layer, (data) => {
          if (data.children && layer.children) {
            data.children.forEach((item, index) => {
              let temp = layer.children[index];
              temp.mapData = this.path.updateData(
                temp,
                item.path.points,
                cBack
              );
            });
          } else {
            layer.mapData = this.path.updateData(layer, data, cBack);
          }
        });
        break;
      case '热力图':
        GisDataManager.getData(layer, (data) => {
          data.forEach((t) => {
            t.value = t.value || 1;
          });
          layer.mapData = this.heatLayer.updateData(layer, data, cBack);
        });
        break;
      case '类型区域图':
        GisDataManager.getData(layer, (data) => {
          this.typeAreaLayer.updateDataCoord(
            layer,
            data.data,
            (success) => {
              if (success) {
                //追加完对应关系后，再更新数据
                this.typeAreaLayer.updateDataArea(layer, data.areas, cBack);
              }
            },
            true
          );
        });
        break;
    }
  }

  /**
   * 更新图层样式
   * @param {object} layer 图层配置
   */
  updateLayerStyle(layer) {
    switch (layer.layerType) {
      case '路径':
        if (layer.children) {
          layer.children.forEach((item, index) => {
            this.path.updateStyle(item);
          });
        } else {
          this.path.updateStyle(layer);
        }
        break;
      case '柱状图':
        switch (store.state.cameraLevel) {
          case 0:
            layer.columnMinHeight = 40;
            layer.columnMaxHeight = 300;
            layer.columnWidth = 30;
            break;
          case 1:
            layer.columnMinHeight = 30;
            layer.columnMaxHeight = 200;
            layer.columnWidth = 20;
            break;
          case 2:
            layer.columnMinHeight = 20;
            layer.columnMaxHeight = 100;
            layer.columnWidth = 10;
            break;
          case 3:
            layer.columnMinHeight = 200;
            layer.columnMaxHeight = 400;
            layer.columnWidth = 32;
            break;
          case 4:
            layer.columnMinHeight = 100;
            layer.columnMaxHeight = 200;
            layer.columnWidth = 16;
            break;
        }
        if (layer.children) {
          layer.children.forEach((item, index) => {
            this.barLayer.updateStyle(item);
          });
        } else {
          this.barLayer.updateStyle(layer);
        }
        break;
    }
  }

  /**
   * 显示图层
   * @param {object} layer 图层配置
   */
  showLayer(layer) {
    if (layer.status == 'hide') {
      if (
        layer.children &&
        Array.isArray(layer.children) &&
        layer.children.length > 0
      ) {
        layer.children.forEach((t) => {
          GisBase.setLayerVisible(t, true, (success) => {
            if (success) {
              layer.status = 'show';
              layer.Timer && layer.Timer.Start();
            }
          });
        });
      } else {
        GisBase.setLayerVisible(layer, true, (success) => {
          if (success) {
            layer.status = 'show';
            layer.Timer && layer.Timer.Start();
          }
        });
      }
    }
  }
  /**
   * 隐藏图层
   * @param {object} layer 图层配置
   */
  hideLayer(layer) {
    if (layer.status == 'show') {
      if (
        layer.children &&
        Array.isArray(layer.children) &&
        layer.children.length > 0
      ) {
        layer.children.forEach((t) => {
          GisBase.setLayerVisible(t, false, (success) => {
            if (success) {
              layer.status = 'hide';
              layer.Timer && layer.Timer.Stop();
            }
          });
        });
      } else {
        GisBase.setLayerVisible(layer, false, (success) => {
          if (success) {
            layer.status = 'hide';
            layer.Timer && layer.Timer.Stop();
          }
        });
      }
    }
  }
  /**
   * 移除图层
   * @param {object} layer 图层配置
   */
  removeLayer(layer) {
    if (
      layer.children &&
      Array.isArray(layer.children) &&
      layer.children.length > 0
    ) {
      layer.children.forEach((t) => {
        if (t.isClick) {
          GisBase.endPickOverlay(t);
        } else {
          GisBase.removeLayer(t);
          layer.Timer && layer.Timer.Stop();
        }
      });
    } else {
      if (layer.isClick) {
        GisBase.endPickOverlay(layer);
      } else {
        GisBase.removeLayer(layer);
        layer.Timer && layer.Timer.Stop();
      }
    }
    layer.status = 'false';
  }

  /** 清除所有图层 */
  removeAllLayers() {
    for (let key in GisBase.layerType) {
      GisBase.removeLayerType(GisBase.layerType[key]);
    }
  }

  //#endregion

  //#region 环境

  startTimer() {
    this.envTimer = setInterval(
      (() => {
        this.environment.changeEnvTime();
      }).bind(this),
      1000 * 60 * 30
    );
  }

  stopTimer() {
    this.envTimer && clearInterval(this.envTimer);
  }

  //#endregion

  /**gisManager销毁 */
  destory() {
    clearInterval(this.envTimer);
    this.removeAllLayers();
  }

  /**
   * 切换模型（场景）
   * @param {场景名称} view
   */
  selectMenu(view) {
    if (this.store.$state.isAppInstance && view) {
      if (view.sceneName && view.sceneName !== this.store.$state.sceneName) {
        // 判断如果需要切场景的时候切换场景
        this.store.setAppInstance(false)
        this.environment.switchScene(view.sceneName)
      } else {
        // 判断如果不需要切换场景的时候设置镜头视角
        let cameraInfo = window.layerContral.cameraList.get(view.cameraName)
        this.camera.setCamera(cameraInfo)
      }
    }
  }

  /**
   * 切换场景默认图层
   * @param {string} sceneName 场景名称
   */
  ChangeSceneDefaultLayers(sceneName) {
    let layers = window.layerConfigs.sceneInfos.get(sceneName).layers;
    if (layers && Array.isArray(layers)) {
      switch (sceneName) {
        case '深莞':
          layers.forEach((layer) => {
            this.addLayer(layer);
          });
          break;
      }
    }
  }

  //#region 市区标牌  特效方式

  markerIds = [];
  addTopicDefault() {
    if (this.store.$state.isAppInstance) {
      //特效
      this.markerIds &&
        this.markerIds.forEach((id) => {
          this.model.remove3DMarker(id)
        })
      if (window.layerContral.defaultMarkers) {
        this.markerIds = [];
        let config = window.layerContral.defaultMarkers
        GisDataManager.getJsonData(config.jsonPath, (data) => {
          data.forEach((item) => {
            const { name, lon, lat, type } = item;
            config.id = name;
            config.coord = [Number(lon), Number(lat)];
            if (type) {
              config.type = type;
            }
            this.model.add3DMarker(config);
            this.markerIds.push(config.id);
          });
        });
      }
      //区县地标

      this.currentQX && this.gisBase.removeLayer(this.currentQX);
      if (window.layerContral.defaultLayer) {
        this.currentQX = window.layerContral.defaultLayer;
        this.currentQX.legends = [];
        GisDataManager.getData(this.currentQX, (data) => {
          data.forEach((item) => {
            console.log(item)
            this.currentQX.legends.push({
              name: item.type,
              color: '#fff0',
              iconName: item.type,
            });
          });
          this.landmarkLayer.addLayer(this.currentQX, data);
        });
      }
    }
  }

  //#endregion

  //#region 告警特效

  isAddAlarm = false;

  /**
   * 添加或更新告警点位
   * @param {double} lon 经度
   * @param {double} lat 纬度
   * @param {double} alt 高度
   */
  addOrUpdateAlarm(lon, lat, callback) {
    let config = {
      id: 'alarm',
      alpha: 1,
      scale: 8,
      type: 'Spread04',
      titleText: '',
      coord: [lon, lat],
      coordZ: 50,
    };
    let backFn = (callback) => {
      appInstance.uniCall(
        'pickOverlay',
        {
          overlayType: '3DMarker',
          idLayer: '',
          type: 'click',
        },
        (res) => {
          appInstance.uniCall('on3DMarkerLClick', {}, (res) => {
            callback && callback();
          });
        }
      );
    };
    if (this.isAddAlarm) {
      this.model.update3DMarkerCoord(config);
      setTimeout(() => {
        backFn(callback);
      }, 200);
    } else {
      this.model.add3DMarker(config, (isAdd) => {
        backFn(callback);
        this.isAddAlarm = isAdd;
      });
    }
    this.gisBase.focusById(config.id, '特效', 50);
  }
  /**删除特效 */
  removeAlarm() {
    if (this.isAddAlarm) {
      let config = {
        id: '3DMarker',
        alpha: 0,
        scale: 1,
        type: 'Spread04',
        titleText: '',
        coord: [0, 0],
        coordZ: 0,
      };
      this.model.update3DMarkerCoord(config);
      // this.isAddAlarm = false; //假删除不用改
    }
  }
  //#endregion
}
export default gisManager;
