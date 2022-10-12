import { createRouter, createWebHashHistory } from 'vue-router'
// import HelloWorld from '../components/HelloWorld.vue'
import left from '../view/ZongHeGaiLan/left.vue'
import right from '../view/ZongHeGaiLan/right.vue'

const routes = [
  {
    path: '/',
    redirect: '/PingYangQuanJing'
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
    path: '/PingYangQuanJing',
    meta: {
      cname: '平阳全景',
      left: left,
      right: right
    },
    // component: () => import(/* webpackChunkName: "ZongHeGaiLan" */ '../view/ZongHeGaiLan/left.vue'),
    components: {
      default: right,
      left: () => import(/* webpackChunkName: "PingYangQuanJing" */ '../view/ZongHeGaiLan/left.vue'),
      center: () => import(/* webpackChunkName: "PingYangQuanJing" */ '../view/ZongHeGaiLan/center.vue'),
      right: () => import(/* webpackChunkName: "PingYangQuanJing" */ '../view/ZongHeGaiLan/right.vue')
    }
  },
  {
    path: '/ChengShiZhiLi',
    meta: {
      cname: '城市治理'
    },
    components: {
      left: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/left.vue'),
      center: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/center.vue'),
      right: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/right.vue')
    }
  },
  {
    path: '/JingJiYunXing',
    meta: {
      cname: '经济运行'
    },
    components: {
      left: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/left.vue'),
      center: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/center.vue'),
      right: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/right.vue')
    }
  },
  {
    path: '/ChengShiZhiGuan',
    meta: {
      cname: '城市智管'
    },
    components: {
      left: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/left.vue'),
      center: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/center.vue'),
      right: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/right.vue')
    }
  },
  {
    path: '/MinShengBaoZhang',
    meta: {
      cname: '民生保障'
    },
    components: {
      left: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/left.vue'),
      center: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/center.vue'),
      right: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/right.vue')
    }
  },
  {
    path: '/YiLiaoJianKang',
    meta: {
      cname: '医疗健康'
    },
    components: {
      left: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/left.vue'),
      center: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/center.vue'),
      right: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/right.vue')
    }
  },
  {
    path: '/ZhiHuiJiaoYu',
    meta: {
      cname: '智慧教育'
    },
    components: {
      left: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/left.vue'),
      center: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/center.vue'),
      right: () => import(/* webpackChunkName: "ChengShiZhiLi" */ '../view/HangYeGuanLi/right.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
