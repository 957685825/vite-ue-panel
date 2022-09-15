<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const navList = ref([])
onBeforeMount(() => {
  navList.value = router.options.routes.filter((item) => {
    return item.path !== '/'
  })
})
</script>

<template>
  <div class="nav" :style="{ width: navList.length * 180 + 'px' }">
    <router-link
      v-for="nav in navList"
      :key="nav.name"
      :to="nav.path"
      class="menu_item"
      active-class="menu_item_ac"
    >
      <div class="txt">{{ nav.meta.cname }}</div>
    </router-link>
  </div>
</template>

<style scoped lang="less">
.nav {
  position: absolute;
  top: 116px;
  left: 50%;
  transform: translateX(-50%);
  width: 1100px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  pointer-events: all;
  .menu_item {
    font-family: "汉仪菱心体简";
    width: 160px;
    height: 50px;
    font-size: 28px;
    text-align: center;
    line-height: 38px;
    background: url(../../assets/img/layout/nav-bg.png) no-repeat center center;
    .txt {
      color: #dcfcfe;
      text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.75);
    }
  }
  .menu_item_ac {
    background: url(../../assets/img/layout/nav-bg-ac.png) no-repeat center
      center;
    .txt {
      color: #e1c276;
      text-shadow: none;
    }
  }
}
</style>
