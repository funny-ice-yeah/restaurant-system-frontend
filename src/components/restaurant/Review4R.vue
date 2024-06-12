<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="restaurantReview" @select="handleSelect">
                    <el-menu-item index="restaurantReview">店家评论</el-menu-item>
                    <el-menu-item index="dishReview">菜品评论</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div v-if="isRestaurantReview">
                    <el-table :data="restaurantReviews" style="width: 100%">
                        <!-- <el-table-column fixed="left" prop="reviewId" label="Id" width="180" /> -->
                        <el-table-column fixed='left' prop="userId" label="用户Id" width="180" />
                        <el-table-column prop="rating" label="评分" width="180" />
                        <el-table-column prop="content" label="内容" width="180" />
                    </el-table>
                </div>
                <div v-if="!isRestaurantReview">
                    <el-table :data="dishReviews" style="width: 100%">
                        <!-- <el-table-column fixed="left" prop="reviewId" label="Id" width="180" /> -->
                        <el-table-column fixed='left' prop="userId" label="用户Id" width="180" />
                        <el-table-column prop="rating" label="评分" width="180" />
                        <el-table-column prop="content" label="内容" width="180" />
                    </el-table>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ref, inject, provide } from 'vue'
import axios from 'axios'

const restaurantReviews = ref([])
const dishReviews = ref([])
const isRestaurantReview = ref(true)
const restaurantId = inject("userId")
const handleSelect = (index) => {
    if (index === "restaurantReview") {
        isRestaurantReview.value = true
    } else {
        isRestaurantReview.value = false
    }
}

const getRestauarantReview = () => {
    axios.get("http://localhost:8080/restaurantReview/selectByRestaurantId", {
        params: {
            restaurantId: restaurantId.value
        },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        if (response.data !== null) {
            restaurantReviews.value = response.data
        }
    })
}

const getDishReview = () => {
    axios.get("http://localhost:8080/dishReview/selectByRestaurantId", {
        params: {
            restaurantId: restaurantId.value
        },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        if (response.data !== null) {
            dishReviews.value = response.data
        }
    })
}
getDishReview()
getRestauarantReview()
</script>