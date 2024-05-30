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
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="updateUserClick(scope.row)">
                        编辑
                    </el-button>
                    <el-button link type="primary" size="small" @click="deleteUser(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- <div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" />
    </div> -->
    <el-button plain @click="addVisible=true">
        新增用户
    </el-button>
    <el-dialog v-model="addVisible">
        <el-form :model="newUser" label-width="auto" style="max-width: 600px">
            <el-form-item label="姓名" placeholder="">
                <el-input v-model="newUser.userName" />
            </el-form-item>
            <el-form-item label="性别" placeholder="">
                <el-input v-model="newUser.gender" />
            </el-form-item>
            <el-form-item label="密码" placeholder="">
                <el-input v-model="newUser.password" />
            </el-form-item>
            <el-form-item label="年龄" placeholder="">
                <el-input v-model="newUser.age" />
            </el-form-item>
            <el-form-item label="身份" placeholder="">
                <el-input v-model="newUser.role" />
            </el-form-item>
            <el-form-item label="学号/工号" placeholder="">
                <el-input v-model="newUser.roleId" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="addVisible=false">
                    取消
                </el-button>
                <el-button type="primary" @click="addUser">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="updateVisible">
        <el-form :model="updateUser" label-width="auto" style="max-width: 600px"> 
            <el-form-item label="姓名" placeholder="">
            <el-input v-model="updateUser.userName" />
            </el-form-item>
            <el-form-item label="性别" placeholder="">
                <el-input v-model="updateUser.gender" />
            </el-form-item>
            <el-form-item label="密码" placeholder="">
                <el-input v-model="updateUser.password" />
            </el-form-item>
            <el-form-item label="年龄" placeholder="">
                <el-input v-model="updateUser.age" />
            </el-form-item>
            <el-form-item label="身份" placeholder="">
                <el-input v-model="updateUser.role" />
            </el-form-item>
            <el-form-item label="学号/工号" placeholder="">
                <el-input v-model="updateUser.roleId" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="updateVisible=false">
                    取消
                </el-button>
                <el-button type="primary" @click="updateUserConfirm">
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
const users = ref([])
const total = ref(100)
const page_size = ref(10)
const newUser = ref({ userName: null, age: null, password: null, age: null, roleId: null, role: null })
const updateUser = ref({userId: null, userName: null, age: null, password: null, age: null, roleId: null, role: null }) 
const addVisible = ref(false)
const updateVisible = ref(false)
const addUser = () => {
    addVisible.value = false
    axios.post("http://localhost:8080/user", newUser.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        getUser()
        newUser.value = { userName: null, age: null, password: null, age: null, roleId: null, role: null }
    })
}
const deleteUser = (row) => {
    axios.delete("http://localhost:8080/user/deleteById", {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            params: {
                userId: row.userId
            }
        }).then((response) => {
            getUser()
        })
}
const getUser = () => {
    axios.get("http://localhost:8080/user/selectAll", {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        users.value = response.data
        total.value = response.data.length
    })
}
const updateUserClick = (row) => {
    updateUser.value = row
    updateVisible.value = true
}
const updateUserConfirm = () => {
    axios.put("http://localhost:8080/user", updateUser.value, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then((response) => {
        updateVisible.value = false
        getUser()
        updateRestaurant.value = {userId: null, userName: null, age: null, password: null, age: null, roleId: null, role: null }
    })
}
getUser()

</script>
