<template>
  <div class="text">
    {{props.data.id}}
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
