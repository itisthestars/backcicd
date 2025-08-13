<template>
    <el-form :inline="true" :model="searchData" label-width="80px" class="search-form">
        <el-form-item prop="nickName" label="角色名称">
            <el-input v-model="searchData.nickName" placeholder="请输入名称" />
        </el-form-item>

        <el-form-item prop="roleId" label="角色权限">
            <el-select v-model="searchData.roleId" placeholder="请选择权限" style="width: 200px">
                <el-option label="全部" :value="0" />
                <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchClick">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="userList" style="width: 100%">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="姓名" prop="nickName"></el-table-column>
        <el-table-column label="角色" prop="role">
            <template #default="scope">
                <el-button v-for="item in scope.row.role" :key="item.role" size="small" type="primary"
                    >{{ item.roleName }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" prop="role">
            <template #default="scope">
                <el-button type="success" size="small" @click="editClick(scope.row)">编辑 </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="editShow" title="提示" width="30%">
        <el-form v-model="editUser">
            <el-form-item label="用户昵称" label-width="120px">
                <el-input v-model="editUser.nickName" class="w192" autocomplete="off" />
            </el-form-item>

            <el-form-item label="用户角色" label-width="120px">
                <el-select v-model="editUser.role" :multiple="true" class="m-2" size="large" placeholder="请选择角色">
                    <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer" >
                <el-button @click="editShow = false">取消</el-button>
                <el-button type="primary" @click="ensureEditUser">修改</el-button>
            </span>
        </template>
        <!-- <span>暂无数据</span> -->
        <!-- <template #footer>
            <el-button @click="dialogVisible = false">关闭</el-button>
        </template> -->
    </el-dialog>
</template>
<script lang="ts" setup>
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';
import { onMounted, ref, reactive, watch } from 'vue';
import user from 'mock/user';
interface Role {
    role: number;
    roleName: string;
}
// 用户列表数据
interface User {
    id: number;
    nickName: string;
    userName: string;
    role: Role[];
}
// 角色列表权限配置
interface RoleList {
    roleId: number;
    roleName: string;
    authority: number[];
}
interface editUserType {
    id: number;
    nickName: string;
    role: number[];
}
const userList = ref<User[]>([]);
const originalUserList = ref<User[]>([]);
const roleList = ref<RoleList[]>([]);
const searchData = reactive({
    roleId: 0,
    nickName: ''
});
const editShow = ref(false);
const editUser = ref<editUserType>({
    id: 0,
    nickName: '',
    role: []
});
const searchClick = () => {
    console.log('查询', searchData.roleId, searchData.nickName);
    if (searchData.roleId === 0 && searchData.nickName === '') {
        getUserList().then((res) => {
            userList.value = res.data;
            console.log(res);
        });
    } else {
        let res: User[] = [];
        // 处理有搜索条件的情况
        if (searchData.nickName !== '') {
            res = originalUserList.value.filter((item) => item.nickName.includes(searchData.nickName));
        }
        if (searchData.roleId !== 0) {
            res = searchData.nickName !== '' ? res : originalUserList.value;
            userList.value = res.filter((item) => {
                return item.role.find((role) => {
                    return role.role === searchData.roleId;
                });
            });
        }
    }
    console.log(userList.value);
};
// watch(
//     () => searchData.roleId,
//     (newVal) => {
//         if (newVal === 0) {
//             getUserList().then((res) => {
//                 userList.value = res.data;
//                 console.log(res);
//             });
//         }
//     }
// );
const editClick = (row: User) => {
    console.log('编辑行数据', row);
    editUser.value = {
        id: row.id,
        nickName: row.nickName,
        role: row.role.map((item) => item.role) // 提取角色ID数组
    };
    editShow.value = true;
    console.log('编辑', editUser.value);
};
const ensureEditUser = () => {
    editShow.value = false;

    // 更新用户列表
    let obj: any = userList.value.find((item) => item.id === editUser.value.id);
    console.log('obj', obj);
    // 如果找到对应的用户，更新其信息
    obj.nickName = editUser.value.nickName;
    obj.role = [];
    console.log(' editUser.value.role',  editUser.value.role);
    editUser.value.role.forEach((item) => {
        roleList.value.forEach((item2) => {
            if (item === item2.roleId) {
                obj?.role.push({
                    role: item2.roleId,
                    roleName: item2.roleName
                });
            }
        });
    });
    console.log('修改后的obj', obj);
};
const add = (a: number) => {
    return (a as number) + 1;
};
console.log(add(1));
onMounted(() => {
    getUserList().then((res) => {
        userList.value = res.data;
        originalUserList.value = res.data; // 保存原始数据
        console.log(res);
    });
    getRoleList().then((res) => {
        roleList.value = res.data;
        console.log(res);
    });
});
</script>
<style lang="less" scoped></style>
