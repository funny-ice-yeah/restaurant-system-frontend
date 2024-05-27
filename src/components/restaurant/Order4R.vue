<template>
    <div>
        <el-table :data="orders" style="width: 100%">
            <el-table-column fixed="left" prop="orderId" label="Id" width="180" />
            <el-table-column prop="orderStatus" label="状态" width="180" />
            <el-table-column prop="orderTime" label="预订时间" width="180" />
            <el-table-column prop="orderMethod" label="点单方式" width="180" />
            <el-table-column prop="totalPrice" label="总价" width="180" />
            <el-table-column prop="createAt" label="下单时间" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'

const orders = ref([])
const total = ref(80)
const page_size = ref(10)
const restaurantId = inject("userId")

const getOrder = () => {
    axios.get("http://localhost:8080/order/selectByRestaurantId", {
        params: {restaurantId: restaurantId.value},
        withCredentials: true
    }).then((response) => {
        orders.value = response.data
    })
}

getOrder()
</script>