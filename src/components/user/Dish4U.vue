<template>
    <div>
        <el-input v-model="keyword" style="width: 240px; margin-right: 10px;" placeholder="使用关键字搜索" />
        <el-button type="primary" size="small" @click="searchByKeyword">
            搜索
        </el-button>
        <el-button type="primary" size="small" @click="getDish">
            显示所有
        </el-button>
    </div>
    <div>
        <el-text class="mx-1" size="large" tag="b">菜品</el-text>
        <el-table :data="dishes" style="width: 100%; margin-bottom: 50px;">
            <el-table-column fixed="left" prop="dishId" label="Id" width="180" />
            <el-table-column prop="dishName" label="菜名" width="180" />
            <el-table-column prop="category" label="种类" width="180" />
            <el-table-column prop="currentPrice" label="价格" width="180" />
            <el-table-column prop="description" label="描述" width="180" />
            <el-table-column label="是否为主打菜品" width="180">
                <template #default="scope">
                    {{ scope.row.isMainDish ? '是' : '否' }}
                </template>
            </el-table-column>
            <el-table-column v-if="false" prop="imageUrl" label="图片url" width="180" />
            <el-table-column fixed="right" label="操作" width="360">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="detailClick(scope.row)">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="addDish(scope.row)">
                        加入订单
                    </el-button>
                    <el-button link type="primary" size="small" @click="favoriteDish(scope.row)">
                        收藏
                    </el-button>
                    <el-button link type="primary" size="small" @click="selectPrices(scope.row)">
                        价格历史
                    </el-button>
                    <el-button link type="primary" size="small" @click="reviewClick(scope.row)">
                        查看评价
                    </el-button>
                    <el-button link type="primary" size="small" @click="imageClick(scope.row)">
                        查看图片
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-text class="mx-1" size="large" tag="b" style="margin-right: 20px;">订单</el-text> <br />
        <div style="display: flex">
            <span>
                <el-text class="mx-1" size="small" tag="b" style="margin-right: 10px;">订单方式</el-text>
                <el-select v-model="orderMethod" placeholder="请选择订单方式" style="width: 100px; margin-right: 10px;">
                    <el-option label="线上" value="线上" />
                    <el-option label="排队" value="排队" />
                </el-select>
            </span>
            <span class="block">
                <el-text class="mx-1" size="small" tag="b" style="margin-right: 10px;">订餐时间</el-text>
                <el-date-picker v-model="orderTime" type="datetime" placeholder="请选择订餐时间" :disabled-date="disableDate"
                    value-format="YYYY-MM-DDTHH:mm:ss" />
            </span>
        </div>

        <el-table :data="order" style="width: 100%">
            <el-table-column fixed="left" prop="dishId" label="Id" width="180" />
            <el-table-column prop="dishName" label="菜名" width="180" />
            <el-table-column prop="quantity" label="数量" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="deleteDish(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-button type="primary" round @click="confirmOder">确定下单</el-button>
            <el-button type="primary" round @click="returnToRestaurants">返回商家页面</el-button>
        </div>
    </div>
    <el-dialog v-model="detailVisible">
        <el-descriptions title="食品详细信息" :column="1">
            <el-descriptions-item label="食材：">{{ detail.ingredients }}</el-descriptions-item>
            <el-descriptions-item label="过敏源:">{{ detail.allergies }}</el-descriptions-item>
            <el-descriptions-item label="营养:">{{ detail.nutritions }}</el-descriptions-item>
        </el-descriptions>
        <div class="dialog-footer">
            <el-button type="primary" @click="detailVisible = false">
                关闭
            </el-button>
        </div>
    </el-dialog>
    <el-dialog v-model="pricesVisible">
        <el-table :data="prices" style="width: 100%">
            <el-table-column prop="price" label="价格" width="180" />
            <el-table-column prop="createAt" label="创建时间" width="180" />
        </el-table>
        <div class="dialog-footer">
            <el-button type="primary" @click="pricesVisible = false">
                关闭
            </el-button>
        </div>
    </el-dialog>
    <el-dialog v-model="imageVisible">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <img style="max-width: 100%; max-height: 100%;" :src="image" />
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, inject, provide, initCustomFormatter } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()
const dishes = ref([])
const order = ref([])
const total = ref(80)
const page_size = ref(10)
const keyword = ref("")
const restaurantId4U = inject("restaurantId4U")
const userId = inject("userId")
const dishId4U = inject("dishId4U")
const prices = ref([])
const pricesVisible = ref(false)
const detailVisible = ref(false)
const detail = ref([])
const image = ref(null)
const imageVisible = ref(false)
const orderMethod = ref(null)
const orderTime = ref("")
const defaultOrderTime = ref(new Date())

const addDish = (row) => {
    ElMessageBox.prompt('请输入菜品数量', 'Order', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/, // 输入必须为正整数
        inputErrorMessage: '无效输入',
    }).then(({ value }) => {
        ElMessage({
            type: 'success',
            message: `加入${value}份${row.dishName}`,
        })
        let flag = false
        for (let i = 0; i < order.value.length; i++) {
            if (row.dishId === order.value[i].dishId) {
                order.value[i].quantity += parseInt(value)
                flag = true
                break
            }
        }
        if (!flag) {
            order.value.push({ dishId: row.dishId, quantity: parseInt(value), dishName: row.dishName })
        }
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消成功',
        })
    })
}

const deleteDish = (row) => {
    for (var i = 0; i < order.value.length; i++) {
        if (row.dishId === order.value[i].dishId) {
            order.value.splice(i, 1)
        }
    }
}

const favoriteDish = (row) => {
    axios.post("http://localhost:8080/favoriteDish", { userId: userId.value, dishId: row.dishId }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        if (response.data) {
            ElMessage({
                type: 'success',
                message: '收藏成功',
            })
        }else{
            ElMessage({
                type: 'info',
                message: '已收藏',
            }) 
        }
    })
}
const confirmOder = () => {
    if (orderMethod.value == null) {
        ElMessage({
            type: 'info',
            message: '请选择订餐方式',
        })
        return
    }
    if (orderTime.value == "") {
        ElMessage({
            type: 'info',
            message: '请选择订餐时间',
        })
        return
    }
    if (order.value.length == 0) {
        ElMessage({
            type: 'info',
            message: '请选择菜品',
        })
        return
    }
    let time = new Date(orderTime.value)
    let now = new Date()
    let minuteInMilliseconds = 60 * 1000
    if (now.getTime() - time.getTime() > minuteInMilliseconds) {
        ElMessage({
            type: 'info',
            message: '订单时间不能晚于当前时间',
        })
        return
    }

    axios.post("http://localhost:8080/order", {
        userId: userId.value,
        restaurantId: restaurantId4U.value,
        dishes: order.value,
        orderMethod: orderMethod.value,
        orderTime: orderTime.value
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        order.value = []
        orderMethod.value = null
        orderTime.value = null
        ElMessage({
            type: 'success',
            message: '下单成功',
        })
    })
}

const getDish = () => {
    axios.get("http://localhost:8080/dish/selectByRestaurantId", {
        params: {
            restaurantId: restaurantId4U.value
        },
        withCredentials: true
    }).then((response) => {
        dishes.value = response.data
    })
}

const searchByKeyword = () => {
    axios.get("http://localhost:8080/dish/selectByKeywordRestaurantId", {
        params: {
            keyword: keyword.value,
            restaurantId: restaurantId4U.value
        },
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        keyword.value = ''
        dishes.value = response.data
    })
}
const selectPrices = (row) => {
    axios.get("http://localhost:8080/dish/selectPricesById", {
        params: {
            "dishId": row.dishId
        },
        withCredentials: true
    }).then((response) => {
        prices.value = response.data
        pricesVisible.value = true
    })
}
const returnToRestaurants = () => {
    router.push("/user/restaurant")
}
const reviewClick = (row) => {
    dishId4U.value = row.dishId
    router.push("/user/dishReview")
}
const detailClick = (row) => {
    axios.get("http://localhost:8080/dish/details", {
        params: { dishId: row.dishId },
        withCredentials: true
    }).then((response) => {
        console.log(response.data)
        detail.value = response.data
        detailVisible.value = true
    })
}
const imageClick = (row) => {
    image.value = row.imageUrl
    imageVisible.value = true
}
const disableDate = (date) => {
    let now = new Date()
    let timeDiff = now.getTime() - date.getTime()

    let dayInMilliseconds = 24 * 60 * 60 * 1000
    if (timeDiff > dayInMilliseconds) {
        return true
    } else {
        return false
    }
}
getDish()
</script>
