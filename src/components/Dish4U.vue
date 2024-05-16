<template>
    <div>
        <el-table :data="dishes" style="width: 100%">
            <el-table-column fixed="left" prop="dishId" label="Id" width="180" />
            <el-table-column prop="dishName" label="菜名" width="180" />
            <el-table-column prop="category" label="种类" width="180" />
            <el-table-column prop="currentPrice" label="价格" width="180" />
            <el-table-column prop="description" label="描述" width="180" />
            <el-table-column prop="isMainDish" label="是否为主打菜品" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" />
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const dishes = ref([])
const total = ref(80)
const page_size = ref(10)
const restaurantId4U = inject("restaurantId4U")

axios.get("http://localhost:8080/dish/selectByRestaurantId", {
    params: {
        restaurantId: restaurantId4U.value
    },
    withCredentials: true
}).then((response) => {
    dishes.value = response.data
})
</script>