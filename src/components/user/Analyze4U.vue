<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="dishAnalyze" @select="handleSelect">
                    <el-menu-item index="dishAnalyze">收藏菜品销量</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div v-if="index='dishAnalyze'">
                    <div style="display: flex; align-items: center;">
                        <el-select v-model="period" placeholder="请选择时间限制" style="margin-right: 10px; width:20%;" >
                            <el-option label="一周内" value="周" />
                            <el-option label="一月内" value="月" />
                            <el-option label="一年内" value="年" />
                        </el-select>
                        <el-select v-model="method" placeholder="请选择订餐方式" style="margin-right: 10px; width:20%;" >
                            <el-option label="线上" value="线上" />
                            <el-option label="排队" value="排队" />
                            <el-option label="所有" value="所有" />
                        </el-select>
                        <el-button type="primary" size="small" @click="getDishSales()">
                            筛选
                        </el-button>
                    </div>
                    <el-table :data="dishSales" style="width: 100%">
                        <el-table-column fixed='left' prop="dishName" label="菜品名称" width="180" />
                        <el-table-column prop="location" label="位置" width="180" />
                        <el-table-column prop="method" label="订餐方式" width="180"/>
                        <el-table-column prop="totalSales" label="总销量" width="180">
                            <template v-slot="scope">{{ scope.row.totalSales ? scope.row.totalSales : "暂无售出"
                                }}</template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ref, inject, provide } from 'vue'
import axios from 'axios'

const userId = inject("userId")
const index = ref("dishAnalyze")
const period = ref("周")
const method = ref("所有")
const dishSales = ref([])
const handleSelect = (index) => {
    index.value = index
}

const getDishSales = () => {
    axios.get("http://localhost:8080/user/favouriteDishSales", {
        params: {userId: userId.value, period: period.value, method: method.value},
        withCredentials: true
    }).then((response)=>{
        dishSales.value = response.data
    })
}
getDishSales()
</script>