<template>
    <div>
        <el-table :data="dishes" style="width: 100%">
            <el-table-column fixed="left" prop="dishId" label="Id" width="180" />
            <el-table-column prop="dishName" label="菜名" width="180" />
            <el-table-column prop="category" label="种类" width="180" />
            <el-table-column prop="currentPrice" label="价格" width="180" />
            <el-table-column prop="description" label="描述" width="180" />
            <el-table-column prop="isMainDish" label="是否为主打菜品" width="180" />
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="updateDishClick(scope.row)">
                        编辑
                    </el-button>
                    <el-button link type="primary" size="small" @click="deleteDish(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- <div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" />
    </div> -->
    <el-button type="primary" round @click="addVisible = true">添加菜品</el-button>
    <el-dialog v-model="addVisible">
        <el-form :model="addDish" label-width="auto" style="max-width: 600px">
            <el-form-item label="菜名" placeholder="">
                <el-input v-model="addDish.dishName" />
            </el-form-item>
            <el-form-item label="种类" placeholder="">
                <el-input v-model="addDish.category" />
            </el-form-item>
            <el-form-item label="价格" placeholder="">
                <el-input v-model="addDish.currentPrice" />
            </el-form-item>
            <el-form-item label="描述" placeholder="">
                <el-input v-model="addDish.description" />
            </el-form-item>
            <el-form-item label="是否为主菜" placeholder="">
                <el-input v-model="addDish.isMainDish" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="addVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="addDishConfirm">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="updateVisible">
        <el-form :model="updateDish" label-width="auto" style="max-width: 600px">
            <el-form-item label="菜名" placeholder="">
                <el-input v-model="updateDish.dishName" />
            </el-form-item>
            <el-form-item label="种类" placeholder="">
                <el-input v-model="updateDish.category" />
            </el-form-item>
            <el-form-item label="价格" placeholder="">
                <el-input v-model="updateDish.currentPrice" />
            </el-form-item>
            <el-form-item label="描述" placeholder="">
                <el-input v-model="updateDish.description" />
            </el-form-item>
            <el-form-item label="是否为主菜" placeholder="">
                <el-input v-model="updateDish.isMainDish" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="updateVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="updateDishConfirm">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import axios from 'axios';
import { ref, inject, provide } from 'vue'

const dishes = ref([])
const total = ref(80)
const page_size = ref(10)
const restaurantId = inject("userId")
const addDish = ref({ restaurantId: restaurantId.value, dishId: null, dishName: null, category: null, currentPrice: null, description: null, isMainDish: null })
const addVisible = ref(false)
const updateDish = ref({ restaurantId: restaurantId.value, dishId: null, dishName: null, category: null, currentPrice: null, description: null, isMainDish: null })
const updateVisible = ref(false)
const getDish = () => {
    axios.get("http://localhost:8080/dish/selectByRestaurantId", {
        params: {
            restaurantId: restaurantId.value
        },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        dishes.value = response.data
        total.value = response.data.length
    })
}

const addDishConfirm = () => {
    axios.post("http://localhost:8080/dish", addDish.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        addVisible.value = false
        getDish()
        addDish.value = { restaurantId: restaurantId.value, dishId: null, dishName: null, category: null, currentPrice: null, description: null, isMainDish: null }
    })
}
const updateDishClick = (row) => {
    updateVisible.value = true
    updateDish.value = row
}
const updateDishConfirm = () => {
    axios.put("http://localhost:8080/dish", updateDish.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        updateVisible.value = false
        getDish()
        updateDish.value = { restaurantId: restaurantId.value, dishId: null, dishName: null, category: null, currentPrice: null, description: null, isMainDish: null }
    })
}
const deleteDish = (row) => {
    axios.delete("http://localhost:8080/dish/deleteById", {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        params: {
            dishId: row.dishId
        },
        withCredentials: true
    }).then((response) => {
        getDish()
    })
}
getDish()
</script>