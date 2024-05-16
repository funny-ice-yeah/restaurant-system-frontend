<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" @select="handleSelect" :default-active="activeIndex">
        <div class="menu-logo">
          <img src="/public/logo.jpeg" alt="Logo">
          <span class="logo-text">食堂管理系统</span>
        </div>
        <el-menu-item index="/" v-if="!isLogin">登录</el-menu-item>
        <el-menu-item index="/browse" v-if="role === 0">点餐</el-menu-item>
        <el-menu-item index="/message" v-if="role === 0">消息</el-menu-item>
        <el-menu-item index="/user_order" v-if="role === 0">订单</el-menu-item>
        <el-menu-item index="/favorite" v-if="role === 0">收藏</el-menu-item>
        <el-menu-item index="/user_review" v-if="role === 0">评价</el-menu-item>
        <el-menu-item index="/dish" v-if="role === 1">菜品</el-menu-item>
        <el-menu-item index="/restaurant_order" v-if="role === 1">订单</el-menu-item>
        <el-menu-item index="/restaurant_review" v-if="role === 1">评价</el-menu-item>
        <el-menu-item index="/user" v-if="role === 2">用户</el-menu-item>
        <el-menu-item index="/restaurant" v-if="role === 2">商家</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
import { ref, provide, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isLogin = ref(false)
const role = ref(-1)
const activeIndex = computed(() => {
  return route.meta.menu
})

const handleSelect = (index) => {
  router.push(index)
}

provide("role", role)
provide("isLogin", isLogin)
</script>

<style>
.menu-logo {
  padding: 10px;
  display: flex;
  align-items: center;
}

.menu-logo img {
  height: 40px;
}

.logo-text {
  margin-left: 10px;
  font-weight: bold;
}
</style>