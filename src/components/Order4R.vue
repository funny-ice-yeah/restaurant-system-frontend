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
                    <el-button link type="primary" size="small">
                        编辑
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

const orders = []
const total = ref(80)
const page_size = ref(10)

</script>