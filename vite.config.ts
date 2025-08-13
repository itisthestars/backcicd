import { defineConfig, loadEnv } from 'vite';
// 代码溯源插件
import { codeInspectorPlugin } from 'code-inspector-plugin';
// 开启mock服务器
import { viteMockServe } from 'vite-plugin-mock';
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// 打包分析插件
import { visualizer } from 'rollup-plugin-visualizer';
// 外链打包插件
import externalGlobals from 'rollup-plugin-external-globals';
// 自动引入外链script标签插件
import { createHtmlPlugin } from 'vite-plugin-html';
// 打包压缩插件gzip
import viteCompression from 'vite-plugin-compression';
//br压缩
import brotli from 'rollup-plugin-brotli';
// 按路由分割打包插件  或者在rollup中配置output.manualChunks 'src/views'
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    // 获取当前工作目录
    const root = process.cwd();
    // 获取环境变量
    const env = loadEnv(mode, root);
    console.log(env);
    return {
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import "@/styles/variable.less";`
                }
            }
        },
        // 项目根目录
        root,
        // 项目部署的基础路径
        base: './',
        publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 无需处理的静态资源位置
        assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置
        plugins: [
            // 代码溯源插件
            codeInspectorPlugin({
                bundler: 'vite'
            }),
            // Vue模板文件编译插件
            vue(),
            // jsx文件编译插件
            vueJsx(),
            // 开启mock服务器
            viteMockServe({
                // 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
                mockPath: 'mock', // 数据模拟需要拦截的请求起始 URL
                localEnabled: true, // 开发环境是否开启 mock 功能
                prodEnabled: false // 生产环境是否开启 mock 功能
            }),
            // 开启ElementPlus自动引入CSS
            ElementPlus({}),
            // 自动导入组件
            AutoImport({
                // 自动导入vue vue-router
                imports: ['vue', 'vue-router', 'pinia'],
                //处理Eslint
                eslintrc: {
                    enabled: true // 生成 ESLint 配置
                },
                resolvers: [ElementPlusResolver(), IconsResolver()],
                dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url))
            }),
            // 自动注册组件
            Components({
                resolvers: [ElementPlusResolver(), IconsResolver()],
                dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url)),
                // 自动注册指定vue组件
                dirs: [fileURLToPath(new URL('./src/components/auto', import.meta.url))],
                // 使用vite-plugin-webpackchunkname按路由分割打包插件时 需要配置此项，否则打包后运行会报错
                include: [/\.vue$/, /\.vue\?/]
            }),
            Icons({
                autoInstall: true
            }),
            // br压缩
            brotli({
                minSize: 1000 // 默认值是1024，即大于1kb的文件会被压缩
            }),
            //gzip压缩
            // viteCompression(
            //     {
            //         verbose: true, // 是否在控制台显示压缩结果
            //         // 打包后文件压缩大小超过阈值后才启用压缩，单位是b
            //         threshold: 20 * 1024 * 8,
            //         // 压缩算法，默认是gzip。可选的还有brotliCompress（Brotli）和deflate（Deflate）。
            //         algorithm: 'gzip',
            //         // 是否删除原始文件，默认为false不删除。设置为true后会删除原文件，只保留压缩后的文件。
            //         deleteOriginFile: false,
            //         ext: '.gzip', // 压缩包后缀

            //     }
            // )
            // 自动在index.html中注入外部script标签
            createHtmlPlugin({
                inject: {
                    // 注入到index.html中的script标签
                    data: {
                        jquery: '<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>',
                        html2canvas:
                            '<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>'
                    },
                    tags: [
                        {
                            injectTo: 'head',
                            tag: 'script',
                            attrs: {
                                src: 'https://head.js/1.1.0/head.min.js'
                            }
                        }
                    ]
                    // 注入的位置，'body-prepend' 或者 'body'
                }
            }),
            // 按路由分割打包插件  或者在rollup中配置output.manualChunks 'src/views'
            manualChunksPlugin()
        ],
        // 运行后本地预览的服务器
        server: {
            // 是否开启https

            // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
            host: true,
            // 开发环境预览服务器端口
            port: 9000,
            // 启动后是否自动打开浏览器
            open: true,
            // 是否开启CORS跨域
            cors: true,
            // 代理服务器
            // 帮助我们开发时解决跨域问题

            proxy: {
                [env.VITE_APP_API_BASEURL]: {
                    target: 'http://localhost:9000',
                    // 改变 Host Header
                    changeOrigin: true,
                    // 发起请求时将 '/api' 替换为 ''
                    rewrite: (path) => {
                        console.log('rewrite path before:', path);
                        const newPath = path.replace(/^\/api/, '');
                        console.log('rewrite path after:', newPath);
                        return newPath;
                    }
                },
                [env.VITE_APP_MOCK_BASEURL]: {
                    target: 'http://localhost:9000',
                    // 改变 Host Header
                    changeOrigin: true,
                    // 发起请求时将 '/api' 替换为 ''
                    rewrite: (path) => {
                        console.log('rewrite path before:', path);
                        const newPath = path.replace(/^\/mock\/api/, '');
                        console.log('rewrite path after:', newPath);
                        return newPath;
                    }
                }
            }
        },
        // 打包配置
        build: {
            // 关闭 sorcemap 报错不会映射到源码
            sourcemap: false,
            // 打包大小超出 400kb 提示警告
            chunkSizeWarningLimit: 400,
            rollupOptions: {
                // 打包入口文件 根目录下的 index.html
                // 也就是项目从哪个文件开始打包
                input: {
                    index: fileURLToPath(new URL('./index.html', import.meta.url))
                },
                // 不打包第三方库配置 参考rollupoptions
                external: ['react', 'jquery', 'html2canvas'],
                // 打包分析插件和外链打包配置
                plugins: [
                    // 外链打包插件配置
                    externalGlobals({
                        react: 'React', // react 包对应全局变量 React
                        jquery: '$', // jquery 包对应全局变量 $
                        html2canvas: 'html2canvas' // html2canvas 包对应全局变量 html2canvas
                    }),
                    visualizer({
                        open: true // 打包完成后自动打开可视化分析页面
                    })
                ],
                treeshake: {
                    preset: 'recommended'
                },
                // 静态资源分类打包
                // experimentalLogSideEffects: true,
                output: {
                    experimentalMinChunkSize: 20 * 1024, // 打包体积超过20kb的chunk会被分割成多个文件
                    // format: 'esm',
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',

                    manualChunks: (id) => {
                        // 如果只有导入import没有使用  则不会打包
                        if (id.includes('html2canvas')) {
                            console.log('✅ html2canvas module found:', id);
                            return 'html2canvas';
                        }
                        // 抽离第三方包
                        if (id.includes('element-plus')) {
                            console.log('✅ element-plus module found:', id);
                            return 'element-plus';
                        }
                        // 对应的路由文件分别打包
                        // if (id.includes('/src/views/about')) {
                        //     return 'about'
                        // }
                        // if (id.includes('/src/views/item')) {
                        //     // return 'item'
                        //     return 'about' //将两个路由打包到一起
                        // }

                        if (id.includes('node_modules')) {
                            return 'vendor'; // 打包第三方库
                        }
                        // else {
                        //     return 'index'
                        // }
                    }
                }
            }
        },
        // 配置别名
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '#': fileURLToPath(new URL('./types', import.meta.url))
            }
        }
    };
});
