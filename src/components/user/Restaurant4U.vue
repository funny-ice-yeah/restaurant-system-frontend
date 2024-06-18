<template>
    <div>
        <el-input v-model="keyword" style="width: 240px; margin-right: 10px;" placeholder="使用关键字搜索" />
        <el-button type="primary" size="small" @click="searchByKeyword">
            搜索
        </el-button>
        <el-button type="primary" size="small" @click="getRestaurant">
            显示所有
        </el-button>
    </div>
    <div>
        <el-table :data="restaurants" style="width: 100%">
            <!-- <el-table-column fixed="left" prop="restaurantId" label="Id" width="180" /> -->
            <el-table-column fixed="left" prop="restaurantName" label="店名" width="180" />
            <el-table-column prop="location" label="地址" width="180" />
            <el-table-column prop="briefIntro" label="简介" width="180" />
            <el-table-column fixed="right" label="操作" width="300">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="goToRestaurant(scope.row)">
                        进店
                    </el-button>
                    <el-button link type="primary" size="small" @click="favoriteRestaurant(scope.row)">
                        收藏
                    </el-button>
                    <el-button link type="primary" size="small" @click="mainDishClick(scope.row)">
                        查看主菜
                    </el-button>
                    <el-button link type="primary" size="small" @click="reviewClick(scope.row)">
                        查看评价
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="mainDishVisible">
        <el-table :data="mainDishes" style="width: 100%">
            <!-- <el-table-column fixed="left" prop="dishId" label="Id" width="180" /> -->
            <el-table-column fixed="left" prop="dishName" label="菜名" width="180" />
            <el-table-column prop="category" label="种类" width="180" />
            <el-table-column prop="currentPrice" label="价格" width="180" />
            <el-table-column prop="description" label="描述" width="180" />
        </el-table>
        <div class="dialog-footer">
            <el-button type="primary" @click="mainDishVisible = false">
                关闭
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, provide, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const restaurants = ref([])
const total = ref(100)
const page_size = ref(10)
const restaurantId4U = inject("restaurantId4U")
const userId = inject("userId")
const router = useRouter()
const route = useRoute()
const keyword = ref("")
const mainDishVisible = ref(false)
const mainDishes = ref([])



const goToRestaurant = (row) => {
    restaurantId4U.value = row.restaurantId
    router.push('/user/dish')
}
const getRestaurant = () => {
    axios.get("http://localhost:8080/restaurant/selectAll4U", {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        restaurants.value = response.data
        total.value = response.data.length
    })
}
const favoriteRestaurant = (row) => {
    axios.post("http://localhost:8080/favoriteRestaurant", { userId: userId.value, restaurantId: row.restaurantId }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        if (response.data) {
            ElMessage({
                type: 'success',
                message: '收藏成功',
            })
        } else {
            ElMessage({
                type: 'info',
                message: '已收藏',
            })
        }
    })
}
const searchByKeyword = () => {
    axios.get("http://localhost:8080/restaurant/searchRestaurants", {
        params: { "keyword": keyword.value },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        keyword.value = ""
        restaurants.value = response.data
    })
}
const getMainDish = (row) => {
    axios.get("http://localhost:8080/dish/selectMainDishByRestaurantId", {
        params: {
            restaurantId: row.restaurantId
        },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        mainDishes.value = response.data
    })
}
const mainDishClick = (row) => {
    mainDishVisible.value = true
    getMainDish(row)
}
const reviewClick = (row) => {
    restaurantId4U.value = row.restaurantId
    router.push("/user/restaurantReview")
}
getRestaurant()
</script>
