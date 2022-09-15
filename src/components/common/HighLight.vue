<template>
  <div
    class="wraper"
    :class="store.highLight && store.highLight == val ? 'highlight' : ''"
    :style="css"
    @click="setHighLight"
  >
    <div class="layer"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { uesStore } from '../../store/index'
const store = uesStore()
const props = defineProps({
  val: {
    type: String,
    default: ''
  },
  css: {
    type: Object,
    default () {
      return {
        widht: 'auto',
        height: 'auto'
      }
    }
  }
})
const { val } = toRefs(props)
const setHighLight = () => {
  if (val.value === store.$state.highLight) {
    store.setHighLight(store.$state.topic)
  } else {
    store.setHighLight(val.value)
  }
}
</script>

<style lang="less" scoped>
.wraper {
  overflow: hidden;
  position: relative;
}
.highlight .layer {
  display: block;
}
.layer {
  box-sizing: border-box;
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  border: 2px #f9fe25 solid;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65) inset;
    background-color: rgba(255, 201, 38, 0.15);
  }
}
</style>
