<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    this.$router.push({
      path:'/Apply'
    })
  }
};
</script>

<style lang="stylus">
html, body
  width 100%
  height 100%
  overflow-x hidden
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  background #EBEAE0
.cube-upload-def
  display flex
  align-items center
  justify-content center
  .cube-upload-btn-def
    width 2rem
    border-radius 100%
    box-shadow none
    &::after
      border-radius 100% !important
    & > i
      &::after
        width 1.1rem
</style>
