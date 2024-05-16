<template>
    <div>
        <el-table :data="dishes" style="width: 100%">
            <el-table-column fixed="left" prop="dish_id" label="Id" width="180" />
            <el-table-column prop="dish_name" label="菜名" width="180" />
            <el-table-column prop="category" label="种类" width="180" />
            <el-table-column prop="current_price" label="价格" width="180" />
            <el-table-column prop="description" label="描述" width="180" />
            <el-table-column prop="is_main_dish" label="是否为主打菜品" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small">
                        编辑
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
import { ref } from 'vue'

const dishes = []
const total = ref(80)
const page_size = ref(10)

</script>