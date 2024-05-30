<template>
    <div>
        <el-table :data="restaurantReviews" style="width: 100%">
            <el-table-column fixed="left" prop="reviewId" label="Id" width="180" />
            <el-table-column prop="restaurantId" label="商户Id" width="180" />
            <el-table-column prop="rating" label="评分" width="180" />
            <el-table-column prop="content" label="评价" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
            </el-table-column>
        </el-table>
    </div>
    <div>
        <el-button type="primary" @click="handleClick">
            返回
        </el-button>
    </div>
</template>

<script setup>
import {ref, inject, provide} from 'vue'
import axios from 'axios'
import {useRoute, useRouter} from 'vue-router'

const restaurantReviews = ref([])
const restaurantId4U = inject("restaurantId4U")
const router = useRouter()

const getRestaurantReviews = () =>{
    axios.get("http://localhost:8080/restaurantReview/selectByRestaurantId", {
        params: {
            restaurantId: restaurantId4U.value
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
const handleClick = () => {
    router.push("/user/restaurant")
}
getRestaurantReviews()
</script>