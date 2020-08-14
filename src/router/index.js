/* jshint esversion: 6 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import {checktoken} from '../api/login'


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    name: '登陆',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: '主页',
    component: () => import('../views/Home.vue'),
    children: [{
        path: '/home/order/ordermanage',
        name: '订单管理',
        component: () => import('../views/Order/Ordermanage.vue'),
        meta: {
          title:['主页','订单管理']
        }
      },
      {
        path: '/home/userinfo',
        name: '用户信息',
        component: () => import('../views/Userinfo.vue'),
        meta: {

          title:['主页','用户信息']

        }
      },
      {
        path: '/home/index',
        name: '后台首页',
        component: () => import('../views/Index.vue'),
        meta: {
          title:['主页','后台首页']

        }
      },
      {
        path: '/home/shops/shoplist',
        name: '商品列表',
        component: () => import('../views/Shops/Shoplist.vue'),
        meta: {
          title:['主页','商品管理','商品列表']

        }
      },
      {
        path: '/home/shops/shopadd',
        name: '商品添加',
        component: () => import('../views/Shops/Shopadd.vue'),
        meta: {
          title:['主页','商品管理','商品添加']

        }
      },
      {
        path: '/home/shops/shoptype',
        name: '商品类型',
        component: () => import('../views/Shops/Shoptype.vue'),
        meta: {
          title:['主页','商品管理','商品类型']

        }
      },
      {
        path: '/home/shopmanage',
        name: '店铺管理', //店铺管理
        component: () => import('../views/Shopmanage.vue'),
        meta: {
          title:['主页','店铺管理']

        }
      },
      {
        path: '/home/account/accountlist',
        name: '账号列表',
        component: () => import('../views/Account/Accountlist.vue'),
        meta: {
          title:['主页','账号管理','账号列表']

        }
      },
      {
        path: '/home/account/accountadd',
        name: '添加账号',
        component: () => import('../views/Account/Accountadd.vue'),
        meta: {
          title:['主页','账号管理','添加账号']

        }
      },
      {
        path: '/home/account/passwordmodify',
        name: '修改密码',
        component: () => import('../views/Account/Passwordmodify.vue'),
        meta: {
          title:['主页','账号管理','修改密码']

        }
      },
      {
        path: '/home/total/shoptotal',
        name: '商品统计',
        component: () => import('../views/Total/Shoptotal.vue'),
        meta: {
          title:['主页','销售统计','商品统计']

        }
      },
      {
        path: '/home/total/ordertotal',
        name: '订单统计',
        component: () => import('../views/Total/Ordertotal.vue'),
        meta: {
          title:['主页','销售统计','订单统计']

        }
      },
      {
        path: '/home/usercenter',
        name: '用户中心',
        component: () => import('../views/Usercenter.vue'),
        meta: {
          title:['主页','用户中心']

        }
      },
    ]
  },

  // {
  //   path:'/shopsmanage',
  //   name:'Shopsmanage',
  //   component:null,
  //   children:[
  //     {
  //       path:'/shopsmanage/shoplist',
  //       component:()=>import('../views/Shoplist.vue')
  //     },
  //     {
  //       path:'/shopsmanage/shopadd',
  //       component:()=>import('../views/Shopadd.vue')
  //     },
  //     {
  //       path:'/shopsmanage/shoptype',
  //       component:()=>import('../views/Shoptype.vue')
  //     }
  //   ]
  // },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //to: 要跳转到的路由
  //from: 我来自于哪里
  let token = localStorage.getItem('token')
  // 只要不是默认登录,都开启路由验证
  if (!token && to.path != '/') {
      //需要加一个判定!token   是否存在   才能判定完成可以登录并且进入页面
            next({
              name:'后台首页'
            })
      // 验证用户是否登录
    checktoken(token).then(res => {
        console.log(token);     //等同于token

      //在登录状态
      if (res.data.code == 0)
        next(); //让它正常跳转
      else //不在登录状态
        next('/');
    })
  } else
    next()
  //让路由继续跳转
  // next()
})



export default router;