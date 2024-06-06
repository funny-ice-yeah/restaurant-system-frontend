<template>
    <div>
        <el-table :data="catenns" style="width: 100%">
            <el-table-column fixed="left" prop="cateenId" label="餐厅Id" width="180" />
            <el-table-column prop="canteenName" label="餐厅名称" width="180" />
            <el-table-column prop="cateenLocation" label="位置" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small">
                        位置预约
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import {ref, inject, provide} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'

cateens = ref([])

const getCanteens() => {

}
</script>