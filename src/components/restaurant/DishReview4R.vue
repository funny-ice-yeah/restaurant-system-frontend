<template>
    <div>
        <el-table :data="reviews" style="width: 100%">
            <el-table-column fixed="left" prop="review_id" label="Id" width="180" />
            <el-table-column prop="rating" label="评分" width="180" />
            <el-table-column prop="user_Id" label="用户Id" width="180" /> 
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
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size"/>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const reviews = []
const total = ref(80)
const page_size = ref(10)
</script>