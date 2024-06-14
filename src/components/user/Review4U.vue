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
                        <el-table-column fixed="left" prop="reviewId" label="Id" width="180" />
                        <el-table-column prop="restaurantId" label="商户Id" width="180" />
                        <el-table-column prop="rating" label="评分" width="180" />
                        <el-table-column prop="content" label="评价" width="180" />
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click="deleteRestaurantReviewByReviewId(scope.row)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="!isRestaurantReview">
                    <el-table :data="dishReviews" style="width: 100%">
                        <el-table-column fixed="left" prop="reviewId" label="Id" width="180" />
                        <el-table-column prop="rating" label="评分" width="180" />
                        <el-table-column prop="content" label="评价" width="180" />
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click="deleteDishReviewByReviewId(scope.row)">
                                    删除
                                </el-button>
                            </template>
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

const restaurantReviews = ref([])
const dishReviews = ref([])
const isRestaurantReview = ref(true)
const userId = inject("userId")
const handleSelect = (index) => {
    if (index === "restaurantReview") {
        isRestaurantReview.value = true
    } else {
        isRestaurantReview.value = false
    }
}


const getRestaurantReviews = () => {
    axios.get("http://localhost:8080/restaurantReview/selectByUserId", {
        params: {
            userId: userId.value
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

const getDishReviews = () => {
    axios.get("http://localhost:8080/dishReview/selectByUserId", {
        params: {
            userId: userId.value
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

const deleteRestaurantReviewByReviewId = (row) => {
    axios.delete("http://localhost:8080/restaurantReview/deleteByReviewId", {
        params: {
            reviewId: row.reviewId
        },
        withCredentials: true
    }).then((response) => {
        getRestaurantReviews()
    })
}

const deleteDishReviewByReviewId = (row) => {
    axios.delete("http://localhost:8080/dishReview/deleteByReviewId", {
        params:{
            reviewId: row.reviewId
        },
        withCredentials: true
    }).then((response) => {
        getDishReviews()
    })
}
getRestaurantReviews()
getDishReviews()
</script>