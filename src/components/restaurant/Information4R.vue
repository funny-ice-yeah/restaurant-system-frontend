<template>
    <el-descriptions title="商户信息">
        <el-descriptions-item label="商户Id:">{{ restaurant.restaurantId }}</el-descriptions-item>
        <el-descriptions-item label="名称:">{{ restaurant.restaurantName }}</el-descriptions-item>
        <el-descriptions-item label="账户:">{{ restaurant.account }}</el-descriptions-item>
        <el-descriptions-item label="密码:">{{ restaurant.password }}</el-descriptions-item>
        <el-descriptions-item label="地址:">{{ restaurant.location }}</el-descriptions-item>
        <el-descriptions-item label="简介:">{{ restaurant.briefIntro }}</el-descriptions-item>
        <el-descriptions-item label="餐厅Id:">{{ restaurant.canteenId }}</el-descriptions-item>
    </el-descriptions>
    <div>
        <el-button type="primary" @click="updateClick">更新信息</el-button>
        <el-button type="primary" @click="logout">退出登录</el-button>
    </div>
    <el-dialog v-model="updateVisible">
        <el-form :model="updateRestaurant" label-width="auto" style="max-width: 600px">
            <el-form-item label="名称" placeholder="">
                <el-input v-model="updateRestaurant.restaurantName" />
            </el-form-item>
            <el-form-item label="密码" placeholder="">
                <el-input v-model="updateRestaurant.password" />
            </el-form-item>
            <el-form-item label="地址" placeholder="">
                <el-input v-model="updateRestaurant.location" />
            </el-form-item>
            <el-form-item label="简介" placeholder="">
                <el-input v-model="updateRestaurant.briefIntro" />
            </el-form-item>
            <el-form-item label="餐厅Id" placeholder="">
                <el-input v-model="updateRestaurant.canteenId" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="updateVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="updateRestaurantConfirm">
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
const restaurant = ref({ restuarantId: null, restaurantName: null, lcation: null, account: null, password: null, canteenId: null, briefIntro: null })
const updateVisible = ref(false)
const updateRestaurant = ref({ ...restaurant.value })
const router = useRouter()

const getRestaurant = () => {
    axios.get("http://localhost:8080/restaurant/selectById", {
        params: { "restaurantId": userId.value },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        restaurant.value = response.data
    })
}
const logout = () => {
    router.push("/")
    userId.value = null
    isLogin.value = false
    role.value = null
}
const updateRestaurantConfirm = () => {
    axios.put("http://localhost:8080/restaurant", updateRestaurant.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        updateVisible.value = false
        getRestaurant()
        updateRestaurant.value = { ...restaurant.value }
    })
}
const updateClick = () => {
    updateRestaurant.value = { ...restaurant.value }
    updateVisible.value = true
}
getRestaurant()
</script>