import { createRouter, createWebHashHistory } from 'vue-router'
// import HelloWorld from '../components/HelloWorld.vue'
import left from '../view/ZongHeGaiLan/left.vue'
import right from '../view/ZongHeGaiLan/right.vue'

const routes = [
  {
    path: '/',
    redirect: '/ZhongHeGaiLan'
  },
  // {
  //   path: '/ZhongHeGaiLan',
  //   name: 'ZhongHeGaiLan',  // 这个名称要与themes文件名称相同
  //   meta: {
  //     cname: "综合概览"
  //   },
  //   component: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../components/HelloWorld.vue'),
  // },
  {
    path: '/ZhongHeGaiLan',
    meta: {
      cname: '综合概览',
      left: left,
      right: right
    },
    // component: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../view/ZongHeGaiLan/left.vue'),
    components: {
      default: right,
      left: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../view/ZongHeGaiLan/left.vue'),
      center: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../view/ZongHeGaiLan/center.vue'),
      right: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../view/ZongHeGaiLan/right.vue')
    }
  },
  {
    path: '/HangYeGuanLi',
    meta: {
      cname: '行业管理'
    },
    components: {
      left: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../view/HangYeGuanLi/left.vue'),
      center: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../view/HangYeGuanLi/center.vue'),
      right: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../view/HangYeGuanLi/right.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
