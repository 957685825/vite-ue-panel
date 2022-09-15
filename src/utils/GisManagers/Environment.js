import GisBase from './GisBase';
/**环境 */
export default class Environment extends GisBase {
  constructor() {
    super('环境');
  }

  //#region 场景相关

  /**
   * 设置场景时间
   * @param {String} envTime 场景时间  HH:mm
   */
  changeEnvTime(envTime = new Date().format('hh:mm')) {
    window.appInstance.uniCall(
      'setEnvTime',
      {
        envTime: envTime,
        duration: 2,
      },
      (result) => {
        console.log('设置天气', result.result, result.message);
      }
    );
  }

  /**
   * 设置天气
   * @param {String} weather 天气 rain snow sunny
   */
  changeEnvWeather(weather) {
    window.appInstance.uniCall(
      'setEnvWeather',
      {
        envWeather: weather,
      },
      (result) => {
        console.log('设置天气', result.result, result.message);
      }
    );
  }

  /**
   * 切换模型（场景）
   * @param {string} sceneName 场景名称  ABuJiaBi,ABuJiaBi-L0,ABuJiaBi-ShiNei
   */
  switchScene(sceneName) {
    if (sceneName) {
      window.appInstance.uniCall('switchScene', {
        name: sceneName
      });
    }
  }

  //#endregion

  //#region 实时刷新测试

  envTimer = null;
  index = 20;

  changeEnvironment() {
    if (this.index++ >= 144) {
      this.index = 0;
    }
    let current =
      Math.floor((this.index * 30) / 60) + ':' + ((this.index * 30) % 60);
    this.log(current);
    window.appInstance.uniCall(
      'setEnvTime',
      {
        envTime: current,
        duration: 2,
      },
      (res) => {
        super.setCallBack('设置场景时间', res);
      }
    );
  }
  autochangeEnvironment() {
    this.index = 0;
    this.stopChangeEnvironment();
    this.envTimer = setInterval(this.changeEnvironment.bind(this), 3000);
  }
  stopChangeEnvironment() {
    clearInterval(this.envTimer);
  }

  //#endregion
}
