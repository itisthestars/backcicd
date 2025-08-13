import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useSettingStore } from '@/store/setting/index';

// 配置路由
// const routes: Array<RouteRecordRaw> = [
//     {
//         path: '/',
//         name: 'home',
//         component: () => import('../views//home/index.vue'),
//         meta: {},
//         children: [],
//     },
// ];

export const aboutRouter = {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {},
    children: []
} as RouteRecordRaw;

// 组合路由信息
// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
    eager: true
});
// 配置路由
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
    const module = modules[key].default;
    routes.push(module);
});
routes.push(aboutRouter);
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
// 获取面包屑导航数组
const getBreadcrumb = (currentName: string) => {
    console.log(currentName);
    const routes = router.getRoutes();
    console.log(routes);
    const breadcrumbs: string[] = [];

    while (true) {
        breadcrumbs.push(currentName);
        const currentRouteObj = routes.find((item) => item.name === currentName);
        const parenRouteObj = routes.find((item) => item.name === currentRouteObj?.meta.parentPath);
        if (parenRouteObj) {
            currentName = parenRouteObj.name as string;
            continue;
        } else {
            break;
        }
    }
    const settingStore = useSettingStore();

    settingStore.setBreadCrumbs(breadcrumbs.reverse());
};
// 配置不需要登录的路由
const noStatusPage = ['/login'];
router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    const token = sessionStorage.getItem('userInfo');
    const userIsLogin = token ? true : false;
    if (userIsLogin || noStatusPage.includes(_to.path)) {
        next();
    } else {
        next('/login');
    }
    getBreadcrumb(_to.name as string);
    // if (_to.name === 'homePage') {
    //     import(/* webpackChunkName: "home" */'@/views/home/home.vue')
    // }
    // console.log('当前的路由', _to.name);
    // console.log('所有的路由', router.getRoutes())
});
router.afterEach((_to) => {
    NProgress.done();
});
export default router;
