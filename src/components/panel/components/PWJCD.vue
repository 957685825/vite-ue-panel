<template>
  <div class="text">
    {{props.data.id}}测试代码
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    default () {
      return {}
    }
  }
})
// const emit = defineEmits(['closePanel'])
// const close = () => {
//   emit('closePanel')
// }
console.log(props)
</script>
<style lang="less">
.text {
  color: #fff;
}
</style>
