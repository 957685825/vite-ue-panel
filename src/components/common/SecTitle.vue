<script setup>
defineProps({
  val: {
    type: String,
    default: () => {
      return '历年投诉量趋势对比'
    }
  }
})
</script>
<template>
  <div>
    <div class="custom-title">
      <span class="tips">{{ val }}</span>
      <div class="right_cont">
        <!-- 默认插槽 -->
        <div class="default-slot">
          <slot></slot>
        </div>
        <!-- 下拉选插槽 -->
        <div class="down-select">
          <slot name="downselect"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.custom-title {
  position: relative;
  width: 100%;
  height: 24px;
  font-size: 20px;
  background: url("../../assets/img/commonComponents/sub_title_bg.png")
    no-repeat left;
  & .tips {
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 10px;
    background: linear-gradient(to bottom, #fff, #8dedf8);
    -webkit-background-clip: text;
    color: transparent;
    font-family: "碳纤维正中黑简体";
  }
  .right_cont {
    position: absolute;
    pointer-events: all;
    top: 0px;
    right: 0px;
    display: flex;
    .default-slot {
      display: flex;
    }
  }
}
</style>
