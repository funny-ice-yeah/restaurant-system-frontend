<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="dishAnalyze" @select="handleSelect">
                    <el-menu-item index="dishAnalyze">菜品数据分析</el-menu-item>
                    <el-menu-item index="userAnalyze">用户数据分析</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div v-if="isDishAnalyze">
                    <el-table :data="dishAnalyzes" style="width: 100%">
                        <!-- <el-table-column fixed="left" prop="reviewId" label="Id" width="180" /> -->
                        <el-table-column fixed='left' prop="dish.dishId" label="菜品Id" width="180" />
                        <el-table-column prop="dish.dishName" label="菜品名称" width="180" />
                        <el-table-column prop="averageRating" label="评分" width="180">
                            <template v-slot="scope">{{ scope.row.averageRating ? scope.row.averageRating :
                                "暂无评分" }}</template>
                        </el-table-column>
                        <el-table-column prop="totalSales" label="总销量" width="180">
                            <template v-slot="scope">{{ scope.row.totalSales ? scope.row.totalSales : "暂无售出"
                                }}</template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click="topCustomersClick(scope.row)">
                                    购买最多用户
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="!isDishAnalyze">
                    <div style="display: flex; align-items: center;">
                        <el-select v-model="period" placeholder="请选择时间限制" style="margin-right: 10px; width:20%;" >
                            <el-option label="一周内" value="周" />
                            <el-option label="一月内" value="月" />
                            <el-option label="一年内" value="年" />
                        </el-select>
                        <el-input v-model="threshold" style="width: 240px" placeholder="请输入阈值" />
                        <el-button type="primary" size="small" @click="getLayCustomerDistributions()">
                            查询
                        </el-button>
                    </div>
                    <el-table :data="loyalCustomerDistributions" style="width: 100%">
                        <el-table-column fixed="left" prop="userId" label="用户Id" width="180" />
                        <el-table-column prop="userName" label="用户名" width="180" />
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click="dishDetailClick(scope.row)">
                                    菜品购买详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

            </el-main>
        </el-container>
    </div>
    <el-dialog v-model="topCustomersVisible" style="width: 60%">
        <el-table :data="topCustomers" style="width: 100%">
            <el-table-column fixed='left' prop="userId" label="用户Id" width="180" />
            <el-table-column prop="userName" label="用户姓名" width="180" />
            <el-table-column prop="gender" label="性别" width="180" />
            <el-table-column prop="age" label="年龄" width="180" />
            <el-table-column prop="role" label="角色" width="180" />
        </el-table>
    </el-dialog>
    <el-dialog v-model="dishDetailVisible" style="width: 60%">
        <el-table :data="dishDetail" style="width: 100%">
            <el-table-column fixed='left' prop="dishId" label="菜品Id" width="180" />
            <el-table-column prop="dishName" label="菜品名" width="180" />
            <el-table-column prop="totalPurchase" label="总购买量" width="180" />
        </el-table>
    </el-dialog>
</template>



<script setup>
import { ref, inject, provide } from 'vue'
import axios from 'axios'

const isDishAnalyze = ref(true)
const restaurantId = inject("userId")
const dishAnalyzes = ref([])
const topCustomersVisible = ref(false)
const topCustomers = ref([])
const period = ref("周")
const threshold = ref(null)
const loyalCustomerDistributions = ref([])
const dishDetail = ref([])
const dishDetailVisible = ref(false)
const handleSelect = (index) => {
    if (index === "dishAnalyze") {
        isDishAnalyze.value = true
    } else {
        isDishAnalyze.value = false
    }
}
const getDishAnalyzes = () => {
    axios.get("http://localhost:8080/restaurant/analyzeDishes", {
        params: { restaurantId: restaurantId.value },
        withCredentials: true
    }).then((response) => {
        dishAnalyzes.value = response.data

    })
}

const topCustomersClick = (row) => {
    topCustomers.value = row.topCustomers
    topCustomersVisible.value = true
}

const getLayCustomerDistributions = () => {
    axios.get("http://localhost:8080/restaurant/loyalCustomerDistribution", {
        params: { restaurantId: restaurantId.value, period: period.value, threshold: threshold.value },
        withCredentials: true
    }).then((response) => {
        loyalCustomerDistributions.value = response.data
    })
}
const dishDetailClick = (row) => {
    console.log(row.customerOrderDistributions)
    dishDetail.value = row.customerOrderDistributions
    dishDetailVisible.value = true
}
// getLayCustomerDistributions()
getDishAnalyzes()
</script>