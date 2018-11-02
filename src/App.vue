<template>
  <div id="app">
    <router-view/>
    <BackTop></BackTop>
  </div>
</template>

<style lang="less">
#app {
  color: #2c3e50;
}
.courselistImg{width:100px;height:80px;line-height:80px;margin-bottom:5px;text-align:center;border:1px solid #f1f1f1;overflow:hidden;img{width:auto;height:80px;}}
#container{width:100%;height:400px;position:relative;z-index:1;}
.left_s{float:left;}
.right_s{float:right;}
</style>
