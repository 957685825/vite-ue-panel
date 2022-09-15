
// const modulesFiles = require.context('./themes', true, /.js$/)
import cameraList from './cameraList'
export default class LayerContral {
  cameraList = cameraList
  constructor () {
    this.modules = []
    this.init()
  }

  init () {
    const modulesFiles = import.meta.globEager('../themes/*.js')
    const keys = Object.keys(modulesFiles)
    for (const path of keys) {
      const name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.js'))
      modulesFiles[name] = modulesFiles[path].default
      this.modules.push(modulesFiles[path].default)
    }
    this.modules.forEach(topic => {
      for (const key in topic.allLayers) {
        topic.allLayers[key].forEach(layer => {
          layer.status = 'false'
        })
      }
    })
  }
}
// let layerContral = new layerContral()
// export default layerContral
