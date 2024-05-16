<template>
    <div>
        <el-table :data="restaurants" style="width: 100%">
            <el-table-column fixed="left" prop="restaurant_id" label="Id" width="180" />
            <el-table-column prop="restaurant_name" label="店名" width="180" />
            <el-table-column prop="location" label="地址" width="180" />
            <el-table-column prop="account" label="账号" width="180" /> 
            <el-table-column prop="password" label="密码" width="180" />
            <el-table-column prop="canteen" label="食堂" width="180" />
            <el-table-column prop="brief_intro" label="简介" width="180" /> 
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
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size"/>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const restaurants = []
const total = ref(80)
const page_size = ref(10)
</script>
