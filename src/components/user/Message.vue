<template>
    <div>
        <el-table :data="messages" style="width: 100%">
            <el-table-column fixed="left" prop="messageId" label="消息编号" width="180" />
            <el-table-column prop="subject" label="主题" width="180" />
            <el-table-column prop="content" label="内容" width="180" />
            <el-table-column prop="orderId" label="订单Id" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="confirmClick(scope.row)"
                        v-if="scope.row.subject == '订单确认通知'">
                        确认
                    </el-button>
                    <el-button link type="primary" size="small" @click="cancelClick(scope.row)"
                        v-if="scope.row.subject == '订单确认通知'">
                        取消
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus';
const messages = ref([])
const total = ref(100)
const page_size = ref(10)
const userId = inject("userId")
const order = ref({})
const getMessage = () => {
    axios.get("http://localhost:8080/message/selectByUserId", {
        params: {
            userId: userId.value
        },
        withCredentials: true
    }).then((response) => {
        messages.value = response.data
    })
}

const confirmClick = (row) => {
    order.value = {orderId: row.orderId, orderStatus: "准备中", userId: row.userId}
    axios.put("http://localhost:8080/order", order.value, {
        headers:{
            'Content-Type': 'application/json'
        },
        withCredentials:true
    }).then((response) => {
        if(response.data){
            ElMessage.success("确认成功")
            getMessage()
        }else{
            ElMessage.error("消息已过期")
        }
    })
}

const cancelClick = (row) => {
    order.value = {orderId: row.orderId, orderStatus: "已取消", userId: row.userId}
    axios.put("http://localhost:8080/order", order.value, {
        headers:{
            'Content-Type': 'application/json'
        },
        withCredentials:true
    }).then((response) => {
        if(response.data){
            ElMessage.success("取消成功")
            getMessage()
        }else{
            ElMessage.error("消息已过期")
        }
    })
}
getMessage()

</script>