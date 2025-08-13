<template>
    <div>
        <div>封装组件</div>
        <tag :text="message1" :color="color1"></tag>
        <tag :text="message2" :color="color2"></tag>
    </div>
</template>
<script setup>
import { ref } from 'vue';
// import tag from './tag.vue';    // 引入组件  改为自动引入组件后，不需要手动导入组件了

// 使用 ref 创建一个响应式变量
const message1 = ref('Hello, Vue 3!');
const color1 = ref('red');
const message2 = ref('Hello, zjs!');
const color2 = ref('blue');
</script>
<style lang="less" scoped>
// div {
//     font-size: 20px; /* 字体相关属性 */
//     /* 按照 stylelint 规则顺序排列 */
//     text-align: center; /* 文本相关属性 */
//     color: red; /* 颜色属性 */
//     margin-top: 100px; /* margin 相关属性 */
//     display: flex;
// }
</style>
