// stores/counter.js
import { defineStore } from 'pinia';
export const useSettingStore = defineStore('setting', {
    state: () => {
        return {
            breadcrumbs: [] as string[]
        };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        setBreadCrumbs(names: string[]) {
            this.breadcrumbs = names;
        }
    }
});
