<template>
    <div>
        <el-table :data="orders" style="width: 100%">
            <el-table-column fixed="left" prop="orderId" label="Id" width="180" />
            <!-- <el-table-column prop="restaurantId" label="商户Id" width="180" />  -->
            <el-table-column prop="orderStatus" label="状态" width="180" />
            <el-table-column prop="orderTime" label="预订时间" width="180" />
            <el-table-column prop="orderMethod" label="点单方式" width="180" />
            <el-table-column prop="totalPrice" label="总价" width="180" />
            <el-table-column prop="createAt" label="下单时间" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="detailClick(scope.row)">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="reviewClick(scope.row)">
                        评价商户
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="reviewVisible">
        <el-form :model="restaurantReview" label-width="auto" style="max-width: 600px">
            <div class="demo-rate-block">
                <span class="demonstration" style="margin-right: 10px">打分</span>
                <el-rate v-model="restaurantReview.rating"/>
            </div>
            <el-form-item label="评论" placeholder="">
                <el-input v-model="restaurantReview.content" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="reviewVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="reviewRestaurant">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="detailVisible">
        <el-table :data="orderDetails" style="width: 100%">
            <el-table-column fixed="left" prop="dishId" label="菜品Id" width="180" />
            <el-table-column  prop="quantity" label="数量" width="180" /> 
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="dishReviewClick(scope.row)">
                        评价
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog v-model="dishReviewVisible">
        <el-form :model="dishReview" label-width="auto" style="max-width: 600px">
            <div class="demo-rate-block">
                <span class="demonstration" style="margin-right: 10px">打分</span>
                <el-rate v-model="dishReview.rating"/>
            </div>
            <el-form-item label="评论" placeholder="">
                <el-input v-model="dishReview.content" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="dishReviewVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="reviewDish">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'
const orders = ref([])
const total = ref(100)
const page_size = ref(10)
const userId = inject("userId")
const restaurantReview = ref({ content: null, rating: null, userId: null, restaurantId: null })
const reviewVisible = ref(false)
const dishReview = ref({ content: null, rating: null, userId: null, dishId: null }) 
const detailVisible = ref(false)
const dishReviewVisible = ref(false)
const orderDetails = ref([])

const getOrder = () => {
    axios.get("http://localhost:8080/order/selectByUserId", {
        params: {
            userId: userId.value
        },
        withCredentials: true
    }).then((response) => {
        orders.value = response.data
    })
}

const reviewClick = (row) => {
    reviewVisible.value = true
    restaurantReview.value.restaurantId = row.restaurantId
    restaurantReview.value.userId = userId.value
}

const reviewRestaurant = () => {
    axios.post('http://localhost:8080/restaurantReview', restaurantReview.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        restaurantReview.value = { content: null, rating: null, userId: null, restaurantId: null }
        reviewVisible.value = false
    })
}

const detailClick = (row) => {
    axios.get("http://localhost:8080/order/selectOrderDetailByOrderId", {
        params: {orderId: row.orderId},
        withCredentials: true
    }).then((response) => {
        orderDetails.value = response.data
        detailVisible.value = true
    })
}

const dishReviewClick = (row) => {
    dishReview.value.dishId = row.dishId
    dishReview.value.userId = userId.value
    dishReviewVisible.value = true
}

const reviewDish = () => {
    axios.post('http://localhost:8080/dishReview', dishReview.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        dishReview.value = { content: null, rating: null, userId: null, dishId: null }
        dishReviewVisible.value = false
    }) 
}
getOrder()
</script>