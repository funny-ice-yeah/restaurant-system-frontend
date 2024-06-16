<template>
    <div>
        <el-table :data="orders" style="width: 100%">
            <el-table-column fixed="left" prop="orderId" label="Id" width="180" />
            <el-table-column prop="orderStatus" label="状态" width="180" />
            <el-table-column prop="orderTime" label="预订时间" width="180" />
            <el-table-column prop="orderMethod" label="点单方式" width="180" />
            <el-table-column prop="totalPrice" label="总价(元)" width="180" />
            <el-table-column prop="createAt" label="下单时间" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="detailClick(scope.row)">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="updateClick(scope.row)"
                        :disabled="scope.row.orderStatus != '准备中'">
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
                <el-select v-model="updateOrder.orderStatus" placeholder="请选择订单状态">
                    <el-option label="已完成" value="已完成" />
                </el-select>
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
import { ElMessage } from 'element-plus';

const orders = ref([])
const total = ref(80)
const page_size = ref(10)
const restaurantId = inject("userId")
const detailVisible = ref(false)
const orderDetails = ref([])
const updateOrder = ref({})
const updateVisible = ref(false)

function formatDate(dateString) {
    // 创建 Date 对象
    const date = new Date(dateString);

    // 获取各部分日期和时间信息
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以需要 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 拼接成想要的格式
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const getOrder = () => {
    axios.get("http://localhost:8080/order/selectByRestaurantId", {
        params: { restaurantId: restaurantId.value },
        withCredentials: true
    }).then((response) => {
        orders.value = response.data
        for (let i = 0; i < orders.value.length; i++) {
            orders.value[i].orderTime = formatDate(orders.value[i].orderTime)
            orders.value[i].createAt = formatDate(orders.value[i].createAt)
        }
    })
}
const updateClick = (row) => {
    updateOrder.value = { ...row }
    updateVisible.value = true
}

const updateConfirm = () => {
    axios.put("http://localhost:8080/order", {"orderId": updateOrder.value.orderId, "orderStatus": updateOrder.value.orderStatus, "userId": updateOrder.value.userId}, {
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
        params: { orderId: row.orderId },
        withCredentials: true
    }).then((response) => {
        orderDetails.value = response.data
        detailVisible.value = true
    })
}
getOrder()
</script>