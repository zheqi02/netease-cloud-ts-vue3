import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 引入css库
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

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
          // 把路径/api/替换为空
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
