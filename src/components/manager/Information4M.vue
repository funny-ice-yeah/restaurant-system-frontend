<template>
  <el-descriptions title="管理员信息">
    <el-descriptions-item label="管理员Id:">{{ manager.managerId }}</el-descriptions-item>
    <el-descriptions-item label="姓名:">{{ manager.managerName }}</el-descriptions-item>
    <el-descriptions-item label="账户:">{{ manager.account }}</el-descriptions-item>
    <el-descriptions-item label="密码:">{{ manager.password }}</el-descriptions-item>
  </el-descriptions>
  <div>
    <el-button type="primary" @click="updateClick">更新信息</el-button>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
  <el-dialog v-model="updateVisible">
    <el-form :model="updateManager" label-width="auto" style="max-width: 600px">
      <el-form-item label="姓名" placeholder="">
        <el-input v-model="updateManager.managerName" />
      </el-form-item>
      <el-form-item label="密码" placeholder="">
        <el-input v-model="updateManager.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="updateVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateManagerConfirm">
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
const manager = ref({ managerId: null, managerName: null, account: null, password: null })
const updateVisible = ref(false)
const updateManager = ref({ ...manager.value })
const router = useRouter()

const getManager = () => {
  axios.get("http://localhost:8080/manager/selectById", {
    params: { "managerId": userId.value },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then((response) => {
    manager.value = response.data
  })
}
const logout = () => {
  router.push("/")
  userId.value = null
  isLogin.value = false
  role.value = null
}
const updateManagerConfirm = () => {
  axios.put("http://localhost:8080/manager", updateManager.value, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then((response) => {
    updateVisible.value = false
    getManager()
    updateManager.value = { ...manager.value }
  })
}
const updateClick = () => {
  updateManager.value = { ...manager.value }
  updateVisible.value = true
}
getManager()
</script>