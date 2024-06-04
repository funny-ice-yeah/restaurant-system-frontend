<template>
    <div>
        <el-table :data="messages" style="width: 100%">
            <el-table-column fixed="left" prop="messageId" label="Id" width="180" />
            <el-table-column prop="subject" label="主题" width="180" />
            <el-table-column prop="content" label="内容" width="180" />
            <el-table-column prop="orderId" label="订单Id" width="180" />
        </el-table>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'
const messages = ref([])
const total = ref(100)
const page_size = ref(10)
const userId = inject("userId")

axios.get("http://localhost:8080/message/selectByUserId", {
    params: {
        userId: userId.value
    },
    withCredentials: true
}).then((response) => {
    messages.value = response.data
})
</script>