import Vue from 'vue'
import Router from 'vue-router'
import frame from './views/frame.vue'
import home from './views/Home.vue'

import findpage from './views/findpage.vue'
import Loging from './views/loging.vue'

import courselist from './views/lineroad/list.vue'
import addcourse from './views/lineroad/addcourse.vue'
import editorline from './views/lineroad/editorline.vue'

import commodity from './views/lineroad/commodity.vue'

import orderlist from './views/order/list.vue'
import travellist from './views/order/travellist.vue'

import newgroup from './views/group/newgroup.vue'
import grouolist from './views/group/grouolist.vue'

import memberlist from './views/member/list.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'frame',
      component: frame,
      children:[
        {
          path: '/',
          name: 'home',
          component: home
        },{
          path: '/findpage',
          name: 'findpage',
          component:findpage,
          children:[
            {
              path: '/line/courselist',
              name: 'courselist',
              component:courselist
            },{
              path: '/line/addcourse',
              name: 'addcourse',
              component:addcourse
            },{
              path: '/line/editorline',
              name: 'editorline',
              component:editorline
            },{
              path: '/line/commodity',
              name: 'commodity',
              component:commodity
            },{
              path: '/order/orderlist', //订单列表
              name: 'orderlist',
              component:orderlist
            },{
              path: '/order/travellist', //出行人列表
              name: 'travellist',
              component:travellist
            },{
              path: '/group/newgroup', //出团管理
              name: 'newgroup',
              component:newgroup
            },{
              path: '/group/grouolist', //出团列表
              name: 'grouolist',
              component:grouolist
            },{
              path: '/member/memberlist', //会员列表
              name: 'memberlist',
              component:memberlist
            }
          ]
        }
      ]
    },{
      path: '/login',
      name: 'login',
      component:Loging
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
