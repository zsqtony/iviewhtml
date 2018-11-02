import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import iEditor from 'iview-editor';
import iviewArea from 'iview-area';
import 'iview-editor/dist/iview-editor.css';
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './store'
import tables from './views/public/table.vue'
import config from './config.js'

Vue.use(iView)
Vue.use(iEditor)
Vue.use(VueQuillEditor)
Vue.use(iviewArea)
const API_URL = config.API_URL
Vue.prototype.$axios = axios
Vue.component('zsq-table',tables)
Vue.prototype.success = function(_this,title,desc){
  _this.$Notice.success({
    title: title,
    desc: desc != ''?desc:''
  });
}
Vue.prototype.error = function(_this,title,desc){
  _this.$Notice.error({
    title: title,
    desc: desc != '' ? desc : ''
  });
}

Vue.prototype.msgerror = function(_this,desc){
  _this.$Message.error(desc)
}

Vue.prototype.go=function(_this,url){
  _this.$router.push({
    path:url
  })
}

Vue.prototype.keynul = function(obj){ //对象不能为空遍历
  let datas = {}
  for(let i in obj){
    if(obj[i] != '' && obj[i] != null){
      datas[i] = obj[i]
    }
  }
  return datas
}
Vue.prototype.get = function(_this,url,funct){ //get请求  url地址  funct回调
  _this.$axios.get(API_URL + url,{headers:{'Authorization':'Bearer ' + config.JWTKEY}}).then(function (response) {
    if(response.data.code != 1){
      _this.error(_this,'错误提示',response.data.msg)
      if(response.data.code == -11000){
        _this.$router.replace({path: '/login'})
      }
      return false
    }
    return funct(response.data)
  }).catch(function (error) {
    console.log(error)
  })
}
Vue.prototype.post = function(_this,url,datas,funct){ //post请求     url地址  datas参数  funct回调
  _this.$axios.post(API_URL + url, datas,{headers:{'Authorization':'Bearer ' + config.JWTKEY}}).then(function (response) {
    if(response.data.code != 1){
      _this.error(_this,'错误提示',response.data.msg)
      if(response.data.code == -11000){
        _this.$router.replace({path: '/login'})
      }
      return false
    }
    return funct(response.data)
  }).catch(function (error) {
    console.log(error);
  });
}
Vue.prototype.loging = function(_this,url,datas,funct){ //登录post请求     url地址  datas参数  funct回调
  _this.$axios.post(API_URL + url, datas).then(function (response) {
    if(response.data.code != 1){
      _this.error(_this,'错误提示',response.data.msg)
    }
    return funct(response.data)
  }).catch(function (error) {
    console.log(error);
  });
}





Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
if (sessionStorage.userdata == undefined && to.name != 'login') {
  next({
    path: '/login'
  })
} else {
  next()
}
});

router.afterEach(route => {
  iView.LoadingBar.finish()
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
