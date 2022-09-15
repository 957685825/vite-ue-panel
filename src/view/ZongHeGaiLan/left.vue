<script setup>
import FirstLevelTitle from '@/components/common/FirstLevelTitle.vue'
import SecTitle from '@/components/common/SecTitle.vue'
import CommonCiYunTu from '@/components/ZongHeGaiLan/left/CommonCiYunTu.vue'
import GaoJingTuPian from '@/components/ZongHeGaiLan/left/GaoJingTuPian.vue'

defineProps({
  msg: String
})
</script>

<template>
  <div class="layout_left">
    <div class="chizailijiang">
      <HighLight val="吃在丽江">
        <FirstLevelTitle val="吃在丽江"></FirstLevelTitle>
      </HighLight>
      <div class="canyinresou">
        <SecTitle val="餐饮热搜"></SecTitle>
        <div class="bg">
          <CommonCiYunTu
            :rowData="rowData"
            :width="'690px'"
            :height="'160px'"
          />
        </div>
      </div>
      <div class="gaojingtupian">
        <SecTitle val="告警图片"></SecTitle>
        <div style="margin-top: 20px">
          <GaoJingTuPian :datalist="gjtpData"></GaoJingTuPian>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.chizailijiang {
  width: 717px;
  height: 561px;
  .canyinresou {
    margin-top: 20px;
    width: 716px;
    height: 212px;
    .bg {
      margin-top: 20px;
      width: 716px;
      height: 171px;
      background: url("../../assets/img/ZongHeGaiLan/czlj1.png");
    }
  }
  .gaojingtupian {
    margin-top: 20px;
    width: 711px;
    height: 234px;
  }
}
</style>
