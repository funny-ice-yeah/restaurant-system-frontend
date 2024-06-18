<template>
    <div>
        <el-table :data="dishReviews" style="width: 100%">
            <!-- 用户知道自己从哪里点进来，不展示店名 -->
            <el-table-column prop="rating" label="评分" width="180" />
            <el-table-column prop="content" label="评价" width="180" />
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

const dishReviews = ref([])
const dishId4U = inject("dishId4U")
const router = useRouter()

const getDishReviews = () => {
    axios.get("http://localhost:8080/dishReview/selectByDishId", {
        params: {
            dishId: dishId4U.value
        },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        if (response.data !== null) {
            console.log(response.data)
            dishReviews.value = response.data
        }
    })
}
const handleClick = () => {
    router.push("/user/dish")
}
getDishReviews()
</script>