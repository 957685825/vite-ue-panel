<script setup>
</script>
<template>
  <div class="header">
    <p>丽江文旅指挥中心</p>
  </div>
</template>
<style lang="less">
.header {
  p {
    font-family: "碳纤维正中黑简体";
    font-size: 52px;
    background: linear-gradient(to bottom, #ffffff, #abe1f3);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    line-height: 105px;
    text-align: center;
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 105px;
  overflow: hidden;
  z-index: 10;
  background-position: top center;
  background-repeat: no-repeat;
  background: url(../../assets/img/layout/title.png) center top no-repeat;
  .time {
    width: 440px;
    float: right;
    margin-top: -4px;
    margin-right: 50px;
  }
  .clock_pos {
    position: absolute;
    right: 40px;
    top: 20px;
  }
}
</style>
