<template>
  <div style="display: flex">
    <div class="gjtp-item" v-for="item in datalist" :key="item.index">
      <div class="img">
        <!-- <img :src="item.img" alt=""> -->
        <swiper class="banner" :options="swiperOpiton" ref="mySwiper">
          <swiper-slide v-for="(item1, index) in datalist" :key="index">
            <img :src="item1.img" alt="" />
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
      </div>
      <div class="title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
.gjtp-item + .gjtp-item {
  margin-left: 30px;
}
.gjtp-item {
  width: 341px;
  height: 192px;
  background: url("./img/gjtp-bg.png");
  .img {
    width: 334px;
    height: 145px;
    margin-left: 3px;
    margin-top: 3px;
  }
  .title {
    width: 339px;
    height: 33px;
    margin-top: 10px;
    font-family: "微软雅黑";
    font-size: 16px;
    color: #cbf276;
    text-align: center;
    line-height: 33px;
  }
}
</style>
