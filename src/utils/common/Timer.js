export default class Timer {
  constructor(interval, tick) {
    this.TimerInterval = interval && interval;
    this.TimerTick = tick && tick;
  }
  //计时器
  Timer = null;
  //计时器操作
  TimerTick = null;
  //时间间隔
  TimerInterval = 1000;
  //结束计时器
  Stop() {
    this.Timer && clearInterval(this.Timer);
    this.Timer = null;
  }
  //开始计时器
  Start() {
    let that = this;
    if (!that.Timer && that.TimerTick) {
      that.TimerTick();
      that.Timer = setInterval(() => {
        that.TimerTick();
      }, that.TimerInterval);
    }
  }
}
