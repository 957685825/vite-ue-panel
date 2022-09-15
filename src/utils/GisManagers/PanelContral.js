import createElement from '../configs/createElements'
import panelSizeConfig from '../configs/panelSizeConfig'
import Index from '../../components/panel/index.vue'
import GisBase from './GisBase';

export default class PanelContral {
  /**
   * 添加标牌
   * @param {*散点数据} layerConfig 
   * @returns 
   */
  static addPanel (layerConfig) {
    appInstance.uniCall('removeOverlayTip', {
      id: '',
      overlayType: 'landmarkLayer',
    });
    if(!layerConfig) return
    let size = panelSizeConfig[layerConfig.scatterType] || ''
    let jsonData = {
      id: layerConfig.id,
      url: "",
      divId: createElement.getDivId(Index, {size, layerConfig}),
      isShowClose: false,
      size: size || [400, 400],
      offset: [0, 0],
      // overlayType: info.layerType,
      overlayType: GisBase.layerType[layerConfig.layerType]
    }
    appInstance.uniCall("addOverlayTip", jsonData)
  }
  static removePanel (layerConfig) {
    appInstance.uniCall('removeOverlayTip', {
      id: '',
      overlayType: GisBase.layerType[layerConfig.layerType],
    });
    appInstance.uniCall('clickOverlayType', {
      idLayer: '',
      selected: false,
      overlayType: GisBase.layerType[layerConfig.layerType],
    });
  }
}
// const panelContral = new PanelContral()
// export default panelContral