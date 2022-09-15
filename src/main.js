import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import 'animate.css/animate.min.css'
import { createPinia } from 'pinia'
import HighLight from '@/components/common/HighLight.vue'
import * as echarts from 'echarts'
// eslint-disable-next-line no-unused-vars
import * as _ from 'lodash'
window._ = _
const app = createApp(App)
app.component('HighLight', HighLight)
app.config.globalProperties.$echarts = echarts

app.config.warnHandler = () => null
app.use(createPinia())
app.use(router)
app.mount('#app')
