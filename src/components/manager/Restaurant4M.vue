<template>
    <div>
        <el-table :data="restaurants" style="width: 100%">
            <el-table-column fixed="left" prop="restaurantId" label="Id" width="180" />
            <el-table-column prop="restaurantName" label="店名" width="180" />
            <el-table-column prop="location" label="地址" width="180" />
            <el-table-column prop="account" label="账号" width="180" />
            <el-table-column prop="password" label="密码" width="180" />
            <el-table-column prop="canteenId" label="食堂Id" width="180" />
            <el-table-column prop="briefIntro" label="简介" width="180" />
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="updateClick(scope.row)">
                        编辑
                    </el-button>
                    <el-button link type="primary" size="small" @click="deleteRestaurant(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- <div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size"/>
    </div> -->
    <el-button plain @click="addVisible = true">
        新增商家
    </el-button>
    <el-dialog v-model="addVisible">
        <el-form :model="newRestaurant" label-width="auto" style="max-width: 600px">
            <el-form-item label="店名" placeholder="">
                <el-input v-model="newRestaurant.restaurantName" />
            </el-form-item>
            <el-form-item label="地址" placeholder="">
                <el-input v-model="newRestaurant.location" />
            </el-form-item>
            <el-form-item label="账号" placeholder="">
                <el-input v-model="newRestaurant.account" />
            </el-form-item>
            <el-form-item label="密码" placeholder="">
                <el-input v-model="newRestaurant.password" />
            </el-form-item>
            <el-form-item label="食堂Id" placeholder="">
                <el-input v-model="newRestaurant.canteenId" />
            </el-form-item>
            <el-form-item label="简介" placeholder="">
                <el-input v-model="newRestaurant.briefIntro" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="addVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="addRestaurant">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="updateVisible">
        <el-form :model="updateRestaurant" label-width="auto" style="max-width: 600px">
            <el-form-item label="店名" placeholder="">
                <el-input v-model="updateRestaurant.restaurantName" />
            </el-form-item>
            <el-form-item label="地址" placeholder="">
                <el-input v-model="updateRestaurant.location" />
            </el-form-item>
            <el-form-item label="账号" placeholder="">
                <el-input v-model="updateRestaurant.account" />
            </el-form-item>
            <el-form-item label="密码" placeholder="">
                <el-input v-model="updateRestaurant.password" />
            </el-form-item>
            <el-form-item label="食堂Id" placeholder="">
                <el-input v-model="updateRestaurant.canteenId" />
            </el-form-item>
            <el-form-item label="简介" placeholder="">
                <el-input v-model="updateRestaurant.briefIntro" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="updateVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="updateConfirm">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const restaurants = ref([])
const total = ref(100)
const page_size = ref(10)
const addVisible = ref(false)
const newRestaurant = ref({ restaurantName: null, lcation: null, account: null, password: null, canteenId: null, briefIntro: null })
const updateRestaurant = ref({ restaurantId: null, restaurantName: null, lcation: null, account: null, password: null, canteenId: null, briefIntro: null })
const updateVisible = ref(false)
const addRestaurant = () => {
    axios.post("http://localhost:8080/restaurant", newRestaurant.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        getRestaurant()
        addVisible.value = false
        newRestaurant.value = { restaurantName: null, lcation: null, account: null, password: null, canteenId: null, briefIntro: null }
    })
}
const updateClick = (row) => {
    updateVisible.value = true
    updateRestaurant.value = {...row}
}
const updateConfirm = () => {
    axios.put("http://localhost:8080/restaurant", updateRestaurant.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true 
    }).then((response) => {
        getRestaurant()
        updateVisible.value = false
        updateRestaurant.value = { restaurantId: null, restaurantName: null, lcation: null, account: null, password: null, canteenId: null, briefIntro: null }
    })
}
const deleteRestaurant = (row) => {
    axios.delete("http://localhost:8080/restaurant/deleteById", {
        withCredentials: true,
        params: {
            restaurantId: row.restaurantId
        }
    }).then((response) => {
        getRestaurant()
    })
}
const getRestaurant = () => {
    axios.get("http://localhost:8080/restaurant/selectAll", {
        withCredentials: true
    }).then((response) => {
        restaurants.value = response.data
        total.value = response.data.length
    })
}
getRestaurant()
</script>
