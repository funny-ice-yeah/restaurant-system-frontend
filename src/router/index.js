import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import User4M from '@/components/manager/User4M.vue'
import Restaurant4M from '@/components/manager/Restaurant4M.vue'
import Restaurant4U from '@/components/user/Restaurant4U.vue'
import Message from '@/components/user/Message.vue'
import Order4U from '@/components/user/Order4U.vue'
import Favorite4U from '@/components/user/Favorite4U.vue'
import Favorite4R from '@/components/restaurant/Favorite4R.vue'
import Dish4R from '@/components/restaurant/Dish4R.vue'
import Order4R from '@/components/restaurant/Order4R.vue'
import Review4R from '@/components/restaurant/Review4R.vue'
import Review4U from '@/components/user/Review4U.vue'
import Dish4U from '@/components/user/Dish4U.vue'
import Information4M from '@/components/manager/Information4M.vue'
import Information4U from '@/components/user/Information4U.vue'
import Information4R from '@/components/restaurant/Information4R.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {menu: '/'},
      component: Login
    },
    {
      path: '/manager/information',
      name: 'manager/information',
      meta: {menu: '/manager/information'},
      component: Information4M
    },
    {
      path: '/manager/user',
      name: '/manager/user',
      meta: {menu: '/manager/user'},
      component: User4M
    },
    {
      path: '/manager/restaurant',
      name: '/manager/restaurant',
      meta: {menu: 'manager/restaurant'},
      component: Restaurant4M
    },
    {
      path: '/user/restaurant',
      name: '/user/restaurant',
      meta: {menu: '/user/restaurant'},
      component: Restaurant4U
    },
    {
      path: '/user/message',
      name: '/user/message',
      meta: {menu: '/user/message'},
      component: Message
    },
    {
      path: '/user/order',
      name: '/user/order',
      meta: {menu: '/user/order'},
      component: Order4U
    },
    {
      path: '/user/favorite',
      name: '/user/favorite',
      meta: {menu: '/user/favorite'},
      component: Favorite4U,
    },
    {
      path: '/user/review',
      name: '/user/review',
      meta: {menu: '/user/review'},
      component: Review4U
    },
    {
      path: '/user/dish',
      name: '/user/dish',
      meta: {menu: '/user/dish'},
      component: Dish4U
    },
    {
      path: '/user/information',
      name: '/user/information',
      meta: {menu: '/user/information'},
      component: Information4U
    },
    {
      path: '/restaurant/dish',
      name: '/restaurant/dish',
      meta: {menu: '/restaurant/dish'},
      component: Dish4R
    },
    {
      path: '/restaurant/order',
      name: '/restaurant/order',
      meta: {menu: '/restaurant/order'},
      component: Order4R
    },
    {
      path: '/restaurant/review',
      name: '/restaurant/review',
      meta: {menu: '/restaurant/review'},
      component: Review4R
    },
    {
      path: '/restaurant/information',
      name: '/restaurant/information',
      meta: {menu: '/restaurant/information'},
      component: Information4R
    }
  ]
})

export default router
