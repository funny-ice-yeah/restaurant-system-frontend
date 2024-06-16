<template>
    <div>
        <el-table :data="dishes" style="width: 100%">
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
            <el-table-column fixed="right" label="操作" width="360">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="imageClick(scope.row)">
                        查看图片
                    </el-button>
                    <el-button link type="primary" size="small" @click="handleUploadClick(scope.row)">
                        更新图片
                    </el-button>
                    <el-button link type="primary" size="small" @click="detailClick(scope.row)">
                        销量
                    </el-button>
                    <el-button link type="primary" size="small" @click="infoClick(scope.row)">
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
            <el-form-item label = "图片url" placeholder="">
                <el-input v-model = "addDish.imageUrl"/>
            </el-form-item>
            <el-form-item label="描述" placeholder="">
                <el-input v-model="addDish.description" />
            </el-form-item>
            <el-form-item label="是否为主菜" placeholder="">
                <el-select v-model="addDish.isMainDish" placeholder="请选择是否为主菜">
                    <el-option label="是" value="1" />
                    <el-option label="否" value="0" />
                </el-select>
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
            <el-form-item label = "图片url" placeholder="">
                <el-input v-model = "updateDish.imageUrl"/>
            </el-form-item>            
            <el-form-item label="是否为主菜" placeholder="">
                <el-select v-model="updateDish.isMainDish" placeholder="请选择是否为主菜">
                    <el-option label="是" value="1" />
                    <el-option label="否" value="0" />
                </el-select>
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
    <el-dialog v-model="detailVisible">
        <el-descriptions title="菜品信息" :column="1">
            <el-descriptions-item label="收藏量:">{{ detail.favoriteNum }}</el-descriptions-item>
            <el-descriptions-item label="线下销量:">{{ detail.offlineSales }}</el-descriptions-item>
            <el-descriptions-item label="线上销量:">{{ detail.onlineSales }}</el-descriptions-item>
        </el-descriptions>
    </el-dialog>
    <el-dialog v-model="infoVisible">
        <el-descriptions title="食品详细信息" :column="1">
            <el-descriptions-item label="食材：">{{ info.ingredients? info.ingredients: '无' }}</el-descriptions-item>
            <el-descriptions-item label="过敏源:">{{ info.allergies? info.allergies: '无' }}</el-descriptions-item>
            <el-descriptions-item label="营养:">{{ info.nutritions? info.nutritions: '无' }}</el-descriptions-item>
        </el-descriptions>
        <div class="dialog-footer">
            <el-select v-model="infoUpdateType" placeholder="请选择类别"
                style="margin-bottom: 10px;margin-top: 10px;width: 20%;">
                <el-option label="食材" value="ingredients" />
                <el-option label="过敏源" value="allergies" />
                <el-option label="营养" value="nutritions" />
            </el-select>
            <br />
            <el-button type="primary" @click="addInfoItemClick">添加</el-button>
            <el-button type="primary" @click="deleteInfoItemClick">删除</el-button>
            <el-button type="primary" @click="infoVisible = false">
                关闭
            </el-button>
        </div>
    </el-dialog>
    <el-dialog v-model="deleteInfoItemVisible">
        <el-select v-model="deleteInfoItem" placeholder="请选择删除对象" style="margin-bottom: 10px;">
            <el-option v-for="item in infoItems" :label="item" :value="item"></el-option>
        </el-select>
        <div class="dialog-footer">
            <el-button type="primary" @click="deleteInfoItemConfirm">
                确定
            </el-button>
            <el-button type="primary" @click="deleteInfoItemVisible = false">
                关闭
            </el-button>
        </div>
    </el-dialog>
    <el-dialog v-model="addInfoItemVisible">
        <el-input v-model="addInfoItem" style="width: 240px;margin-bottom: 10px;" placeholder="请输入添加对象" />
        <div class="dialog-footer">
            <el-button type="primary" @click="addInfoItemConfirm">
                确定
            </el-button>
            <el-button type="primary" @click="addInfoItemVisible = false">
                关闭
            </el-button>
        </div>
    </el-dialog>
    <el-dialog v-model="imageVisible">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <img style="max-width: 100%; max-height: 100%;" :src="image" />
        </div>
    </el-dialog>
    <el-dialog v-model="imageUploadVisible">
        <el-upload ref="upload" class="upload-demo" action="http://localhost:8080/dish/uploadImage" :limit="1"
            :on-exceed="handleExceed" :auto-upload="false" :data="uploadParam" accept=".jpg" :on-success="afterUploadSuccess" >
            <template v-slot:trigger>
                <el-button type="primary" style="margin-right: 10px;">选择图片</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                上传
            </el-button>
            <template v-slot:tip>
                <div class="el-upload__tip text-red">
                    只能选择一张图片
                </div>
            </template>
        </el-upload>
    </el-dialog>
</template>

<script setup>
import axios from 'axios';
import { ElMessage, genFileId } from 'element-plus';
import { ref, inject, provide } from 'vue'

const dishes = ref([])
const total = ref(80)
const page_size = ref(10)
const restaurantId = inject("userId")
const addDish = ref({ restaurantId: restaurantId.value, dishId: null, dishName: null, category: null, currentPrice: null, description: null, imageUrl: null,isMainDish: null })
const addVisible = ref(false)
const updateDish = ref({ restaurantId: restaurantId.value, dishId: null, dishName: null, category: null, currentPrice: null, description: null, imageUrl: null,isMainDish: null })
const updateVisible = ref(false)
const detailVisible = ref(false)
const detail = ref({ favoriteNum: 0, offlineSales: 0, onlineSales: 0 })
const infoVisible = ref(false)
const info = ref({ ingredients: "", allergies: "", nutritions: "" })
const infoItems = ref([])
const addInfoItem = ref("")
const deleteInfoItem = ref("")
const infoUpdateType = ref("")
const addInfoItemVisible = ref(false)
const deleteInfoItemVisible = ref(false)
const dishId = ref(null)
const imageVisible = ref(false)
const image = ref("")
const uploadParam = ref({})
const upload = ref(null)

const imageUploadVisible = ref(false)

const handleUploadClick = (row) => {
    imageUploadVisible.value = true
    uploadParam.value = { "dishId": row.dishId }
}
const handleExceed = (files) => {
    upload.value.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    upload.value.handleStart(file)
};

const submitUpload = () => {
    upload.value.submit();
};

const afterUploadSuccess = () => {
    imageUploadVisible.value = false
    ElMessage.success("上传成功")
    upload.value.clearFiles()
    getDish()
}


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
    updateDish.value = { ...row }
    updateDish.value.isMainDish = updateDish.value.isMainDish + ""
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
const detailClick = (row) => {
    axios.get("http://localhost:8080/favoriteDish/countFavorite", {
        params: { dishId: row.dishId },
        withCredentials: true
    }).then((response) => {
        detail.value.favoriteNum = response.data
        axios.get("http://localhost:8080/dish/selectSalesById", {
            params: { dishId: row.dishId },
            withCredentials: true
        }).then((response) => {
            console.log(response.data)
            detail.value.onlineSales = response.data.online
            detail.value.offlineSales = response.data.offline
            detailVisible.value = true
        })
    })
}
const infoClick = (row) => {
    dishId.value = row.dishId
    axios.get("http://localhost:8080/dish/details", {
        params: { dishId: row.dishId },
        withCredentials: true
    }).then((response) => {
        info.value = response.data
        infoVisible.value = true
    })
}
const addInfoItemClick = () => {
    if (infoUpdateType.value == "") {
        ElMessage.error("请选择更新类型")
        return
    }
    addInfoItemVisible.value = true
}
const deleteInfoItemClick = () => {
    if (infoUpdateType.value == "") {
        ElMessage.error("请选择更新类型")
        return
    }
    if (infoUpdateType.value == 'ingredients') {
        infoItems.value = info.value.ingredients.split("、")
    } else if (infoUpdateType.value == 'nutritions') {
        infoItems.value = info.value.nutritions.split("、")
    } else {
        infoItems.value = info.value.allergies.split("、")
    }
    deleteInfoItemVisible.value = true
}
const deleteInfoItemConfirm = () => {
    if (deleteInfoItem.value == "") {
        ElMessage.error("请要选择删除的" + infoUpdateType.value)
        return
    }
    axios.delete("http://localhost:8080/dish/deleteDetail", {
        params: {
            dishId: dishId.value,
            type: infoUpdateType.value,
            name: deleteInfoItem.value
        },
        withCredentials: true
    }).then((response) => {
        if (response.data) {
            ElMessage.success("删除成功")
            deleteInfoItemVisible.value = false
            infoUpdateType.value = ""
            deleteInfoItem.value = ""
            axios.get("http://localhost:8080/dish/details", {
                params: { dishId: dishId.value },
                withCredentials: true
            }).then((response) => {
                info.value = response.data
            })
        } else {
            ElMessage.error("删除失败")
        }
    })
}
const addInfoItemConfirm = () => {
    if (addInfoItem.value == "") {
        ElMessage.error("请输入要添加的对象")
        return
    }
    axios.post("http://localhost:8080/dish/insertDetail", {}, {
        params: {
            dishId: dishId.value,
            type: infoUpdateType.value,
            name: addInfoItem.value
        },
        withCredentials: true
    }).then((response) => {
        if (response.data) {
            ElMessage.success("添加成功")
            addInfoItemVisible.value = false
            infoUpdateType.value = ""
            addInfoItem.value = ""
            axios.get("http://localhost:8080/dish/details", {
                params: { dishId: dishId.value },
                withCredentials: true
            }).then((response) => {
                info.value = response.data
            })
        } else {
            ElMessage.error("添加的对象已存在")
        }
    })
}
const imageClick = (row) => {
    image.value = row.imageUrl
    imageVisible.value = true
}
getDish()
</script>