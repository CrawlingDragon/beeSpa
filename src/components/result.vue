<!--  -->

<template>
  <transition name="result">
    <div class="result-box">
      <div class="result-container">
        <div class="result-im"></div>
        <h3>恭喜专家申请已提交</h3>
        <h6>蜂博士会发送短信告知您审核结果，请耐心等候</h6>
      </div>
      <a href="" class="bee-href">打开蜂博士APP，近距离勾搭蜂农和专家</a>
    </div>
  </transition>
</template>

<script>
export default {
  mounted(){
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
  }
}
</script>
<style lang='stylus' scoped>
.result-enter-active, .result-leave-active
  transition all 0.5s
.result-enter, .result-leave-to
  transform translate(200%, 0)
  opacity 1
bg-img($url)
  background-image url($url + '@2x.png')
  background-size cover
  background-position center
  background-repeat no-repeat
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
    background-image url($url + '@3x.png')
    background-size cover
    background-position center
    background-repeat no-repeat
.result-box
  width 100%
  height 100%
  background #EBEAE0
  position fixed
  left 0
  top 0
  bottom 0
  right 0
.result-container
  margin 114px auto 0
  text-align center
  .result-im
    width 75px
    height 75px
    bg-img('../src/assets/images/result')
    margin 0 auto
  & > h3
    font-size 22px
    color #542000
    margin-top 15px
  & > h6
    color #282828
    margin-top 35px
    font-size 13px
.bee-href
  display block
  line-height 55px
  color #542000
  font-size 18px
  position absolute
  bottom 40px
  left 10px
  right 10px
  background #FDC705
  border-radius 10px
</style>