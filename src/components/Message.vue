<template>
    <div>
        <el-table :data="messages" style="width: 100%">
            <el-table-column fixed="left" prop="message_id" label="Id" width="180" />
            <el-table-column prop="subject" label="主题" width="180" />
            <el-table-column prop="content" label="内容" width="180" />
            <el-table-column prop="order_id" label="订单Id" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = []
const total = ref(80)
const page_size = ref(10)

</script>