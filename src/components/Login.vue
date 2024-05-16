<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <el-form>
      <el-form-item label="账号:">
        <el-input v-model="account" placeholder="请输入账号、学号或工号" />
      </el-form-item>

      <el-form-item label="密码:">
        <el-input v-model="password" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item label="身份">
        <el-select v-model="identity" placeholder="请选择登录身份">
          <el-option label="学生" value="0" />
          <el-option label="商家" value="1" />
          <el-option label="管理员" value="2" />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, provide, computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const account = ref("")
const password = ref("")
const identity = ref(null)
const role = inject("role")
const isLogin = inject("isLogin")
const router = useRouter()
const route = useRoute()


const login = () => {

  if(identity.value == 0){
    axios.post("http://localhost:8080/login/user", {"roleId": account.value, "password": password.value}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then((response) => {
      if(response.data !== null){
        role.value = 0
        isLogin.value = true
        router.push('/user/restaurant')
      }
    })
  }else if(identity.value == 1){
    axios.post("http://localhost:8080/login/restaurant", {"account": account.value, "password": password.value}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    }).then((response) => {
      if(response.data != null){
        role.value = 1
        isLogin.value = true
        router.push('restaurant/dish')
      }
    })
  }else if(identity.value == 2){
    axios.post("http://localhost:8080/login/manager", {"account": account.value, "password": password.value}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    }).then((response) => {
      if(response.data != null){
        role.value = 2
        isLogin.value = true
        router.push("/manager/user")
      }
    })
  }
}

</script>
