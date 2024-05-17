<template>
    <div>
        <el-button type="primary" round @click="confirmOder">确定下单</el-button>
        <el-table :data="dishes" style="width: 100%">
            <el-table-column fixed="left" prop="dishId" label="Id" width="180" />
            <el-table-column prop="dishName" label="菜名" width="180" />
            <el-table-column prop="category" label="种类" width="180" />
            <el-table-column prop="currentPrice" label="价格" width="180" />
            <el-table-column prop="description" label="描述" width="180" />
            <el-table-column prop="isMainDish" label="是否为主打菜品" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="addDish(scope.row)">
                        加入订单
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, inject, provide, initCustomFormatter } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()
const dishes = ref([])
const order = ref([])
const total = ref(80)
const page_size = ref(10)
const restaurantId4U = inject("restaurantId4U")
const userId = inject("userId")

const addDish = (row) => {
    ElMessageBox.prompt('请输入菜品数量', 'Order', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/, // 输入必须为正整数
        inputErrorMessage: '无效输入',
    }).then(({ value }) => {
        ElMessage({
            type: 'success',
            message: `加入${value}份${row.dishName}`,
        })
        order.value.push({ dishId: row.dishId, quantity: value })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消成功',
        })
    })
}

const confirmOder = () => {
    axios.post("http://localhost:8080/order", {
        userId: userId.value,
        restaurantId: restaurantId4U.value,
        dishes: order.value
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response)=>{

    })
}

axios.get("http://localhost:8080/dish/selectByRestaurantId", {
    params: {
        restaurantId: restaurantId4U.value
    },
    withCredentials: true
}).then((response) => {
    dishes.value = response.data
})
</script>
