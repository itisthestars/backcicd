<template>
    <div class="layout">
        <el-container>
            <el-header><Header></Header></el-header>
            <el-container>
                <el-aside width="200px">
                    <!-- 写法一 -->
                    <!-- <el-menu :router="true" :default-active="path">
                        <el-menu-item index="/home">
                            <el-icon><i-ep-location /></el-icon>
                            <span>项目介绍</span>
                        </el-menu-item>
                        <el-menu-item index="/item">
                            <el-icon><i-ep-menu /></el-icon>
                            <span>项目列表</span>
                        </el-menu-item>
                        <el-menu-item index="/role">
                            <el-icon><i-ep-setting /></el-icon>
                            <span>角色列表</span>
                        </el-menu-item>
                        <el-menu-item index="/auth">
                            <el-icon><i-ep-user /></el-icon>
                            <span>权限列表</span>
                        </el-menu-item>
                    </el-menu> -->
                    <!-- 写法二 -->
                    <el-menu :router="true" :default-active="activePath">
                        <template v-for="item in menuList">
                            <el-menu-item
                                v-if="item.children?.length === 0 || !item.children"
                                :key="item.path"
                                :index="item.path"
                            >
                                <el-icon><component :is="item.meta?.icon" /></el-icon>
                                <span>{{ item.meta?.title }}</span>
                            </el-menu-item>
                            <el-sub-menu v-else :key="`sub-${item.path}`" :index="item.path">
                                <template #title>
                                    <el-icon><component :is="item.meta?.icon" /></el-icon>
                                    <span>{{ item.meta?.title }}</span></template
                                >
                                <el-menu-item
                                    v-for="subitem in item.children"
                                    :key="subitem.path"
                                    :index="subitem.path"
                                >
                                    <el-icon><component :is="subitem.meta?.icon" /></el-icon>
                                    <span>{{ subitem.meta?.title }}</span></el-menu-item
                                >
                            </el-sub-menu>
                        </template>
                        <!-- <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
                            <template v-if="!item.children" #title>
                                <el-icon><component :is="item.meta?.icon" /></el-icon>
                                <span>{{ item.meta?.title }}</span>
                            </template>
                        </el-menu-item> -->
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb style="margin-bottom: 10px" :separator-icon="ArrowRight">
                        <el-breadcrumb-item v-for="item in settingStore.breadcrumbs" :key="item" :to="{ name: item }">{{
                            item
                        }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import Header from '@/views/layout/component/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watchEffect, onMounted } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { useSettingStore } from '@/store/setting/index';
const settingStore = useSettingStore();
const route = useRoute();
const router = useRouter();
// const menuList = router.getRoutes().filter((item) => item.meta.isShow); //获取到的是扁平化的路由数组 嵌套的子路由不行
const menuList = router.options.routes[0].children?.filter((item) => item.meta?.isShow);
// console.log('router获取到的菜单', menuList);
const activePath = ref(route.path);
// console.log(activePath.value)
watchEffect(() => {
    activePath.value = route.path;
});
</script>
<style lang="less" scoped>
.el-header {
    padding: 0;
    margin-bottom: 10px;
}

.el-container {
    height: 100vh; /* 设置容器高度为视口高度 */
    .el-menu {
        height: 100%;
    }
}
// .el-aside{
//     height: 100vh;
// }
</style>
