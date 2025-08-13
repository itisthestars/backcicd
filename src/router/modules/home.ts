import { House, Document, User, Postcard, PictureFilled, ElemeFilled, Flag } from '@element-plus/icons-vue';
export default {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/index.vue'),
    meta: {
        parentPath: ''
    },
    children: [
        {
            path: '/home',
            name: 'homePage',
            component: () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue'),
            meta: {
                isShow: true,
                title: '默认首页',
                icon: House,
                parentPath: 'layout'
            },
            children: []
        },
        {
            path: '/project',
            name: 'ProjectPage',
            component: () => import('@/views/project/index.vue'),
            meta: {
                isShow: true,
                title: '项目列表',
                icon: ElemeFilled,
                parentPath: 'layout'
            },
            children: []
        },
        {
            path: '/parent',
            name: 'ParentPage',
            component: () => import('@/views/project/index.vue'),
            meta: {
                isShow: true,
                title: '父页面',
                icon: PictureFilled,
                parentPath: 'layout'
            },
            children: [
                {
                    path: '/child1',
                    name: 'ChildPage1',
                    component: () => import('@/views/project/index.vue'),
                    meta: {
                        isShow: true,
                        title: '子页面1',
                        icon: Flag,
                        parentPath: 'ParentPage'
                    },
                    children: []
                },
                {
                    path: '/child2',
                    name: 'ChildPage2',
                    component: () => import('@/views/project/index.vue'),
                    meta: {
                        isShow: true,
                        title: '子页面2',
                        icon: Flag,
                        parentPath: 'ParentPage'
                    },
                    children: []
                }
            ]
        },
        {
            path: '/user',
            name: 'UserPage',
            component: () => import('@/views/user/index.vue'),
            meta: {
                isShow: true,
                title: '用户模块',
                icon: User,
                parentPath: 'layout'
            },
            children: []
        },
        {
            path: '/role',
            name: 'RolePage',
            component: () => import('@/views/role/index.vue'),
            meta: {
                isShow: true,
                title: '角色模块',
                icon: Document,
                parentPath: 'layout'
            },
            children: []
        },
        {
            path: '/item',
            name: 'ItemPage',
            component: () => import('@/views/item/index.vue'),
            meta: {
                isShow: true,
                title: '项目列表',
                icon: Document,
                parentPath: 'layout'
            },
            children: []
        },

        {
            path: '/auth',
            name: 'AuthPage',
            component: () => import('@/views/auth/index.vue'),
            meta: {
                isShow: true,
                title: '权限列表',
                icon: Postcard,
                parentPath: 'layout'
            },
            children: []
        },
        {
            path: '/about',
            name: 'aboutPage',
            component: () => import('@/views/about/index.vue'),
            meta: {
                isShow: true,
                title: '关于我们',
                icon: Postcard,
                parentPath: 'layout'
            },
            children: []
        }
    ]
};
