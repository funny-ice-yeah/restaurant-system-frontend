<template>
    <div>
        <el-table :data="users" style="width: 100%">
            <el-table-column fixed="left" prop="userId" label="Id" width="180" />
            <el-table-column prop="userName" label="姓名" width="180" />
            <el-table-column prop="gender" label="性别" width="180" />
            <el-table-column prop="password" label="密码" width="180" />
            <el-table-column prop="age" label="年龄" width="180" />
            <el-table-column prop="role" label="角色" width="180" />
            <el-table-column prop="roleId" label="学号/工号" width="180" />
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
    <!-- <div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" />
    </div> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
const users = ref([])
const total = ref(100)
const page_size = ref(10)
axios.get("http://localhost:8080/user/selectAll", {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    }).then((response) => {
        users.value = response.data
        total.value = response.data.length
    }) 
</script>
