<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="dishAnalyze" @select="handleSelect">
                    <el-menu-item index="dishAnalyze">菜品数据</el-menu-item>
                    <el-menu-item index="loyalUserAnalyze">忠实用户</el-menu-item>
                    <el-menu-item index="activityAnalyze">用户活跃度</el-menu-item>
                    <el-menu-item index="userGroupAnalyze">用户群体分析</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div v-if="menu == 'dishAnalyze'">
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
                <div v-if="menu == 'loyalUserAnalyze'">
                    <div style="display: flex; align-items: center;">
                        <el-select v-model="period0" placeholder="请选择时间限制" style="margin-right: 10px; width:20%;">
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
                <div v-if="menu == 'activityAnalyze'">
                    <div>
                        <el-text class="mx-1">不同时间段订餐数</el-text>
                        <div style="display: flex; align-items: center;">
                            <el-select v-model="period1" placeholder="请选择时间限制" style="margin-right: 10px; width:20%;">
                                <el-option label="一周内" value="周" />
                                <el-option label="一月内" value="月" />
                                <el-option label="一年内" value="年" />
                            </el-select>
                            <el-button type="primary" size="small" @click="getActivities()">
                                查询
                            </el-button>
                        </div>
                        <el-table :data="activities" style="width: 100%">
                            <el-table-column fixed="left" prop="period" label="时间段" width="180" />
                            <el-table-column prop="orderNum" label="订餐数" width="180" />
                        </el-table>
                    </div>
                    <div style="height: 50px;"></div>
                    <div>
                        <el-text class="mx-1">不同时期订餐数</el-text>
                        <div style="display: flex; align-items: center;">
                            <el-select v-model="period2" placeholder="请选择时间限制" style="margin-right: 10px; width:20%;">
                                <el-option label="一周内" value="周" />
                                <el-option label="一月内" value="月" />
                            </el-select>
                            <el-button type="primary" size="small" @click="getOrderFrequency()">
                                查询
                            </el-button>
                        </div>
                        <el-table :data="orderFrequency" style="width: 100%">
                            <el-table-column fixed="left" prop="period" label="时间段" width="180" />
                            <el-table-column prop="orderNum" label="订餐数" width="180" />
                        </el-table>
                    </div>
                </div>
                <div v-if="menu == 'userGroupAnalyze'">
                    <el-table :data="userGroupAnalyzes" style="width: 100%">
                        <el-table-column fixed="left" prop="group" label="群体" width="240" />
                        <el-table-column prop="userHabit.totalOrderNum" label="总订餐数" width="180" />
                        <el-table-column prop="userReviewHabit.reviewNum" label="总评价数" width="180" />
                        <el-table-column prop="userReviewHabit.averageRating" label="平均评分" width="180">
                            <template v-slot="scope">{{ scope.row.userReviewHabit.averageRating ? scope.row.userReviewHabit.averageRating :
                            "暂无评分" }}</template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click="dishSalesSummariesClick(scope.row)">
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
            <el-table-column prop="gender" label="性别" width="180">
            <template v-slot="scope">{{ scope.row.gender ? "女" : "男"
                                }}</template>    
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="180" />
            <el-table-column prop="role" label="角色" width="180" >
            <template v-slot="scope">{{ scope.row.role ? "职工" : "学生"
                                }}</template>                    
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog v-model="dishDetailVisible" style="width: 60%">
        <el-table :data="dishDetail" style="width: 100%">
            <el-table-column fixed='left' prop="dishId" label="菜品Id" width="180" />
            <el-table-column prop="dishName" label="菜品名" width="180" />
            <el-table-column prop="totalPurchase" label="总购买量" width="180" />
        </el-table>
    </el-dialog>
    <el-dialog v-model="dishSalesSummnariesVisible" style="width: 60%">
        <el-table :data="dishSalesSummaries" style="width: 100%">
            <el-table-column fixed='left' prop="dishId" label="菜品Id" width="180" />
            <el-table-column prop="dishName" label="菜品名" width="180" />
            <el-table-column prop="totalSales" label="总购买量" width="180" />
        </el-table>
    </el-dialog>
</template>



<script setup>
import { ref, inject, provide } from 'vue'
import axios from 'axios'

const menu = ref("dishAnalyze")
const restaurantId = inject("userId")
const dishAnalyzes = ref([])
const topCustomersVisible = ref(false)
const topCustomers = ref([])
const period0 = ref("周")
const period1 = ref("周")
const period2 = ref("周")
const period3 = ref("周")
const threshold = ref(null)
const loyalCustomerDistributions = ref([])
const dishDetail = ref([])
const dishDetailVisible = ref(false)
const activities = ref([])
const orderFrequency = ref([])
const dishSalesSummnariesVisible = ref(false)
const dishSalesSummaries = ref([])
const userGroupAnalyzes = ref([])

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
        params: { restaurantId: restaurantId.value, period: period0.value, threshold: threshold.value },
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
const getActivities = () => {
    axios.get("http://localhost:8080/restaurant/activity", {
        params: { restaurantId: restaurantId.value, period: period1.value },
        withCredentials: true
    }).then((response) => {
        activities.value = response.data
    })
}
const getOrderFrequency = () => {
    axios.get("http://localhost:8080/restaurant/orderFrequency", {
        params: { restaurantId: restaurantId.value, period: period2.value },
        withCredentials: true
    }).then((response) => {
        orderFrequency.value = response.data
    })
}
const getUserGroupAnalyzes = () => {
    axios.get("http://localhost:8080/restaurant/userGroupAnalysis", {
        params: { restaurantId: restaurantId.value },
        withCredentials: true
    }).then((response) => {
        userGroupAnalyzes.value = response.data
    })
}
const dishSalesSummariesClick = (row) => {
    console.log(row.userHabit.dishSalesSummaries)
    dishSalesSummaries.value = row.userHabit.dishSalesSummaries
    dishSalesSummnariesVisible.value = true
}
const handleSelect = (index) => {
    menu.value = index
    if (index === "dishAnalyze") {
        period0.value = "周"
        getDishAnalyzes()
    } else if (index == 'loyalUserAnalyze') {
        period1.value = "周"
        // getLayCustomerDistributions()
    } else if (index == 'activityAnalyze') {
        period2.value = "周"
        period3.value = "周"
        getActivities()
        getOrderFrequency()
    } else if (index == 'userGroupAnalyze') {
        getUserGroupAnalyzes()
    }
}

getDishAnalyzes()
</script>