<template>
    <div>
        <el-table :data="users" style="width: 100%">
            <el-table-column fixed="left" prop="user_id" label="Id" width="180" />
            <el-table-column prop="user_name" label="姓名" width="180" />
            <el-table-column prop="gender" label="性别" width="180" />
            <el-table-column prop="password" label="密码" width="180" />
            <el-table-column prop="age" label="年龄" width="180" />
            <el-table-column prop="role" label="角色" width="180" />
            <el-table-column prop="role_id" label="学号/工号" width="180" />
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
const users = []
const total = ref(80)
const page_size = ref(10)

</script>
