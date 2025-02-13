<template>
    <div>
        <el-table :data="restaurants" style="width: 100%">
            <el-table-column fixed="left" prop="restaurantId" label="Id" width="180" />
            <el-table-column prop="restaurantName" label="店名" width="180" />
            <el-table-column prop="location" label="地址" width="180" />
            <el-table-column prop="account" label="账号" width="180" />
            <el-table-column prop="password" label="密码" width="180" />
            <el-table-column label="食堂名称" width="180">
                <template #default="scope">
                    {{ canteenMap[scope.row.canteenId] }}
                </template>
            </el-table-column>
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
        <div style="margin-bottom: 20px;">
                <el-button plain @click="addVisible = true">
                    新增商家
                </el-button>
        </div>
    </div>

    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @change="getRestaurantPage" :current-page="page" @current-change="restaurantPageChange"/>


    <el-dialog v-model="addVisible">
        <el-form :model="newRestaurant" label-width="auto" style="max-width: 600px">
            <el-form-item label="店名" placeholder="">
                <el-input v-model="newRestaurant.restaurantName" />
            </el-form-item>
            <el-form-item label="账号" placeholder="">
                <el-input v-model="newRestaurant.account" />
            </el-form-item>
            <el-form-item label="密码" placeholder="">
                <el-input v-model="newRestaurant.password" />
            </el-form-item>
            <el-form-item label="食堂名称" placeholder="">
                <el-select v-model="newRestaurant.canteenId" placeholder="">
                    <el-option v-for="(name, id) in canteenMap" :key="id" :label="name" :value="id" />
                </el-select>
            </el-form-item>
            <el-form-item label="相对位置" placeholder="">
                <el-input v-model="newRestaurant.location" />
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
            <el-form-item label="账号" placeholder="">
                <el-input v-model="updateRestaurant.account" />
            </el-form-item>
            <el-form-item label="密码" placeholder="">
                <el-input v-model="updateRestaurant.password" />
            </el-form-item>
            <el-form-item label="食堂名称" placeholder="">
                <el-select v-model="updateRestaurant.canteenId" placeholder="请选择">
                    <el-option v-for="(name, id) in canteenMap" :key="id" :label="name" :value="id" />
                </el-select>
            </el-form-item>
            <el-form-item label="相对位置" placeholder="">
                <el-input v-model="updateRestaurant.location" />
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
import { ElMessage } from 'element-plus'

const restaurants = ref([])
const total = ref(100)
const pageSize = ref(5)
const page = ref(1)
const addVisible = ref(false)
const newRestaurant = ref({ restaurantName: null, lcation: null, account: null, password: null, canteenId: null, briefIntro: null })
const updateRestaurant = ref({ restaurantId: null, restaurantName: null, lcation: null, account: null, password: null, canteenId: null, briefIntro: null })
const updateVisible = ref(false)
// 食堂ID到名称的映射
const canteenMap = {
    1: '旦苑餐厅',
    2: '南苑餐厅',
    3: '北区食堂',
    4: '江湾食堂',
    5: '枫林西餐厅',
    6: '张江食堂'
}
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
    updateRestaurant.value = { ...row, location: null, canteenId: null }
}
const updateConfirm = () => {
    if (!updateRestaurant.value.canteenId) {
        ElMessage.error("请选择食堂")
        return;
    }
    if (!updateRestaurant.value.location) {
        ElMessage.error("请输入新相对地址")
        return;
    }
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
    getRestaurantPage(page.value, pageSize.value)
}
const getRestaurantPage = (currentPage, pageSize) => {
    axios.get("http://localhost:8080/restaurant/selectPage4M",{
        params: {pageSize: pageSize, pageNum: currentPage},
        withCredentials: true
    }).then((response) => {
        restaurants.value = response.data.data
        total.value = response.data.total
    })
}
const restaurantPageChange = (value) => {
    getRestaurantPage(value, pageSize.value)
    page.value = value
}
getRestaurant()
</script>
