/* eslint-disable no-undef */
import apiGet from '../Api'

export default class BaseGisData {
  /**
   * 处理数据，减少数据传输
   * @param {Object} source 源对象
   * @param {Object} target 目标对象
   * @param {Array} props 属性集合
   */
  static copyObject (source, target, props) {
    props.forEach((d) => {
      if (source[d]) {
        target[d] = source[d]
      }
    })
    return target
  }

  /** 缓存字典 */
  static layerDataDic = new Map()

  /**
   * 缓存数据
   * @param {Object} layer 图层配置
   * @param {Object} data 数据
   */
  static CacheData (layer, data) {
    this.layerDataDic.set(layer.id, {
      scatterType: layer.scatterType,
      data: data
    })
  }

  /**
   * 获取选中项的缓存数据
   * @param {String} layerId 图层名称
   * @param {String} objId 对象名称
   */
  static getItem (layerId, objId) {
    if (this.layerDataDic.has(layerId)) {
      const data = this.layerDataDic.get(layerId)
      const temp = _.find(data.data, (t) => t.id === objId)
      if (temp && temp.sourceData) {
        const res = _.cloneDeep(temp.sourceData)
        res.scatterType = data.scatterType
        res.coord = temp.coord
        res.id = objId
        res.layerType = data.layerType
        return res
      }
    }
  }

  // 获取本地散点数据
  static getLocal = (layer, callback) => {
    const res = apiGet(layer.jsonPath)
    res.then((t) => {
      t = t.filter((item) => {
        const { lon, lat } = item
        if (lon && lat) {
          return item
        }
        return item
      })

      const data = t.map((item, index) => {
        const { lon, lat, alt, name, type, value } = item
        const dataItem = {
          id: layer.id + index,
          type: layer.legend?.name || type || name || '',
          coord: [Number(lon), Number(lat)],
          coordZ: layer.coordZ || alt || 0,
          label: layer.isShowLabel ? name : '',
          value: value || Math.random() * 100,
          sourceData: item
        }
        return dataItem
      })
      if (layer.isClick) {
        this.layerDataDic.set(layer.id, {
          layerType: layer.layerType,
          scatterType: layer.scatterType,
          data: data
        })
      }
      callback && callback(data)
    })
  }

  /** 获取轨迹数据 */
  static getTrailData (layer, callback) {
    const res = apiGet(layer.jsonPath)
    res.then((data) => {
      const timeGroup = _.groupBy(data, 'time')
      const allData = []
      console.log(timeGroup)
      for (const key in timeGroup) {
        const group = []
        timeGroup[key].forEach((point) => {
          group.push({
            id: point.bh,
            label: '',
            coord: [point.lon, point.lat],
            coordZ: layer.coordZ || 0,
            type: (layer.legend && layer.legend.name) || type || ''
          })
        })
        allData.push(group)
      }
      callback && callback(allData)
    })
  }

  /** 获取路径数据 */
  static getPathData (layer, callback) {
    const res = apiGet(layer.jsonPath)
    res.then((t) => {
      t = t.filter((item) => {
        // const { points } = item
        // return points ? item : null
        return item
      })

      const data = {}
      data.children = []
      layer.children = []

      t.forEach((item) => {
        const { id, points } = item
        const pathData = {
          id: id,
          points: points.map((p) => {
            return { coord: p, coordZ: layer.coordZ || 0 }
          }),
          sourceData: item
        }
        // 数据
        data.children.push({ path: pathData })
        // 图层

        const temp = this.copyObject(layer, {}, [
          'id',
          'name',
          'layerType',
          'type',
          'color',
          'colorPass',
          'width',
          'isClick'
        ])
        temp.id = layer.id + id
        temp.name = layer.id + id
        layer.children.push(temp)

        if (layer.isClick) {
          this.layerDataDic.set(temp.id, {
            scatterType: layer.scatterType,
            data: pathData
          })
        }
      })
      callback && callback(data)
    })
  }

  /** 获取数值区域图数据 */
  static getNumAreaData (layer, callback) {
    const res = apiGet(layer.jsonPath)
    res.then((t) => {
      const data = { areas: [], data: [] }
      t.forEach((item) => {
        const { name, points, value } = item
        const area = { name: name, points: [] }
        points.forEach((item) => {
          area.points.push({ coord: item, coordZ: layer.coordZ || alt || 0 })
        })
        data.areas.push(area)
        data.data.push({
          areaName: name,
          value: value
        })
      })
      callback && callback(data)
    })
  }
}
