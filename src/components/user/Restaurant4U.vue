<template>
    <div>
        <el-table :data="restaurants" style="width: 100%">
            <el-table-column fixed="left" prop="restaurantId" label="Id" width="180" />
            <el-table-column prop="restaurantName" label="店名" width="180" />
            <el-table-column prop="location" label="地址" width="180" />
            <el-table-column prop="canteenId" label="食堂Id" width="180" />
            <el-table-column prop="briefIntro" label="简介" width="180" /> 
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="goToRestaurant(scope.row)">
                        进店
                    </el-button>
                    <el-button link type="primary" size="small" @click="favoriteRestaurant(scope.row)">
                        收藏
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- <div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size"/>
    </div> -->
</template>

<script setup>
import {ref, provide, inject} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const restaurants = ref([])
const total = ref(100)
const page_size = ref(10)
const restaurantId4U = inject("restaurantId4U")
const userId = inject("userId")
const router = useRouter()
const route = useRoute()

const goToRestaurant = (row) => {
    restaurantId4U.value = row.restaurantId
    router.push('/user/dish')
}
const getRestaurant = () => {
    axios.get("http://localhost:8080/restaurant/selectAll", {
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
    axios.post("http://localhost:8080/favoriteRestaurant", {userId: userId.value, restaurantId: row.restaurantId},{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    })
}



getRestaurant()
provide("restaurantId4U", restaurantId4U)
</script>
