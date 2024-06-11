<template>
  <el-descriptions title="用户信息">
    <el-descriptions-item label="用户Id:">{{ user.userId }}</el-descriptions-item>
    <el-descriptions-item label="姓名:">{{ user.userName }}</el-descriptions-item>
    <el-descriptions-item label="身份:">{{ user.role }}</el-descriptions-item>
    <el-descriptions-item label="学号/工号:">{{ user.roleId }}</el-descriptions-item>
    <el-descriptions-item label="密码:">{{ user.password }}</el-descriptions-item>
    <el-descriptions-item label="性别:">{{ user.gender }}</el-descriptions-item>
    <el-descriptions-item label="年龄:">{{ user.age }}</el-descriptions-item>
  </el-descriptions>
  <div>
    <el-button type="primary" @click="updateClick">更新信息</el-button>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
  <el-dialog v-model="updateVisible">
    <el-form :model="updateUser" label-width="auto" style="max-width: 600px">
      <el-form-item label="姓名" placeholder="">
        <el-input v-model="updateUser.userName" />
      </el-form-item>
      <el-form-item label="密码" placeholder="">
        <el-input v-model="updateUser.password" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="updateUser.gender" placeholder="请选择性别">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" placeholder="">
        <el-input v-model="updateUser.age" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="updateVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateUserConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, inject, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const userId = inject("userId")
const isLogin = inject("isLogin")
const role = inject("role")
const user = ref({ userId: userId.value, userName: null, age: null, roleId: null, role: null, password: null, age: null, roleId: null, role: null })
const updateVisible = ref(false)
const updateUser = ref({ ...user.value })
const router = useRouter()

const getUser = () => {
  axios.get("http://localhost:8080/user/selectById", {
    params: { "userId": userId.value },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then((response) => {
    user.value = response.data
  })
}
const logout = () => {
  router.push("/")
  userId.value = null
  isLogin.value = false
  role.value = null
}
const updateUserConfirm = () => {
  axios.put("http://localhost:8080/user", updateUser.value, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then((response) => {
    updateVisible.value = false
    getUser()
    updateUser.value = { ...user.value }
  })
}
const updateClick = () => {
  updateUser.value = { ...user.value }
  updateVisible.value = true
}
getUser()
</script>