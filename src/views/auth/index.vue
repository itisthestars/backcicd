<template>
    <div>
        <el-tree
            ref="treeRef"
            :check-strictly="true"
            :default-checked-keys="checkedTree"
            style="max-width: 600px"
            :data="authList"
            show-checkbox
            node-key="roleId"
            :props="defaultProps"
        />
        <el-button type="primary" @click="updateAuth">修改</el-button>
        <p class="test">2121</p>
    </div>
</template>
<script lang="ts" setup>
// import { ref, onMounted } from 'vue';
import { getAuthList } from '@/api/auth';
// import { useRoute } from 'vue-router';
const route = useRoute();
interface IAuth {
    roleId: number;
    name: string;
    roleList?: IAuth[];
}
const treeRef = ref<any>(null);
const authList = ref<IAuth[]>([]);
const checkedTree = ref<any>([]);
const { authority } = route.query;
if (authority) {
    checkedTree.value = authority;
    console.log(checkedTree.value);
}
const defaultProps = {
    children: 'roleList',
    label: 'name'
};
onMounted(async () => {
    const res = await getAuthList();
    authList.value = res.data;
    // console.log(authList.value);
});
const updateAuth = () => {
    const checkedNodes = treeRef.value!.getCheckedNodes();
    const checkedKeys = treeRef.value!.getCheckedKeys(true);
    console.log(checkedNodes);
    console.log(checkedKeys);
};
</script>
<style lang="less" scoped>
// @import "@/styles/variable.less"
.test {
    color: @bj;
}
</style>
