var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

const Gps = (function() {
  function Gps(wgLat, wgLon) {
    _classCallCheck(this, Gps);

    this.wgLat = wgLat;
    this.wgLon = wgLon;
  }

  _createClass(Gps, [
    {
      key: 'getWgLon',
      value: function getWgLon() {
        return this.wgLon;
      }
    },
    {
      key: 'getWgLat',
      value: function getWgLat() {
        return this.wgLat;
      }
    },
    {
      key: 'toString',
      value: function toString() {
        return this.wgLat + ',' + this.wgLon;
      }
    }
  ]);

  return Gps;
})();

var pi = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
 * 坐标转换帮助类
 */

const PositionUtil = (function() {
  function PositionUtil() {
    _classCallCheck(this, PositionUtil);
  }

  _createClass(PositionUtil, null, [
    {
      key: 'outOfChina',
      value: function outOfChina(lat, lon) {
        if (lon < 72.004 || lon > 137.8347) return true;
        if (lat < 0.8293 || lat > 55.8271) return true;
        return false;
      }
    },
    {
      key: 'transformLat',
      value: function transformLat(x, y) {
        var ret =
          -100.0 +
          2.0 * x +
          3.0 * y +
          0.2 * y * y +
          0.1 * x * y +
          0.2 * Math.sqrt(Math.abs(x));
        ret +=
          ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) *
            2.0) /
          3.0;
        ret +=
          ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) /
          3.0;
        ret +=
          ((160.0 * Math.sin((y / 12.0) * pi) +
            320 * Math.sin((y * pi) / 30.0)) *
            2.0) /
          3.0;
        return ret;
      }
    },
    {
      key: 'transformLon',
      value: function transformLon(x, y) {
        var ret =
          300.0 +
          x +
          2.0 * y +
          0.1 * x * x +
          0.1 * x * y +
          0.1 * Math.sqrt(Math.abs(x));
        ret +=
          ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) *
            2.0) /
          3.0;
        ret +=
          ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) /
          3.0;
        ret +=
          ((150.0 * Math.sin((x / 12.0) * pi) +
            300.0 * Math.sin((x / 30.0) * pi)) *
            2.0) /
          3.0;
        return ret;
      }
    },
    {
      key: 'gps84ToGcj02',
      value: function gps84ToGcj02(lat, lon) {
        if (PositionUtil.outOfChina(lat, lon)) {
          return null;
        }
        var dLat = PositionUtil.transformLat(lon - 105.0, lat - 35.0);
        var dLon = PositionUtil.transformLon(lon - 105.0, lat - 35.0);
        var radLat = (lat / 180.0) * pi;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
        dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
        var mgLat = lat + dLat;
        var mgLon = lon + dLon;
        return new Gps(mgLat, mgLon);
      }
    },
    {
      key: 'transform',
      value: function transform(lat, lon) {
        if (PositionUtil.outOfChina(lat, lon)) {
          return new Gps(lat, lon);
        }
        var dLat = PositionUtil.transformLat(lon - 105.0, lat - 35.0);
        var dLon = PositionUtil.transformLon(lon - 105.0, lat - 35.0);
        var radLat = (lat / 180.0) * pi;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
        dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
        var mgLat = lat + dLat;
        var mgLon = lon + dLon;
        return new Gps(mgLat, mgLon);
      }
    },
    {
      key: 'gcj02ToGps84',
      value: function gcj02ToGps84(lat, lon) {
        var gps = PositionUtil.transform(lat, lon);
        var lontitude = lon * 2 - gps.getWgLon();
        var latitude = lat * 2 - gps.getWgLat();
        return new Gps(latitude, lontitude);
      }
    }
  ]);

  return PositionUtil;
})();

class GisUtil {
  constructor() {}
  //#region 基础方法

  static outOfChina(lon, lat) {
    if (lon < 72.004 || lon > 137.8347) return true;
    if (lat < 0.8293 || lat > 55.8271) return true;
    return false;
  }

  static transformLat(x, y) {
    let temp =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    temp +=
      ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
      3.0;
    temp +=
      ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0;
    temp +=
      ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) *
        2.0) /
      3.0;
    return temp;
  }

  static transformLon(x, y) {
    let temp =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    temp +=
      ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
      3.0;
    temp +=
      ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0;
    temp +=
      ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) *
        2.0) /
      3.0;
    return temp;
  }

  static gps84ToGcj02(lat, lon) {
    if (this.outOfChina(lat, lon)) {
      return null;
    }
    let dLat = this.transformLat(lon - 105.0, lat - 35.0);
    let dLon = this.transformLon(lon - 105.0, lat - 35.0);
    let radLat = (lat / 180.0) * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
    let mgLat = lat + dLat;
    let mgLon = lon + dLon;
    return new Gps(mgLat, mgLon);
  }

  static transform(lat, lon) {
    if (this.outOfChina(lat, lon)) {
      return new Gps(lat, lon);
    }
    let dLat = this.transformLat(lon - 105.0, lat - 35.0);
    let dLon = this.transformLon(lon - 105.0, lat - 35.0);
    let radLat = (lat / 180.0) * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
    let mgLat = lat + dLat;
    let mgLon = lon + dLon;
    return new Gps(mgLat, mgLon);
  }

  static gcj02ToGps84(lat, lon) {
    var gps = PositionUtil.transform(lat, lon);
    var lontitude = lon * 2 - gps.getWgLon();
    var latitude = lat * 2 - gps.getWgLat();
    return new Gps(latitude, lontitude);
  }

  /** 墨卡托转经纬度 */
  static Mercator2LonLat(mercator) {
    var lonlat = {};
    var x = (mercator.x / 20037508.3427892) * 180;
    var y = (mercator.y / 20037508.3427892) * 180;
    y =
      (180 / Math.PI) *
      (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2);
    lonlat.x = x;
    lonlat.y = y;
    return lonlat;
  }

  /** 经纬度转墨卡托 */
  static lonLat2Mercator(lon, lat) {
    let mercator;
    let x = (lon * 20037508.34) / 180;
    let y = Math.Log(Math.Tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
    y = (y * 20037508.34) / 180;
    mercator.X = x;
    mercator.Y = y;
    return mercator;
  }

  //#endregion

  //#region

  // 经纬度转换成三角函数中度分表形式。
  static rad(d) {
    return (d * Math.PI) / 180.0;
  }

  // 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  static getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      );
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里

    var distance = s;
    var distance_str = '';

    if (parseInt(distance) >= 1) {
      distance_str = distance.toFixed(1) + 'km';
    } else {
      distance_str = distance * 1000 + 'm';
    }

    //s=s.toFixed(4);

    console.info('lyj 距离是', s);
    console.info('lyj 距离是', distance_str);
    return s;
  }

  /**
   * 获取两个点中心点的经纬度-目前不是很好用
   * @param {object} point1 第一个点{lon:113,lat:22}
   * @param {object} point2 第二个点
   */
  static getCenterPoint(point1, point2) {
    let lon = 0,
      lat = 0;
    let lonTemp = point1.lon - point2.lon;
    let latTemp = point1.lat - point2.lat;

    if (lonTemp > 0) {
      lon = point1.lon - Math.abs(lonTemp) / 2;
    } else {
      lon = point2.lon - Math.abs(lonTemp) / 2;
    }
    if (latTemp > 0) {
      lat = point1.lat - Math.abs(latTemp) / 2;
    } else {
      lat = point2.lat - Math.abs(latTemp) / 2;
    }
    return { lon: lon, lat: lat };
  }

  //#endregion
}

export { PositionUtil, GisUtil };
