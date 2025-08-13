<template>
    <div class="header">
        <div class="flex-center m05 Logo">LOGO</div>
        <div class="flex-grow"></div>
        <div class="flex-center m05 color-dark-black"><i-ep-user></i-ep-user>{{ userName }}</div>
        <div class="flex-center m05 color-dark-black setting" @click="showSetting = true">
            <i-ep-setting></i-ep-setting>设置
        </div>
    </div>
    <el-drawer v-model="showSetting" direction="rtl" :show-close="true" :size="'300'">
        <template #header>
            <h4>项目设置</h4>
        </template>
        <template #default>
            <div class="flex-center">
                <el-button type="danger" @click="loginout">退出</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
const userName = userInfo.username || '未登录';
const showSetting = ref(false);
const loginout = () => {
    sessionStorage.removeItem('userInfo');
    router.push('/login');
};
</script>
<style lang="less" scoped>
@mycolor: #428bca;

.header {
    display: flex;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    box-shadow: 0 0 30px 10px rgb(255 1 1 / 10%);
    // margin-bottom: 10px;
    .setting {
        cursor: pointer;
    }
}

.Logo {
    font-size: 20px;
    font-weight: 700;
    color: @mycolor;

    &:hover {
        color: @mycolor * 0.9;
    }
}
</style>
