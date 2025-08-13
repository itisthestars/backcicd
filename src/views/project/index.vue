<template>
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="标题">
            <el-input v-model="searchData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="详情">
            <el-input v-model="searchData.introduce" placeholder="请输入详情" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchClick">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="dataList" :border="true" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="标题" width="120" />
        <el-table-column prop="introduce" label="介绍" />
        <!-- <el-table-column prop="address" label="Address" /> -->
    </el-table>
    <el-pagination
        background
        :page-sizes="[5, 10, 15, 20]"
        layout="prev, pager, next,sizes"
        :total="searchData.total"
        :default-page-size="searchData.pageSize"
        :current-page="searchData.currentPage"
        @current-change="currentChange"
        @size-change="pageSizeChange"
    />
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue';
import { getProject } from '@/api/project';
interface Project {
    userId: number;
    id: number;
    title: string;
    introduce: string;
    // address?: string; // 可选属性
}
const tableData = ref<Project[]>([]);
const originalData = ref<Project[]>([]); // 用于存储原始数据
const searchData = reactive({
    title: '',
    introduce: '',
    currentPage: 1,
    pageSize: 5,
    total: 0
});
const dataList = computed(() => {
    return tableData.value.slice(
        (searchData.currentPage - 1) * searchData.pageSize,
        searchData.currentPage * searchData.pageSize
    );
});
// const handleChange = (currentPage: number, pageSize: number) => {
//     console.log(`当前页: ${currentPage}, 每页条数: ${pageSize}`);
//     searchData.currentPage = currentPage;
//     searchData.pageSize = pageSize;
//     // 重新计算 dataList
// };
const currentChange = (currentPage: number) => {
    console.log('当前页:', currentPage);
    searchData.currentPage = currentPage;
};
const pageSizeChange = (pageSize: number) => {
    console.log('每页条数:', pageSize);
    searchData.pageSize = pageSize;
};
const searchClick = () => {
    // 这里可以添加搜索逻辑
    console.log('搜索条件:', searchData);
    // 例如，过滤 tableData 中的数据
    const filteredData = originalData.value.filter((item) => {
        return item.title.includes(searchData.title) && item.introduce.includes(searchData.introduce);
    });
    // 更新 tableData 为过滤后的数据
    tableData.value = filteredData;
    // 更新总数
    searchData.total = filteredData.length;
    // 重置当前页码
    searchData.currentPage = 1;
};
watch(
    [() => searchData.title, () => searchData.introduce],
    async ([newTitle, newIntroduce], [oldTitle, oldIntroduce]) => {
        console.log('新值:', newTitle, newIntroduce);
        console.log('旧值:', oldTitle, oldIntroduce);
        if (newTitle !== oldTitle || newIntroduce !== oldIntroduce) {
            // 触发搜索逻辑
            searchClick();
        }
        if (newTitle === '' && newIntroduce === '') {
            // 如果搜索条件清空，重新加载所有数据
            const res = await getProject({});
            tableData.value = res.data;
            searchData.total = res.data.length;
        }
    }
);
onMounted(async () => {
    const res = await getProject({});
    tableData.value = res.data;
    originalData.value = res.data; // 保存原始数据
    searchData.total = res.data.length;
    console.log(res);
});
</script>
<style lang="less" scoped>
@iamblack: #428bca;
</style>
