import { ref } from 'vue';

// 定义泛型函数 useComponentRef
export function useComponentRef<T extends abstract new (...args: any) => any>(T) {
    return ref<InstanceType<T>>();
}
// InstanceType<T> 是一个内置的 TypeScript 类型，用于获取构造函数 T 的实例类型。当你传入一个类（即构造函数）作为参数时，InstanceType 会返回这个类的实例的类型。这在编写泛型钩子函数时非常有用，特别是当你想引用组件或其它对象的
