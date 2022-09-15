import BaseGisData from '@/api/Gis/BaseGisData'
import panelContral from './PanelContral'
/** 基础设置和方法 */
class CommonClick {
  /** 本地视频 */
  static showLocalVideo(id, overlayType, url) {
    CommonClick.removeTipByType(() => {
      window.appInstance.uniCall('addOverlayTip', {
        id: id,
        url: window.streamingConfig.panelURL + url,
        // 分辨率原因 此处配置全部缩小2倍
        size: [300, 200],
        offset: [0, 0],
        overlayType: overlayType,
        isShowClose: true,
      });
      CommonClick.currentSelected.tipType = overlayType;
    });
  }
  /** 下钻视角 */
  static showViewConfig(item) {
    //散点视角下钻
    let view = window.currentLayer.defaultView.scatterView;
    view.centerCoord = item.coord;
    view.coordType = 0;
    view.coordTypeZ = 0;
    item.coord && window.gisManager.camera.setCamera(view);
  }
  /** 聚焦散点 */
  static showView(result, overlayType) {
    appInstance.uniCall('focusByLayer', {
      id: result.idObj,
      idLayer: result.idLayer,
      layerType: overlayType,
      distance: 100,
    });
  }
  /** 弹框 */
  static showPanel(id, overlayType, item, size, offset) {
    appInstance.uniCall('addOverlayTip', {
      id: id,
      url:
        window.streamingConfig.panelURL +
        '/panel/index.html?' +
        JSON.stringify(item),
      // 分辨率原因 此处配置全部缩小2倍
      size: size,
      offset: offset ? offset : [0, 0],
      overlayType: overlayType,
      isShowClose: false,
    });
    CommonClick.currentSelected.tipType = overlayType;
  }

  static currentSelected = {
    tipType: null,
    isSelected: false,
  };
  static removeTipByType(callback) {
    //取消当前选中状态
    if (CommonClick.currentSelected.tipType) {
      window.appInstance.uniCall(
        'removeOverlayTip',
        {
          overlayType: CommonClick.currentSelected.tipType,
        },
        (res) => {
          callback && callback(res.result);
        }
      );
    } else {
      callback && callback(res.result);
    }
  }
}
/** 散点点击 */
class LandmarkLayerClick {
  constructor() {}
  overlayType = 'landmarkLayer';
  panelSize = { 告警点位: [450, 152] };
  offsetSize = {}; //特殊需要修改的
  /**
   * 点击回调
   * @param {Object} result 点击回调参数
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return;
    }
    let that = this.ueAction;
    //关闭弹框
    // CommonClick.removeTipByType();
    let item = BaseGisData.getItem(result.idLayer, result.idObj);
    if (result.selected) {
      //选中
      if (!item || !item.scatterType) {
        return;
      }
      console.info('地标图点击选中', item);
      panelContral.addPanel(item)
    } else {
      panelContral.removePanel(item)
    }
  }
}
/** 柱图点击 */
class BarLayerClick {
  constructor() {}
  overlayType = '3DColumnLayer';
  panelSize = { 安保人员柱图: [450, 152] };
  offsetSize = {}; //特殊需要修改的
  /**
   * 点击回调
   * @param {Object} result 点击回调参数
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return;
    }
    //关闭弹框
    CommonClick.removeTipByType();
    let that = this.ueAction;
    if (result.selected) {
      //选中
      let item = BaseGisData.getItem(result.idLayer, result.idObj);
      if (!item || !item.scatterType) {
        return;
      }
      console.info('柱图点击选中', item);
      let showViews = [];
      if (showViews.includes(item.scatterType)) {
        CommonClick.showView(result, that.overlayType); //测试不能聚焦
      }
      let showPanels = ['安保人员柱图'];
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.idObj,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        );
      }
    } else {
    }
  }
}
/** 链路点击 */
class ODLineLayerClick {
  constructor() {}
  overlayType = 'ODLineLayer';
  panelSize = {};
  offsetSize = {}; //特殊需要修改的
  /**
   * 点击回调
   * @param {Object} result 点击回调参数
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return;
    }
    //取消选中
    CommonClick.removeTipByType();
    let that = this.ueAction;
    if (result.selected) {
      //选中
      let item = BaseGisData.getItem(result.idLayer, result.idObj);
      if (!item || !item.scatterType) {
        return;
      }
      console.info('链路点击选中', item);
      let showViews = [];
      if (showViews.includes(item.scatterType)) {
        CommonClick.showView(result, that.overlayType); //没试过
      }
      let showPanels = [];
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.idObj,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        );
      }
    } else {
    }
  }
}
/** 路径点击 */
class PathLayerClick {
  constructor() {}
  overlayType = 'path';
  panelSize = {};
  offsetSize = {}; //特殊需要修改的
  /**
   * 点击回调
   * @param {Object} result 点击回调参数
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return;
    }
    //取消选中
    CommonClick.removeTipByType();
    let that = this.ueAction;
    if (result.selected) {
      //选中
      let item = BaseGisData.getPathItem(result.id);
      if (!item || !item.scatterType) {
        return;
      }
      console.info('路径点击选中', item);
      let showViews = [];
      if (showViews.includes(item.scatterType)) {
        CommonClick.showView(result, that.overlayType); //没试过
      }
      let showPanels = ['安保人员柱图'];
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.id,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        );
      }
    } else {
    }
  }
}
/** 区域点击 */
class AreaLayerClick {
  constructor() {}
  overlayType = 'area';
  panelSize = {};
  offsetSize = {}; //特殊需要修改的
  /**
   * 点击回调
   * @param {Object} result 点击回调参数
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return;
    }
    //取消选中
    CommonClick.removeTipByType();
    let that = this.ueAction;
    if (result.selected) {
      //选中
      let item = BaseGisData.getItem(result.id);
      if (!item || !item.scatterType) {
        return;
      }
      console.info('区域点击选中', item);
      let showPanels = ['视频周界'];
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.id,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        );
      }
    } else {
    }
  }
}
/** 类型区域点击 */
class TypeAreaLayerClick {
  constructor() {}
  overlayType = 'typeAreaLayer';
  panelSize = {};
  offsetSize = {}; //特殊需要修改的
  /**
   * 点击回调
   * @param {Object} result 点击回调参数
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return;
    }
    //取消选中
    CommonClick.removeTipByType();
    let that = this.ueAction;
    if (result.selected) {
      //选中
      let item = BaseGisData.getItem(result.idLayer, result.idObj);
      if (!item || !item.scatterType) {
        return;
      }
      console.info('类型区域点击选中', item);
      let showPanels = ['视频周界'];
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.id,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        );
      }
    } else {
    }
  }
}
export {
  CommonClick,
  LandmarkLayerClick,
  BarLayerClick,
  ODLineLayerClick,
  PathLayerClick,
  AreaLayerClick,
  TypeAreaLayerClick,
};
