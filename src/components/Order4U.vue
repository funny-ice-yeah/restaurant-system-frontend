<template>
    <div>
        <el-table :data="orders" style="width: 100%">
            <el-table-column fixed="left" prop="order_id" label="Id" width="180" />
            <el-table-column prop="order_status" label="状态" width="180" />
            <el-table-column prop="order_time" label="预订时间" width="180" />
            <el-table-column prop="order_method" label="点单方式" width="180" />
            <el-table-column prop="total_price" label="总价" width="180" />
            <el-table-column prop="create_at" label="下单时间" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small">
                        详情
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
const total = ref(100)
const page_size = ref(10)
const userId = inject("userId")

axios.get("http://localhost:8080/order/selectByUserId", {
    params: {
        userId: userId.value
    },
    withCredentials: true
}).then((response) => {
    orders.value = response.data
})
</script>