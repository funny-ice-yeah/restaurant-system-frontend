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
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="detailClick(scope.row)">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="updateClick(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="detailVisible">
        <el-table :data="orderDetails" style="width: 100%">
            <el-table-column fixed="left" prop="dishId" label="菜品Id" width="180" />
            <el-table-column prop="quantity" label="数量" width="180" />
        </el-table>
    </el-dialog>
    <el-dialog v-model="updateVisible">
        <el-form :model="updateOrder" label-width="auto" style="max-width: 600px">
            <el-form-item label="状态" placeholder="">
                <el-input v-model="updateOrder.orderStatus" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="updateVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="updateConfirm">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'

const orders = ref([])
const total = ref(80)
const page_size = ref(10)
const restaurantId = inject("userId")
const detailVisible = ref(false)
const orderDetails = ref([])
const updateOrder = ref({})
const updateVisible = ref(false)


const getOrder = () => {
    axios.get("http://localhost:8080/order/selectByRestaurantId", {
        params: { restaurantId: restaurantId.value },
        withCredentials: true
    }).then((response) => {
        orders.value = response.data
    })
}
const updateClick = (row) => {
    updateOrder.value = {...row}
    updateVisible.value = true
}

const updateConfirm = () => {
    axios.put("http://localhost:8080/order", updateOrder.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        updateVisible.value = false
        updateOrder.value = {}
        getOrder()
    })
}
const detailClick = (row) => {
    axios.get("http://localhost:8080/order/selectOrderDetailByOrderId", {
        params: {orderId: row.orderId},
        withCredentials: true
    }).then((response) => {
        orderDetails.value = response.data
        detailVisible.value = true
    })
}
getOrder()
</script>