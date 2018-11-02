import Vue from 'vue'
import Vuex from 'vuex'
import menul from './assets/menu.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heaermenyidx:1,   //顶部当前高亮菜单
    left_menu:[], //左侧菜单
    breadcrumbobj:[],
  },
  mutations: {
    header_menu_leftmeny(state,obj){
      menul.menuobj.forEach((res)=>{
        if(res.idx == obj.idx){
          state.left_menu = res.children
          state.breadcrumbobj = [obj.title]
        }
      })
      console.log(state.left_menu,menul.menuobj,obj.title,state.breadcrumbobj,'高亮')
    }
  },
  actions: {

  }
})
