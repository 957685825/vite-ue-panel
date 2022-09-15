<template>
  <div class="title_wrap">
    <div class="leftline"></div>
    <div class="botline"></div>
    <div class="rightract"></div>
    <div class="left_txt">
      <img src="../../assets/img/commonComponents/title_bg.png" />
      <span>{{ val }}</span>
    </div>
    <div class="right_cont">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  val: {
    type: String,
    default: '测试代码'
  }
})
</script>

<style lang="less">
.title_wrap {
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  height: 40px;
  position: relative;
  .botline {
    width: calc(100% - 7px);
    height: 1px;
    background-color: #9febfb;
    left: 0;
    bottom: 0;
    position: absolute;
  }
  .leftline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 8px;
    background-color: #9febfb;
  }
  .rightract {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 3px;
    height: 3px;
    background-color: #bbf1f7;
  }
  .left_txt {
    width: 380px;
    height: 32px;
    position: relative;
    display: flex;
    span {
      position: absolute;
      font-family: "碳纤维正中黑简体";
      font-size: 30px;
      line-height: 34px;
      background: linear-gradient(to bottom, #fff, #dbf2f5);
      -webkit-background-clip: text;
      color: transparent;
      left: 30px;
    }
  }
  .right_cont {
    position: absolute;
    pointer-events: all;
    top: 7px;
    right: 10px;
    display: flex;
  }
}
</style>
