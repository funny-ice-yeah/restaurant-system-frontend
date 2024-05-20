<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="favoriteRestaurant" @select="handleSelect">
                    <el-menu-item index="favoriteRestaurant">收藏店家</el-menu-item>
                    <el-menu-item index="favoriteDish">收藏菜品</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div v-if="isFavoriteRestaurant">
                    <el-table :data="restaurants" style="width: 100%">
                        <el-table-column fixed="left" prop="restaurantId" label="Id" width="180" />
                        <el-table-column prop="restaurantName" label="店名" width="180" />
                        <el-table-column prop="location" label="地址" width="180" />
                        <el-table-column prop="canteenId" label="食堂Id" width="180" />
                        <el-table-column prop="briefIntro" label="简介" width="180" />
                    </el-table>
                </div>
                <div v-if="!isFavoriteRestaurant">
                    <el-table :data="dishes" style="width: 100%">
                        <el-table-column fixed="left" prop="dishId" label="Id" width="180" />
                        <el-table-column prop="dishName" label="菜名" width="180" />
                        <el-table-column prop="category" label="种类" width="180" />
                        <el-table-column prop="currentPrice" label="价格" width="180" />
                        <el-table-column prop="description" label="描述" width="180" />
                        <el-table-column prop="isMainDish" label="是否为主打菜品" width="180" />
                    </el-table>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ref, inject, provide } from 'vue'
import axios from 'axios'

const restaurants = ref([])
const dishes = ref([])
const isFavoriteRestaurant = ref(true)
const userId = inject("userId")
const handleSelect = (index) => {
    if (index === "favoriteRestaurant") {
        isFavoriteRestaurant.value = true
    } else {
        isFavoriteRestaurant.value = false
    }
}

const getFavoriteRestaurant = () => {
    axios.get("http://localhost:8080/favoriteRestaurant/selectByUserId", {
        params: { userId: userId.value },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        for(let i=0; i<response.data.length; i++){
            getRestaurant(response.data[i].restaurantId)
        }
    })
}

const getFavoriteDish = () => {
    axios.get("http://localhost:8080/favoriteDish/selectByUserId", {
        params: { userId: userId.value },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        for(let i=0; i < response.data.length; i++){
            getDish(response.data[i].dishId)
        } 
    })
}

const  getRestaurant = (id) => {
    axios.get("http://localhost:8080/restaurant/selectById", {
            params: { restaurantId: id },
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response) => {
            restaurants.value.push(response.data)
        })
}

const getDish = (id) => {
    axios.get("http://localhost:8080/dish/selectById", {
            params: { dishId: id },
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((response) => {
            dishes.value.push(response.data)
        })
}

getFavoriteRestaurant()
getFavoriteDish()
</script>