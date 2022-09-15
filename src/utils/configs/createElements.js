import { createApp } from 'vue'
class CreateElement {
  #createApp = (Component, props) => {
    // vue创建虚拟dom
    const app = createApp(Component, props)
    return app
    // const vm = new Vue({
    //   render(h) {
    //     return h(Component, { props })
    //   }
    // }).$mount()
    // return vm.$el
  }

  getDivId (component, info) {
    const divId = info.layerConfig.id
    const el = document.createElement('div')
    el.setAttribute('id', divId)
    const vm = this.#createApp(component, info)
    const popup = document.getElementById('app')
    vm.mount(el)
    popup.appendChild(el)
    return divId
  }
}
const createElement = new CreateElement()
export default createElement
