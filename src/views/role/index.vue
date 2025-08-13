<template>
    <div>
        <el-form label-width="80px">
            <el-form-item>
                <el-button type="primary" @click="addRole()">我要添加角色</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="roleList" style="width: 100%">
            <el-table-column label="角色" prop="roleId"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="success" :plain="true" @click="editRole(row)">修改权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts" setup>
// import { ref, onMounted } from 'vue';
import { getRoleList } from '@/api/role';
// import { ElMessageBox, ElMessage } from 'element-plus';
// import { useRouter } from 'vue-router';
const router = useRouter();

interface IRole {
    roleId: number; //id
    roleName: string;
    authority?: number[];
}
const roleList = ref<IRole[]>([]);
const editRole = (row: IRole) => {
    console.log('编辑角色', row);
    router.push({
        path: '/auth',
        query: {
            roleId: row.roleId,
            authority: row.authority
        }
    });
};
onMounted(async () => {
    // getRoleList().then((res) => {
    //     console.log(res.data);
    //     role.value = res.data;
    // });
    const res = await getRoleList();
    roleList.value = res.data;
    console.log(roleList.value);
});
const addRole = () => {
    ElMessageBox.prompt('添加角色', '俺要添加角色', {
        confirmButtonText: '确认添加',
        cancelButtonText: '取消添加'
    })
        .then(({ value }) => {
            ElMessage({
                type: 'success',
                message: `你添加的信息是:${value}`
            });
            console.log(value);
            roleList.value.push({
                roleId: roleList.value.length + 1,
                roleName: value
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消添加'
            });
        });
};
</script>
<style lang="less" scoped></style>
