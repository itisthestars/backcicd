<template>
    <div>
        <span ref="tagRef" class="tag"></span>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue';
const props = defineProps({
    text: {
        type: String,
        default: '组件默认内容',
        required: true
    },
    color: {
        type: String,
        default: '#000',
        required: true
    }
});
const setText = () => {
    tagRef.value.innerText = props.text;
};
const setColor = () => {
    tagRef.value.style.color = props.color;
};
onMounted(() => {
    setText();
    setColor();
});
const tagRef = ref();
</script>
<style lang="less" scoped>
.tag {
    display: inline-block;
    margin: 5px;
    padding: 10px;
    width: fit-content;
    font-size: 14px;
    color: #18d95f;
    font-weight: 500;
    background-color: pink;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: #18d95f;
    }
}
</style>
