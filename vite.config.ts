import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 引入css库
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
// 引入可以在setup中写name的插件
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// rollup打包可视化插件
import { visualizer } from 'rollup-plugin-visualizer'
// 更好的html页面控制
import { createHtmlPlugin } from 'vite-plugin-html'

import * as path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      // 引入element按需引入插件
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      vue({
        reactivityTransform: true
      }),
      // unocss引入
      Unocss({
        presets: [
          // 导入预设
          presetUno(),
          presetAttributify(),
          presetIcons()
        ],
        rules: [
          // 设置规则
        ]
      }),
      vueSetupExtend(),
      visualizer(),
      createHtmlPlugin({
        minify: true,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        entry: 'src/main.ts',
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        template: './index.html',

        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: loadEnv(mode, process.cwd()).VITE_APP_TITLE,
            injectScript: `<script src="./inject.js"></script>`
          },
          tags: [
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: 'tag'
              }
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        // 设置src路径别名
        '@': path.resolve(__dirname, 'src')
      }
    },
    define: {
      // 关闭选项api
      __VUE_OPTIONS_API__: false
    },
    server: {
      proxy: {
        '/api': {
          // 来自vite的配置，.env文件中的API_URL
          target: loadEnv(mode, process.cwd()).VITE_APP_URL,
          changeOrigin: true,
          // 把路径/api替换为空
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
