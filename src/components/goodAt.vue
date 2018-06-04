<!-- 善长组件 -->
<template>
  <div class="goodAt-container" v-if="showFlag" @click.stop>
    <div class="box-bj border-1px">
      <div class="dialog-container">
        <div class="dialog-title">擅长</div>
        <cube-checkbox-group v-model="checkList" :options="getOptions" />
        <div class="btn-box">
          <div class="cancel" @click="cancelBox">取消</div>
          <div class="makeSure" @click="confimBox">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const options = [
        {
          label: '中蜂养殖',
          value: '中蜂养殖'
          
        },
        {
          label: '意蜂养殖',
          value: '意蜂养殖'
          
        },
        {
          label: '蜂产品生产',
          value: '蜂产品生产'
          
        },
        {
          label: '抗生素管理',
          value: '抗生素管理'
          
        },
        {
          label: '蜂器具',
          value: '蜂器具'
          
        },
        {
          label: '蜜蜂疾病',
          value: '蜜蜂疾病'
        },
        {
          label:'蜂产品科普',
          value:'蜂产品科普'
        },{
          label:'蜂药使用',
          value:'蜂药使用'
        }
      ]
export default {
  props:{
      title:{
        type:String,
        default:'擅长'
      },
      getOptions:{
        type:Array,
        default:function(){
          return options
        }
      }
    },
  data() {
    return {
      checkList:[],
      showFlag:false
    }
  },
  mounted(){
    // this.getCheckList = this.checkList
  },
  methods:{
    show(){
      this.showFlag = true
      // this.getCheckList = this.checkList
    },
    cancel(){
      this.showFlag = false
    },
    cancelBox(){
      this.cancel()
      this.$emit('hide')
    },
    confimBox(){
      this.cancel()
      this.$emit('confimSure',this.checkList)
    }
  }
}
</script>
<style lang='stylus' scoped>
.goodAt-container
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background rgba(0, 0, 0, 0.5)
  padding-top 25px
  z-index 999
  .box-bj
    width 95%
    margin 0 auto
    background #ffffff
    border-radius 10px
    .dialog-title
      text-align center
      color #989898
      font-size 20px
      height 50px
      line-height 50px
  .btn-box
    display flex
    line-height 50px
    & > div
      flex 1
      text-align center
      color #FDC705
      font-size 17px
</style>